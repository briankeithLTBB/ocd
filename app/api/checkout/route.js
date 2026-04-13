import { SquareClient, SquareEnvironment } from "square";
import { randomUUID } from "crypto";

const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment: SquareEnvironment.Production,
});

// Weights in ounces per unit
const PRODUCT_WEIGHTS = {
  "n3-bundle": 32, // 2 lbs
  "n3-soap":   24, // 1.5 lbs
  "n3-slb":     8, // 0.5 lbs
  "f3-soap":   24, // 1.5 lbs
};

// USPS Ground Advantage rates by total weight (oz)
// Covers most continental US destinations
function shippingRate(totalOz) {
  if (totalOz <= 15.9)  return 5.00; // under 1 lb
  if (totalOz <= 32)    return 8.00; // 1–2 lbs
  if (totalOz <= 48)    return 10.00; // 2–3 lbs
  if (totalOz <= 64)    return 12.00; // 3–4 lbs
  return 15.00;                        // 4+ lbs
}

export async function POST(request) {
  try {
    const { items } = await request.json();

    if (!items || items.length === 0) {
      return Response.json({ error: "No items in cart" }, { status: 400 });
    }

    const totalOz = items.reduce((sum, item) => {
      const weight = PRODUCT_WEIGHTS[item.id] ?? 24;
      return sum + weight * item.quantity;
    }, 0);

    const shipping = shippingRate(totalOz);

    const TAX_UID = "texas-sales-tax";
    const lineItems = items.map((item) => ({
      name: item.name,
      quantity: String(item.quantity),
      basePriceMoney: {
        amount: BigInt(Math.round(item.price * 100)),
        currency: "USD",
      },
      appliedTaxes: [{ taxUid: TAX_UID }],
    }));

    const { paymentLink } = await client.checkout.paymentLinks.create({
      idempotencyKey: randomUUID(),
      order: {
        locationId: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID,
        lineItems,
        taxes: [
          {
            uid: TAX_UID,
            catalogObjectId: "XKFPFU7NBDPDQAMRYZDJZ7TC",
            scope: "LINE_ITEM",
          },
        ],
        serviceCharges: [
          {
            uid: "shipping",
            name: "Shipping (USPS Ground Advantage)",
            amountMoney: { amount: BigInt(Math.round(shipping * 100)), currency: "USD" },
            calculationPhase: "SUBTOTAL_PHASE",
          },
        ],
      },
      checkoutOptions: {
        allowTipping: false,
        askForShippingAddress: true,
        merchantSupportEmail: "ocdbyshelbey@gmail.com",
      },
    });

    return Response.json({ url: paymentLink.url });
  } catch (err) {
    console.error("Square checkout error:", err);
    return Response.json(
      { error: err?.message || "Checkout failed" },
      { status: 500 }
    );
  }
}

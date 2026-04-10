import { SquareClient, SquareEnvironment } from "square";
import { randomUUID } from "crypto";

const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment: SquareEnvironment.Production,
});

export async function POST(request) {
  try {
    const { items } = await request.json();

    if (!items || items.length === 0) {
      return Response.json({ error: "No items in cart" }, { status: 400 });
    }

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
            name: "Shipping",
            amountMoney: { amount: BigInt(1000), currency: "USD" },
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

import { SquareClient, SquareEnvironment } from "square";
import { randomUUID } from "crypto";

const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment: SquareEnvironment.Production,
});

export async function POST(request) {
  const { items } = await request.json();

  if (!items || items.length === 0) {
    return Response.json({ error: "No items in cart" }, { status: 400 });
  }

  const lineItems = items.map((item) => ({
    name: item.name,
    quantity: String(item.quantity),
    basePriceMoney: {
      amount: BigInt(Math.round(item.price * 100)),
      currency: "USD",
    },
  }));

  const { result } = await client.checkout.paymentLinks.create({
    idempotencyKey: randomUUID(),
    order: {
      locationId: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID,
      lineItems,
    },
    checkoutOptions: {
      allowTipping: false,
      askForShippingAddress: true,
      merchantSupportEmail: "ocdbyshelbey@gmail.com",
    },
    prePopulatedData: {},
  });

  return Response.json({ url: result.paymentLink.url });
}

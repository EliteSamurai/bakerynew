import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with your secret key
// In production, use environment variables for sensitive keys
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia", // Use the latest API version
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, customerInfo } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    // Create line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.bottomName,
          description: item.ingredients,
          images: [
            item.img && item.img.startsWith("http")
              ? item.img
              : `${process.env.NEXT_PUBLIC_BASE_URL}${item.img}`,
          ],
        },
        unit_amount: item.price, // Price is already in cents
      },
      quantity: item.quantity,
    }));

    // Calculate order metadata
    const orderTotal = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: orderTotal,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        order_id: `order_${Date.now()}`,
        customer_name: customerInfo?.name || "Guest",
        customer_email: customerInfo?.email || "",
        pickup_date: customerInfo?.pickupDate || "",
        pickup_time: customerInfo?.pickupTime || "",
        items_json: JSON.stringify(
          items.map((item: any) => ({
            id: item.id,
            name: item.topName,
            quantity: item.quantity,
          }))
        ),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: any) {
    console.error("Stripe API error:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred with the payment process" },
      { status: 500 }
    );
  }
}

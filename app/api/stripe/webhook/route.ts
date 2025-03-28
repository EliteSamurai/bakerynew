import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

// This is your Stripe webhook secret for verifying signatures
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export const config = {
  api: {
    bodyParser: false, // ❌ Disable automatic JSON parsing
  },
};

export async function POST(request: NextRequest) {
  console.log("🔹 Webhook Received");

  const signature = request.headers.get("stripe-signature") || "";
  if (!signature) {
    console.error("🚨 Missing Stripe signature header");
    return NextResponse.json(
      { error: "Missing Stripe signature header" },
      { status: 400 }
    );
  }

  // Convert request to raw text (buffer)
  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
  } catch (err: any) {
    console.error(`❌ Webhook signature verification failed: ${err.message}`);
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 }
    );
  }

  console.log(`✅ Webhook event received: ${event.type}`);

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(
        `✅ PaymentIntent succeeded: $${(paymentIntent.amount / 100).toFixed(2)}`
      );

      await handleSuccessfulPayment(paymentIntent);
      break;

    case "payment_intent.payment_failed":
      const failedPaymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(
        `❌ Payment failed: ${failedPaymentIntent.last_payment_error?.message}`
      );
      break;

    default:
      console.log(`🔹 Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

// Function to send confirmation email
async function sendConfirmationEmail(email: string, orderId: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Umm Yahya's Bakery" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Payment Confirmation - Order #${orderId}`,
    text: `Your payment has been successfully received. Your order ID is: ${orderId}`,
    html: `<p>Your payment has been successfully received.</p><p><strong>Order ID:</strong> ${orderId}</p>`,
  });
}

// Function to handle successful payments
async function handleSuccessfulPayment(paymentIntent: Stripe.PaymentIntent) {
  const {
    order_id,
    customer_email,
    customer_name,
    pickup_date,
    pickup_time,
    items_json,
  } = paymentIntent.metadata || {};

  if (!order_id || !customer_email || !items_json) {
    console.error("⚠️ Missing necessary metadata in paymentIntent");
    return;
  }

  try {
    const items = JSON.parse(items_json || "[]");
    console.log(`🔹 Processing order #${order_id} for ${customer_name}`);
    console.log(`📅 Pickup scheduled for ${pickup_date} at ${pickup_time}`);
    console.log(`🛍️ Order items:`, items);

    await sendConfirmationEmail(customer_email, order_id);
  } catch (error) {
    console.error("❌ Error processing successful payment:", error);
  }
}

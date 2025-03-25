import { loadStripe, Stripe } from "@stripe/stripe-js";

// Initialize Stripe on the client side
let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");
  }
  return stripePromise;
};

// Function to create a payment intent
export async function createPaymentIntent(items: any[], customerInfo: any) {
  try {
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items,
        customerInfo,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create payment intent");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
}

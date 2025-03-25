import { NextResponse } from "next/server"

// This endpoint provides the public Stripe key to the client
// It's safer than hardcoding it in the frontend
export async function GET() {
  return NextResponse.json({
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  })
}


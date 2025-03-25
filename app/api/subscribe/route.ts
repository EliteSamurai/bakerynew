import { NextResponse } from "next/server";
import axios from "axios";

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY!;
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID!;
const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX!; // e.g., 'us21'

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;

    const response = await axios.post(
      url,
      {
        email_address: email,
        status: "subscribed",
      },
      {
        headers: {
          Authorization: `apikey ${MAILCHIMP_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({ message: "Subscription successful" });
  } catch (error: any) {
    console.error("Mailchimp error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to subscribe. Try again later." },
      { status: 500 }
    );
  }
}

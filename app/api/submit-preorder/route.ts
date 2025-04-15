import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerInfo, items, total } = body;

    // Format items for email
    const itemsList = items
      .map(
        (item: any) =>
          `${item.name} - Quantity: ${item.quantity}${
            item.selectedTopping ? ` (${item.selectedTopping})` : ""
          } - $${((item.price / 100) * item.quantity).toFixed(2)}`
      )
      .join("\n");

    // Customer confirmation email
    const customerEmail = {
      from: process.env.EMAIL_USER,
      to: customerInfo.email,
      subject: "Your Preorder Confirmation - Umm Yahya's Bakery",
      text: `
Dear ${customerInfo.name},

Thank you for your preorder! We've received your order and will have it ready for pickup on ${customerInfo.pickupDate} at ${customerInfo.pickupTime}.

Order Details:
${itemsList}

Total: $${total.toFixed(2)}

Pickup Information:
Date: ${customerInfo.pickupDate}
Time: ${customerInfo.pickupTime}

If you need to make any changes to your order, please contact us at ${process.env.EMAIL_USER}.

Thank you for choosing Umm Yahya's Bakery!
`,
    };

    // Bakery notification email
    const bakeryEmail = {
      from: process.env.EMAIL_USER,
      to: process.env.BAKERY_EMAIL || process.env.EMAIL_USER, // Fallback to sender if bakery email not set
      subject: "New Preorder Received",
      text: `
New preorder received!

Customer Information:
Name: ${customerInfo.name}
Email: ${customerInfo.email}
Phone: ${customerInfo.phone}

Pickup Details:
Date: ${customerInfo.pickupDate}
Time: ${customerInfo.pickupTime}

Order Items:
${itemsList}

Total: $${total.toFixed(2)}

${customerInfo.specialInstructions ? `Special Instructions: ${customerInfo.specialInstructions}` : ""}
`,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(customerEmail),
      transporter.sendMail(bakeryEmail),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing preorder:", error);
    return NextResponse.json(
      { error: "Failed to process preorder" },
      { status: 500 }
    );
  }
}

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Umm Yahya's Bakery | Homemade Sweets & Desserts in Eagan, MN",
  description:
    "Delight in freshly baked homemade sweets and desserts from Umm Yahya's Bakery in Eagan, MN. Made with love, our treats include cakes, cookies, pastries, and more. Order today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main className="pt-[72px] md:pt-[80px]">{children}</main>
          <Analytics />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

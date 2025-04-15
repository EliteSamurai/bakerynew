import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { PreorderProvider } from "@/context/preordercontext";
import { Quicksand, Dancing_Script } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing-script",
});

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
    <html
      lang="en"
      className={`${quicksand.variable} ${dancingScript.variable}`}
    >
      <body className="font-sans">
        <PreorderProvider>
          <Navbar />
          <main className="pt-[72px] md:pt-[80px]">{children}</main>
          <Analytics />
          <Footer />
        </PreorderProvider>
      </body>
    </html>
  );
}

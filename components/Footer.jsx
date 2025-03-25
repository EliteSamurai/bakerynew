"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopyright,
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faYoutube,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import Logo from "@/public/images/Eagan Bakery Shop Logo.png";
import axios from "axios";
import { useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // "success" | "error"

  const handleSubscribe = async () => {
    if (!email) {
      setStatus("error");
      return;
    }

    try {
      await axios.post("/api/subscribe", { email });
      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <footer className="w-full bg-black text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and About */}
          <div className="flex flex-col items-center md:items-start">
            <Link
              href="/"
              className="mb-4 transform transition-transform hover:scale-105"
            >
              <Image
                src={Logo || "/placeholder.svg"}
                width={140}
                height={70}
                alt="Umm Yahya Bakery Logo"
                className="bg-white p-2 rounded-lg"
              />
            </Link>
            <p className="text-gray-300 text-sm mb-4 text-center md:text-left">
              Delicious homemade treats baked with love in Eagan, Minnesota. We
              specialize in cookies, cakes, and pastries made from scratch.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/ummyahyabakery/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#e79fc4] flex items-center justify-center transition-transform hover:scale-110"
                aria-label="Instagram"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  size="lg"
                  className="text-white"
                />
              </a>
              <a
                href="mailto:omar.aden2324@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#e79fc4] flex items-center justify-center transition-transform hover:scale-110"
                aria-label="Email"
              >
                <FontAwesomeIcon
                  icon={faGoogle}
                  size="lg"
                  className="text-white"
                />
              </a>
              <a
                href="https://www.youtube.com/@UmmYahyaKitchen"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#e79fc4] flex items-center justify-center transition-transform hover:scale-110"
                aria-label="YouTube"
              >
                <FontAwesomeIcon
                  icon={faYoutube}
                  size="lg"
                  className="text-white"
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold mb-4 relative">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#e79fc4]"></span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-[#e79fc4] transition-colors flex items-center"
                >
                  <span className="mr-2">›</span> Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-[#e79fc4] transition-colors flex items-center"
                >
                  <span className="mr-2">›</span> About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/order"
                  className="text-gray-300 hover:text-[#e79fc4] transition-colors flex items-center"
                >
                  <span className="mr-2">›</span> Order Now
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/gallery"
                  className="text-gray-300 hover:text-[#e79fc4] transition-colors flex items-center"
                >
                  <span className="mr-2">›</span> Gallery
                </Link>
              </li> */}
              <li>
                <Link
                  href="/contact#faq"
                  className="text-gray-300 hover:text-[#e79fc4] transition-colors flex items-center"
                >
                  <span className="mr-2">›</span> FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold mb-4 relative">
              Contact Us
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#e79fc4]"></span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-[#e79fc4] mt-1 mr-3"
                />
                <span className="text-gray-300">Eagan, Minnesota</span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="text-[#e79fc4] mr-3"
                />
                <a
                  href="tel:6513637944"
                  className="text-gray-300 hover:text-[#e79fc4] transition-colors"
                >
                  (651) 363-7944
                </a>{" "}
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-[#e79fc4] mr-3"
                />
                <a
                  href="mailto:omar.aden2324@gmail.com"
                  className="text-gray-300 hover:text-[#e79fc4] transition-colors"
                >
                  omar.aden2324@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold mb-4 relative">
              Business Hours
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#e79fc4]"></span>
            </h3>
            <ul className="space-y-2">
              <li className="flex justify-between w-full">
                <span className="text-gray-300">Saturday - Thursday:</span>
                <span className="text-[#e79fc4]">11 AM - 6 PM</span>
              </li>
              <li className="flex justify-between w-full">
                <span className="text-gray-300">Friday:</span>
                <span className="text-[#e79fc4]">Closed</span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-[#e79fc4]/10 rounded-lg border border-[#e79fc4]/20">
              <p className="text-sm text-gray-300">
                <span className="font-bold text-[#e79fc4]">Note:</span> Order by
                4:30 PM for same-day pickup
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter (Optional) */}
        <div className="border-t border-gray-800 pt-8 pb-6 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-bold mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-gray-300 text-sm">
                Get updates on new treats and special offers
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-black px-4 py-2 rounded-l-full w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-[#e79fc4]"
              />
              <button
                onClick={handleSubscribe}
                className="bg-[#e79fc4] hover:bg-[#e79fc4]/80 text-white px-4 py-2 rounded-r-full transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>

          {status === "success" && (
            <p className="text-green-500 mt-2">✅ Subscription successful!</p>
          )}
          {status === "error" && (
            <p className="text-red-500 mt-2">
              ❌ Failed to subscribe. Try again.
            </p>
          )}
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm mb-4 md:mb-0 flex items-center">
            <FontAwesomeIcon icon={faCopyright} className="mr-1" size="xs" />
            <span>{currentYear} Umm Yahya Bakery. All Rights Reserved.</span>
          </p>
          <div className="flex items-center">
            <p className="text-gray-400 text-sm">
              Made with{" "}
              <FontAwesomeIcon icon={faHeart} className="text-[#e79fc4] mx-1" />{" "}
              by
              <a
                href="https://www.omaraden.tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e79fc4] hover:text-[#e79fc4]/80 ml-1 transition-colors"
              >
                Omar Aden
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

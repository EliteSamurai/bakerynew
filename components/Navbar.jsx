"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faShoppingBag,
  faSearch,
  faTimes,
  faChevronDown,
  faPhone,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "@/public/images/ummyahya_optimized.png";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { selectedProduct } = useCart();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Set active link based on current path
    setActiveLink(window.location.pathname);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isNavOpen) {
        setIsNavOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isNavOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isNavOpen]);

  const closeModal = () => {
    setModalOpen(false);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Navigation links data
  const navLinks = [
    { href: "/", label: "Home" },
    {
      href: "/about",
      label: "About Us",
      dropdown: [
        { href: "/about#our-story", label: "Our Story" },
        { href: "/about#meet-the-baker", label: "Meet the Baker" },
        { href: "/about#our-values", label: "Our Values" },
      ],
    },
    // {
    //   href: "/menu",
    //   label: "Menu",
    //   dropdown: [
    //     { href: "/menu/cookies", label: "Cookies" },
    //     { href: "/menu/cakes", label: "Cakes" },
    //     { href: "/menu/pastries", label: "Pastries" },
    //     { href: "/menu/seasonal", label: "Seasonal Specials" },
    //   ],
    // },
    { href: "/order", label: "Order Now" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div
      className={`w-full ${isModalOpen ? "pt-[40px]" : ""} transition-all duration-300`}
    >
      {/* Top Info Bar */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full bg-[#e79fc4] text-white py-2 px-4 flex justify-between items-center z-[1000]">
          <div className="flex items-center text-xs md:text-sm">
            <FontAwesomeIcon icon={faPhone} className="mr-2" />
            <a
              href="tel:6513637944"
              className="mr-4 hidden sm:inline text-inherit no-underline"
            >
              (651) 363-7944
            </a>
            <FontAwesomeIcon icon={faClock} className="mr-2" />
            <span>Order by 4:30pm for same-day pickup</span>
          </div>
          <div className="flex items-center">
            <p className="mr-2 text-xs md:text-sm">
              Homemade products not subject to state inspection
            </p>
            <button
              onClick={closeModal}
              className="bg-white/20 hover:bg-white/30 rounded-full w-6 h-6 flex items-center justify-center transition-colors"
              aria-label="Close notification"
            >
              <FontAwesomeIcon
                icon={faXmark}
                size="sm"
                className="text-white"
              />
            </button>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isModalOpen ? "mt-[40px]" : "mt-0"} ${
          isScrolled ? "bg-white shadow-md py-2" : "bg-white/95 py-4"
        }}`}
        aria-label="Main Navigation"
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-50 transition-transform duration-300 hover:scale-105"
            aria-label="Go to homepage"
          >
            <Image
              src={Logo || "/placeholder.svg"}
              width={120}
              height={60}
              alt="Umm Yahya's Bakery Logo"
              priority
              className={`transition-all duration-300 ${isScrolled ? "w-[100px] h-[50px]" : "w-[120px] h-[60px]"}}`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center lg:space-x-8 lg:text-base md:space-x-5 md:text-sm">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-black font-medium transition-all duration-300 hover:text-[#e79fc4] ${
                    activeLink === link.href ? "text-[#e79fc4]" : ""
                  }`}
                  aria-label={link.label}
                >
                  <span className="flex items-center">
                    {link.label}
                    {link.dropdown && (
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="ml-1 text-xs transition-transform duration-300 group-hover:rotate-180"
                      />
                    )}
                  </span>
                </Link>

                {/* Dropdown Menu */}
                {link.dropdown && (
                  <div className="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100 z-50">
                    <div className="py-2">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#e79fc4]/10 hover:text-[#e79fc4] transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Search Button */}
            {/* <button
              onClick={toggleSearch}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Search"
            >
              <FontAwesomeIcon icon={faSearch} className="text-gray-700" />
            </button> */}

            {/* Cart Button */}
            <Link
              href="/order"
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Shopping cart"
            >
              <FontAwesomeIcon icon={faShoppingBag} className="text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-[#e79fc4] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {selectedProduct.reduce(
                  (total, item) => total + item.quantity,
                  0
                )}
              </span>
            </Link>

            {/* Order Now Button */}
            <Link href="/order">
              <button className="bg-[#e79fc4] hover:bg-[#e79fc4]/80 text-white px-4 py-2 rounded-full font-medium transition-colors">
                Order Now
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden z-50 w-10 h-10 relative focus:outline-none ${isNavOpen ? "open" : ""}`}
            onClick={toggleNav}
            aria-label={isNavOpen ? "Close menu" : "Open menu"}
            aria-expanded={isNavOpen}
          >
            <span
              className={`block absolute h-0.5 w-6 bg-black transform transition duration-300 ease-in-out ${isNavOpen ? "rotate-45 translate-y-1.5" : "-translate-y-1.5"}`}
            ></span>
            <span
              className={`block absolute h-0.5 w-6 bg-black transform transition duration-300 ease-in-out ${isNavOpen ? "opacity-0" : "opacity-100"}`}
            ></span>
            <span
              className={`block absolute h-0.5 w-6 bg-black transform transition duration-300 ease-in-out ${isNavOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-1.5"}`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
            isNavOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={closeNav}
          aria-hidden={!isNavOpen}
        ></div>

        <div
          className={`fixed top-0 right-0 w-[80%] max-w-sm h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
            isNavOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <Image
                src={Logo || "/placeholder.svg"}
                width={100}
                height={50}
                alt="Umm Yahya's Bakery Logo"
                className="w-[100px]"
              />
              <button
                onClick={closeNav}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Close menu"
              >
                <FontAwesomeIcon icon={faTimes} className="text-gray-700" />
              </button>
            </div>

            {/* Mobile Menu Links */}
            <div className="flex-1 overflow-y-auto py-4">
              <ul className="space-y-2 px-4">
                {navLinks.map((link) => (
                  <li key={link.href} className="border-b border-gray-100 pb-2">
                    <Link
                      href={link.href}
                      onClick={closeNav}
                      className={`block py-2 text-lg font-medium ${
                        activeLink === link.href
                          ? "text-[#e79fc4]"
                          : "text-gray-800"
                      }`}
                    >
                      {link.label}
                    </Link>

                    {/* Mobile Dropdown Items */}
                    {link.dropdown && (
                      <ul className="pl-4 mt-1 space-y-1">
                        {link.dropdown.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              onClick={closeNav}
                              className="block py-1 text-gray-600 hover:text-[#e79fc4] text-sm"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Menu Footer */}
            <div className="p-4 border-t">
              <Link href="/order">
                <button className="w-full bg-[#e79fc4] hover:bg-[#e79fc4]/80 text-white py-3 rounded-full font-medium transition-colors">
                  Order Now
                </button>
              </Link>
              <div className="flex justify-between mt-4">
                <button className="flex items-center text-gray-700">
                  <FontAwesomeIcon icon={faSearch} className="mr-2" />
                  <span>Search</span>
                </button>
                <Link href="/order" className="flex items-center text-gray-700">
                  <FontAwesomeIcon icon={faShoppingBag} className="mr-2" />
                  <span>
                    Cart ({" "}
                    {selectedProduct.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                    )
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 z-[60] ${
          isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="bg-white rounded-lg w-full max-w-2xl p-6 transform transition-transform duration-300 scale-95">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Search Our Bakery</h3>
            <button
              onClick={toggleSearch}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Close search"
            >
              <FontAwesomeIcon icon={faTimes} className="text-gray-700" />
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for cookies, cakes, pastries..."
              className="w-full p-4 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#e79fc4]"
              autoFocus
            />
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#e79fc4]"
              aria-label="Submit search"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          <div className="mt-4">
            <p className="text-gray-500 text-sm">
              Popular searches: Chocolate Chip Cookies, Tres Leches, Birthday
              Cake
            </p>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from being hidden under fixed navbar */}
      <div
        className={`h-[${isScrolled ? "70px" : "88px"}] ${isModalOpen ? "mt-[40px]" : ""}`}
      ></div>
    </div>
  );
}

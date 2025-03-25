"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGavel,
  faArrowUp,
  faChevronRight,
  faHandshake,
  faCreditCard,
  faCopyright,
  faShieldAlt,
  faFileContract,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

export default function TermsOfService() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Sections for table of contents and navigation
  const sections = [
    { id: "acceptance", title: "Acceptance of Terms", icon: faHandshake },
    { id: "orders", title: "Orders & Payments", icon: faCreditCard },
    { id: "intellectual", title: "Intellectual Property", icon: faCopyright },
    { id: "liability", title: "Limitation of Liability", icon: faShieldAlt },
    { id: "changes", title: "Changes to Terms", icon: faFileContract },
    { id: "contact", title: "Contact Us", icon: faEnvelope },
  ];

  // Handle scroll events for back-to-top button and section highlighting
  useEffect(() => {
    const handleScroll = () => {
      // Show back-to-top button when scrolled down
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      // Highlight active section in table of contents
      const sectionElements = sections.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const { id, element } = sectionElements[i];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to section function
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#e79fc4]/20 to-[#e79fc4]/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-md mb-6">
            <FontAwesomeIcon
              icon={faGavel}
              className="text-[#e79fc4] text-3xl"
            />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using our website or
            placing an order. By using our services, you agree to be bound by
            these terms.
          </p>
          <div className="mt-6 text-sm text-gray-500">
            Last updated: March 2025
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Table of Contents - Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-100">
                Contents
              </h2>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-center transition-colors ${
                        activeSection === section.id
                          ? "bg-[#e79fc4]/10 text-[#e79fc4] font-medium"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={section.icon}
                        className="mr-3 w-4"
                      />
                      <span>{section.title}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-4 border-t border-gray-100">
                <Link
                  href="/privacy"
                  className="flex items-center text-[#e79fc4] hover:underline font-medium"
                >
                  <span>View Privacy Policy</span>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="ml-2 text-xs"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <section id="acceptance" className="mb-12 scroll-mt-24">
                <div className="flex items-center mb-4">
                  <FontAwesomeIcon
                    icon={faHandshake}
                    className="text-[#e79fc4] mr-3 text-xl"
                  />
                  <h2 className="text-2xl font-bold">Acceptance of Terms</h2>
                </div>
                <div className="pl-8 space-y-4">
                  <p>
                    By accessing or using our website, placing an order, or
                    interacting with any of our services, you acknowledge that
                    you have read, understood, and agree to be bound by these
                    Terms of Service.
                  </p>
                  <div className="bg-[#e79fc4]/5 border-l-4 border-[#e79fc4] p-4">
                    <p className="italic">
                      If you do not agree with any part of these terms, you may
                      not use our website or services.
                    </p>
                  </div>
                  <p>
                    These Terms of Service apply to all users of the site,
                    including without limitation users who are browsers,
                    customers, merchants, and/or contributors of content.
                  </p>
                </div>
              </section>

              <section id="orders" className="mb-12 scroll-mt-24">
                <div className="flex items-center mb-4">
                  <FontAwesomeIcon
                    icon={faCreditCard}
                    className="text-[#e79fc4] mr-3 text-xl"
                  />
                  <h2 className="text-2xl font-bold">Orders & Payments</h2>
                </div>
                <div className="pl-8 space-y-4">
                  <p>
                    When placing an order through our website, you agree to
                    provide current, complete, and accurate purchase and account
                    information. We have specific policies regarding ordering,
                    payment, and cancellations:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold mb-2">Order Processing</h3>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>
                        All orders must be prepaid before processing begins
                      </li>
                      <li>
                        Order confirmation will be sent via email after payment
                        is received
                      </li>
                      <li>
                        We reserve the right to refuse or cancel any order for
                        any reason
                      </li>
                      <li>
                        Same-day pickup orders must be placed by 4:30 PM; orders
                        placed after this time will be available the following
                        business day
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold mb-2">Payments</h3>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>
                        All prices are listed in USD and are subject to change
                        without notice
                      </li>
                      <li>
                        We accept major credit cards, debit cards, and other
                        payment methods as indicated during checkout
                      </li>
                      <li>
                        Payment information is securely processed through our
                        payment processors
                      </li>
                      <li>
                        Applicable taxes will be added to your order total
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold mb-2">Cancellations & Refunds</h3>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>
                        Cancellations are only accepted within 24 hours of
                        placing an order
                      </li>
                      <li>
                        For cancellations made within the acceptable timeframe,
                        a full refund will be issued to the original payment
                        method
                      </li>
                      <li>
                        Orders that have entered production cannot be canceled
                        and are not eligible for refunds
                      </li>
                      <li>
                        If you are unsatisfied with your order, please contact
                        us within 24 hours of pickup to discuss resolution
                        options
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="intellectual" className="mb-12 scroll-mt-24">
                <div className="flex items-center mb-4">
                  <FontAwesomeIcon
                    icon={faCopyright}
                    className="text-[#e79fc4] mr-3 text-xl"
                  />
                  <h2 className="text-2xl font-bold">Intellectual Property</h2>
                </div>
                <div className="pl-8 space-y-4">
                  <p>
                    All content on this website, including but not limited to
                    text, graphics, logos, images, audio clips, digital
                    downloads, data compilations, and software, is the property
                    of Umm Yahya's Bakery or its content suppliers and is
                    protected by international copyright laws.
                  </p>
                  <div className="bg-[#e79fc4]/5 border-l-4 border-[#e79fc4] p-4">
                    <p>
                      The compilation of all content on this site is the
                      exclusive property of Umm Yahya's Bakery and is protected
                      by copyright laws.
                    </p>
                  </div>
                  <p>You agree not to:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="bg-[#e79fc4]/10 rounded-full p-1 mr-3 mt-1">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="text-[#e79fc4] text-xs"
                        />
                      </div>
                      <div>
                        Use our content for any commercial purpose without prior
                        written consent
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[#e79fc4]/10 rounded-full p-1 mr-3 mt-1">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="text-[#e79fc4] text-xs"
                        />
                      </div>
                      <div>
                        Modify, copy, distribute, or create derivative works
                        based on our content
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[#e79fc4]/10 rounded-full p-1 mr-3 mt-1">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="text-[#e79fc4] text-xs"
                        />
                      </div>
                      <div>
                        Remove any copyright or other proprietary notices from
                        our materials
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[#e79fc4]/10 rounded-full p-1 mr-3 mt-1">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="text-[#e79fc4] text-xs"
                        />
                      </div>
                      <div>
                        Transfer the materials to another person or "mirror"
                        them on any other server
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              <section id="liability" className="mb-12 scroll-mt-24">
                <div className="flex items-center mb-4">
                  <FontAwesomeIcon
                    icon={faShieldAlt}
                    className="text-[#e79fc4] mr-3 text-xl"
                  />
                  <h2 className="text-2xl font-bold">
                    Limitation of Liability
                  </h2>
                </div>
                <div className="pl-8 space-y-4">
                  <p>
                    Umm Yahya's Bakery and its suppliers shall not be liable for
                    any damages arising from the use of our website or products.
                    This includes but is not limited to:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="bg-[#e79fc4]/10 rounded-full p-1 mr-3 mt-1">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="text-[#e79fc4] text-xs"
                        />
                      </div>
                      <div>
                        Direct, indirect, incidental, punitive, and
                        consequential damages
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[#e79fc4]/10 rounded-full p-1 mr-3 mt-1">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="text-[#e79fc4] text-xs"
                        />
                      </div>
                      <div>
                        Loss of data, income, profit, or business opportunity
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[#e79fc4]/10 rounded-full p-1 mr-3 mt-1">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="text-[#e79fc4] text-xs"
                        />
                      </div>
                      <div>
                        Damages resulting from allergic reactions or food
                        sensitivities
                      </div>
                    </li>
                  </ul>
                  <div className="bg-[#e79fc4]/5 border-l-4 border-[#e79fc4] p-4">
                    <p className="font-medium">Important Health Notice:</p>
                    <p className="mt-2">
                      Our products may contain or come into contact with common
                      allergens including nuts, dairy, eggs, wheat, and soy.
                      While we take precautions, we cannot guarantee that our
                      products are free from allergens. Customers with severe
                      allergies should contact us before placing an order.
                    </p>
                  </div>
                  <p>
                    By using our website and services, you expressly agree that
                    your use is at your sole risk and that you assume full
                    responsibility for any outcome resulting from your use.
                  </p>
                </div>
              </section>

              <section id="changes" className="mb-12 scroll-mt-24">
                <div className="flex items-center mb-4">
                  <FontAwesomeIcon
                    icon={faFileContract}
                    className="text-[#e79fc4] mr-3 text-xl"
                  />
                  <h2 className="text-2xl font-bold">Changes to Terms</h2>
                </div>
                <div className="pl-8 space-y-4">
                  <p>
                    We reserve the right to update, change, or replace any part
                    of these Terms of Service at any time without prior notice.
                    It is your responsibility to check this page periodically
                    for changes.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold mb-2">
                      How We Notify You of Changes
                    </h3>
                    <p>
                      We may provide notice of changes in one or more of the
                      following ways:
                    </p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Posting a notice on our website</li>
                      <li>
                        Sending an email to the address associated with your
                        account
                      </li>
                      <li>Displaying a notice during the ordering process</li>
                    </ul>
                  </div>
                  <p>
                    Your continued use of our website and services following the
                    posting of changes to these Terms of Service constitutes
                    your acceptance of those changes. If you do not agree to the
                    new terms, please stop using our website and services.
                  </p>
                </div>
              </section>

              <section id="contact" className="scroll-mt-24">
                <div className="flex items-center mb-4">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-[#e79fc4] mr-3 text-xl"
                  />
                  <h2 className="text-2xl font-bold">Contact Us</h2>
                </div>
                <div className="pl-8 space-y-4">
                  <p>
                    If you have any questions or concerns about our Terms of
                    Service, please don't hesitate to contact us. We're here to
                    help clarify any points and address any issues you may have.
                  </p>
                  <div className="bg-[#e79fc4]/10 p-6 rounded-lg text-center">
                    <p className="mb-3 font-medium">Email us at:</p>
                    <a
                      href="mailto:omar.aden2324@gmail.com"
                      className="text-[#e79fc4] text-lg font-bold hover:underline"
                    >
                      omar.aden2324@gmail.com
                    </a>
                    <p className="mt-4 text-sm text-gray-600">
                      We aim to respond to all inquiries within 24 business
                      hours.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Back to top button */}
            <div className="text-center mt-8">
              <button
                onClick={() => scrollToTop()}
                className="inline-flex items-center text-[#e79fc4] hover:underline"
              >
                <FontAwesomeIcon icon={faArrowUp} className="mr-2" />
                Back to top
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-[#e79fc4] text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:bg-[#e79fc4]/80"
          aria-label="Back to top"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
    </div>
  );
}

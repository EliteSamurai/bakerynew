"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShield,
  faArrowUp,
  faChevronRight,
  faCookie,
  faLock,
  faEnvelope,
  faDatabase,
  faUserShield,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";

export default function PrivacyPolicy() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Sections for table of contents and navigation
  const sections = [
    { id: "information", title: "Information We Collect", icon: faDatabase },
    { id: "usage", title: "How We Use Your Information", icon: faUserShield },
    { id: "cookies", title: "Cookies & Tracking", icon: faCookie },
    { id: "protection", title: "Data Protection", icon: faLock },
    { id: "third-party", title: "Third-Party Services", icon: faHandshake },
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
  }, [sections]);

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
              icon={faShield}
              className="text-[#e79fc4] text-3xl"
            />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We value your privacy and are committed to protecting your personal
            information. This policy explains how we collect, use, and safeguard
            your data.
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
                  href="/tos"
                  className="flex items-center text-[#e79fc4] hover:underline font-medium"
                >
                  <span>View Terms of Service</span>
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
              <section id="information" className="mb-12 scroll-mt-24">
                <div className="flex items-center mb-4">
                  <FontAwesomeIcon
                    icon={faDatabase}
                    className="text-[#e79fc4] mr-3 text-xl"
                  />
                  <h2 className="text-2xl font-bold">Information We Collect</h2>
                </div>
                <div className="pl-8 space-y-4">
                  <p>
                    We collect various types of information to provide and
                    improve our services to you. This information falls into two
                    main categories:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold mb-2">Personal Information</h3>
                    <p>
                      When you place an order or contact us, we may collect:
                    </p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>
                        Name and contact details (email address, phone number)
                      </li>
                      <li>Billing and delivery address</li>
                      <li>
                        Payment information (processed securely through our
                        payment providers)
                      </li>
                      <li>Order history and preferences</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold mb-2">Non-Personal Information</h3>
                    <p>We also collect non-personal information through:</p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Cookies and similar technologies</li>
                      <li>Log files and analytics data</li>
                      <li>
                        Device information (browser type, operating system)
                      </li>
                      <li>Usage patterns and preferences</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="usage" className="mb-12 scroll-mt-24">
                <div className="flex items-center mb-4">
                  <FontAwesomeIcon
                    icon={faUserShield}
                    className="text-[#e79fc4] mr-3 text-xl"
                  />
                  <h2 className="text-2xl font-bold">
                    How We Use Your Information
                  </h2>
                </div>
                <div className="pl-8 space-y-4">
                  <p>
                    We use the information we collect for various purposes,
                    always with the goal of providing you with the best possible
                    experience. Your information helps us:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-[#e79fc4]/10 rounded-full p-1 mr-3 mt-1">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="text-[#e79fc4] text-xs"
                        />
                      </div>
                      <div>
                        <span className="font-medium">
                          Process and fulfill your orders:
                        </span>{" "}
                        Including payment processing, delivery coordination, and
                        order confirmations.
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
                        <span className="font-medium">
                          Improve our website and services:
                        </span>{" "}
                        Analyzing how customers use our site helps us enhance
                        the user experience and develop new features.
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
                        <span className="font-medium">
                          Communicate with you:
                        </span>{" "}
                        Responding to inquiries, providing customer support, and
                        sending important updates about your orders.
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
                        <span className="font-medium">
                          Send promotional content:
                        </span>{" "}
                        If you opt-in, we may send you newsletters, special
                        offers, and other marketing communications. You can
                        opt-out at any time.
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              <section id="cookies" className="mb-12 scroll-mt-24">
                <div className="flex items-center mb-4">
                  <FontAwesomeIcon
                    icon={faCookie}
                    className="text-[#e79fc4] mr-3 text-xl"
                  />
                  <h2 className="text-2xl font-bold">Cookies & Tracking</h2>
                </div>
                <div className="pl-8 space-y-4">
                  <p>
                    Our website uses cookies and similar tracking technologies
                    to enhance your browsing experience and collect information
                    about how you use our site.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold mb-2">What Are Cookies?</h3>
                    <p>
                      Cookies are small text files that are stored on your
                      device when you visit our website. They help us recognize
                      your device and remember certain information about your
                      visit.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold mb-2">How We Use Cookies</h3>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>
                        Essential cookies: Required for the website to function
                        properly
                      </li>
                      <li>
                        Analytical cookies: Help us understand how visitors
                        interact with our website
                      </li>
                      <li>
                        Functional cookies: Remember your preferences and
                        settings
                      </li>
                      <li>
                        Marketing cookies: Track your browsing habits to deliver
                        targeted advertising
                      </li>
                    </ul>
                  </div>
                  <p>
                    You can control and manage cookies through your browser
                    settings. Please note that disabling certain cookies may
                    affect the functionality of our website.
                  </p>
                </div>
              </section>

              <section id="protection" className="mb-12 scroll-mt-24">
                <div className="flex items-center mb-4">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="text-[#e79fc4] mr-3 text-xl"
                  />
                  <h2 className="text-2xl font-bold">Data Protection</h2>
                </div>
                <div className="pl-8 space-y-4">
                  <p>
                    We take the security of your personal information seriously
                    and implement appropriate measures to protect it from
                    unauthorized access, alteration, disclosure, or destruction.
                  </p>
                  <div className="bg-[#e79fc4]/5 border-l-4 border-[#e79fc4] p-4">
                    <p className="italic">
                      While we strive to use commercially acceptable means to
                      protect your personal information, no method of
                      transmission over the internet or electronic storage is
                      100% secure. We cannot guarantee absolute security.
                    </p>
                  </div>
                  <p>Our security measures include:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="bg-[#e79fc4]/10 rounded-full p-1 mr-3 mt-1">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="text-[#e79fc4] text-xs"
                        />
                      </div>
                      <div>
                        Secure Socket Layer (SSL) encryption for data
                        transmission
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[#e79fc4]/10 rounded-full p-1 mr-3 mt-1">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="text-[#e79fc4] text-xs"
                        />
                      </div>
                      <div>Regular security assessments and updates</div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[#e79fc4]/10 rounded-full p-1 mr-3 mt-1">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="text-[#e79fc4] text-xs"
                        />
                      </div>
                      <div>Restricted access to personal information</div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-[#e79fc4]/10 rounded-full p-1 mr-3 mt-1">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="text-[#e79fc4] text-xs"
                        />
                      </div>
                      <div>
                        Employee training on privacy and security practices
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              <section id="third-party" className="mb-12 scroll-mt-24">
                <div className="flex items-center mb-4">
                  <FontAwesomeIcon
                    icon={faHandshake}
                    className="text-[#e79fc4] mr-3 text-xl"
                  />
                  <h2 className="text-2xl font-bold">Third-Party Services</h2>
                </div>
                <div className="pl-8 space-y-4">
                  <p>
                    We may use third-party services to help us operate our
                    business and provide you with our services. These third
                    parties may have access to your personal information, but
                    only to perform specific tasks on our behalf.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold mb-2">
                      Examples of Third-Party Services
                    </h3>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Payment processors (e.g., Stripe, PayPal)</li>
                      <li>Analytics providers (e.g., Google Analytics)</li>
                      <li>Email service providers</li>
                      <li>Customer support tools</li>
                    </ul>
                  </div>
                  <p>
                    Each of these third parties has their own privacy policies
                    governing how they use and protect your data. We recommend
                    reviewing their policies for more information.
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
                    If you have any questions or concerns about our Privacy
                    Policy or how we handle your personal information, please
                    don't hesitate to contact us.
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

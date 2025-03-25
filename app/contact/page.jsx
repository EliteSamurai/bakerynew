"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faClock,
  faPaperPlane,
  faCheck,
  faExclamationCircle,
  faSpinner,
  faQuestionCircle,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faFacebook,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

// FAQ Item Component
const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-lg">{question}</span>
        <span
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
          <FontAwesomeIcon icon={faArrowRight} className="text-[#e79fc4]" />
        </span>
      </button>
      <div
        className={`mt-2 text-gray-600 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="py-2">{answer}</p>
      </div>
    </div>
  );
};

export default function Contact() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  // Form status
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    success: false,
    error: null,
  });

  // Validation state
  const [errors, setErrors] = useState({});

  // FAQ state
  const [openFAQ, setOpenFAQ] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormStatus({
      submitting: true,
      submitted: false,
      success: false,
      error: null,
    });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result.success) {
        setFormStatus({
          submitting: false,
          submitted: true,
          success: true,
          error: null,
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "General Inquiry",
          message: "",
        });

        setTimeout(() => {
          setFormStatus((prev) => ({ ...prev, submitted: false }));
        }, 5000);
      } else {
        throw new Error(result.error || "Failed to send message.");
      }
    } catch (error) {
      setFormStatus({
        submitting: false,
        submitted: true,
        success: false,
        error: error.message || "There was an error sending your message.",
      });
    }
  };

  // Toggle FAQ
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // FAQ data
  const faqs = [
    {
      question: "How far in advance should I place my order?",
      answer:
        "We recommend placing your order at least 48 hours in advance for regular items, and 3-5 days for custom or large orders. For special occasions like holidays, please order at least a week in advance.",
    },
    {
      question: "Do you offer delivery?",
      answer:
        "We currently offer pickup only from our Eagan location. All orders must be picked up during our business hours. We're working on adding delivery options in the future!",
    },
    {
      question: "Can you accommodate dietary restrictions?",
      answer:
        "We offer some options for common dietary needs. Please contact us directly to discuss specific requirements, and we'll let you know if we can accommodate your needs.",
    },
    {
      question: "How do I place a custom order?",
      answer:
        "For custom orders, please fill out our contact form with details about your request, or call us directly. We'll get back to you within 24 hours to discuss your needs and provide a quote.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept cash, credit/debit cards, and mobile payment options like Apple Pay and Google Pay. For large orders, we may require a deposit at the time of ordering.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#e79fc4]/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Have a question or want to place a special order? We're here to
              help make your sweet dreams come true!
            </p>
            <div className="flex justify-center space-x-4 pb-5">
              <a
                href="https://www.instagram.com/ummyahyabakery/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#e79fc4] flex items-center justify-center transition-transform hover:scale-110"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} className="text-white" />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#e79fc4] flex items-center justify-center transition-transform hover:scale-110"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} className="text-white" />
              </a>
              <a
                href="https://www.youtube.com/@UmmYahyaKitchen"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#e79fc4] flex items-center justify-center transition-transform hover:scale-110"
                aria-label="YouTube"
              >
                <FontAwesomeIcon icon={faYoutube} className="text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            className="relative block w-full h-[70px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="fill-white"
            ></path>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-12 gap-8">
            {/* Contact Information */}
            <div className="md:col-span-5 lg:col-span-4">
              <div className="bg-gray-50 p-8 rounded-2xl shadow-lg h-full">
                <h2 className="text-2xl font-bold mb-6 relative pb-3">
                  Contact Information
                  <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#e79fc4]"></span>
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#e79fc4]/10 flex items-center justify-center mr-4">
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="text-[#e79fc4]"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">Location</h3>
                      <p className="text-gray-700">Eagan, Minnesota</p>
                      <a
                        href="https://maps.google.com/?q=Eagan,Minnesota"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#e79fc4] hover:underline inline-flex items-center mt-1"
                      >
                        View on map
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="ml-1 text-xs"
                        />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#e79fc4]/10 flex items-center justify-center mr-4">
                      <FontAwesomeIcon
                        icon={faPhone}
                        className="text-[#e79fc4]"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <a
                        href="tel:6513637944"
                        className="text-gray-700 hover:text-[#e79fc4] transition-colors"
                      >
                        (651) 363-7944
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#e79fc4]/10 flex items-center justify-center mr-4">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="text-[#e79fc4]"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <a
                        href="mailto:omar.aden2324@gmail.com"
                        className="text-gray-700 hover:text-[#e79fc4] transition-colors break-all"
                      >
                        omar.aden2324@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#e79fc4]/10 flex items-center justify-center mr-4">
                      <FontAwesomeIcon
                        icon={faClock}
                        className="text-[#e79fc4]"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">Business Hours</h3>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex justify-between">
                          <span>Saturday - Thursday:</span>
                          <span className="text-[#e79fc4] font-medium">
                            11 AM - 6 PM
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span>Friday:</span>
                          <span className="text-[#e79fc4] font-medium">
                            Closed
                          </span>
                        </li>
                      </ul>
                      <p className="text-sm text-gray-600 mt-2">
                        <span className="font-medium">Note:</span> Order by 4:30
                        PM for same-day pickup
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="mt-8 rounded-lg overflow-hidden shadow-md h-64 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d45058.51237709251!2d-93.20339485!3d44.8041322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87f62f6c393c612d%3A0xb3c6f1806e78286b!2sEagan%2C%20MN!5e0!3m2!1sen!2sus!4v1648138362055!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Map of Eagan, Minnesota"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-7 lg:col-span-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 relative pb-3">
                  Send Us a Message
                  <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#e79fc4]"></span>
                </h2>

                {/* Form Success Message */}
                {formStatus.submitted && formStatus.success && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-green-500"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-800">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-green-700">
                        Thank you for reaching out. We'll get back to you within
                        24 hours.
                      </p>
                    </div>
                  </div>
                )}

                {/* Form Error Message */}
                {formStatus.submitted &&
                  !formStatus.success &&
                  formStatus.error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <FontAwesomeIcon
                          icon={faExclamationCircle}
                          className="text-red-500"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-red-800">
                          Something went wrong
                        </h3>
                        <p className="text-red-700">{formStatus.error}</p>
                      </div>
                    </div>
                  )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="name"
                      >
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${
                          errors.name
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e79fc4]`}
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-red-500 text-sm">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="email"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${
                          errors.email
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e79fc4]`}
                        placeholder="Your email"
                      />
                      {errors.email && (
                        <p className="mt-1 text-red-500 text-sm">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="phone"
                      >
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e79fc4]"
                        placeholder="Your phone number"
                      />
                    </div>

                    <div>
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="subject"
                      >
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e79fc4] bg-white"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Order Question">Order Question</option>
                        <option value="Custom Order">Custom Order</option>
                        <option value="Feedback">Feedback</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-gray-700 font-medium mb-2"
                      htmlFor="message"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${
                        errors.message
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e79fc4]`}
                      rows="5"
                      placeholder="How can we help you?"
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-red-500 text-sm">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="privacy"
                      className="w-4 h-4 text-[#e79fc4] border-gray-300 rounded focus:ring-[#e79fc4]"
                      required
                    />
                    <label
                      htmlFor="privacy"
                      className="ml-2 text-sm text-gray-700"
                    >
                      I agree to the{" "}
                      <Link
                        href="/privacy-policy"
                        className="text-[#e79fc4] hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus.submitting}
                    className="w-full bg-[#e79fc4] hover:bg-[#e79fc4]/80 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center disabled:opacity-70"
                  >
                    {formStatus.submitting ? (
                      <>
                        <FontAwesomeIcon
                          icon={faSpinner}
                          className="animate-spin mr-2"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">
                Find answers to common questions about our bakery and ordering
                process
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="divide-y divide-gray-200">
                {faqs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFAQ === index}
                    onClick={() => toggleFAQ(index)}
                  />
                ))}
              </div>

              <div className="mt-8 p-4 bg-[#e79fc4]/10 rounded-lg">
                <div className="flex items-start">
                  <FontAwesomeIcon
                    icon={faQuestionCircle}
                    className="text-[#e79fc4] mt-1 mr-3"
                  />
                  <p className="text-gray-700">
                    Don't see your question here? Contact us directly and we'll
                    be happy to help!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#e79fc4]/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8 md:p-12">
                <h2 className="text-2xl font-bold mb-4">Ready to Order?</h2>
                <p className="text-gray-700 mb-6">
                  Skip the contact form and go directly to our ordering page to
                  place your order now!
                </p>
                <Link href="/order">
                  <button className="bg-[#e79fc4] hover:bg-[#e79fc4]/80 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all hover:shadow-xl transform hover:-translate-y-1">
                    Order Now
                  </button>
                </Link>
              </div>
              <div className="md:w-1/2 bg-[#e79fc4]/20 p-8 md:p-12 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">Follow Us</h3>
                  <p className="text-gray-700 mb-4">
                    Stay updated with our latest treats and special offers!
                  </p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href="https://www.instagram.com/ummyahyabakery/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center transition-transform hover:scale-110"
                      aria-label="Instagram"
                    >
                      <FontAwesomeIcon
                        icon={faInstagram}
                        className="text-[#e79fc4]"
                      />
                    </a>
                    <a
                      href="https://www.facebook.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center transition-transform hover:scale-110"
                      aria-label="Facebook"
                    >
                      <FontAwesomeIcon
                        icon={faFacebook}
                        className="text-[#e79fc4]"
                      />
                    </a>
                    <a
                      href="https://www.youtube.com/@UmmYahyaKitchen"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center transition-transform hover:scale-110"
                      aria-label="YouTube"
                    >
                      <FontAwesomeIcon
                        icon={faYoutube}
                        className="text-[#e79fc4]"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePreorder } from "@/context/preordercontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faExclamationCircle,
  faCalendarAlt,
  faClock,
  faUser,
  faEnvelope,
  faPhone,
  faShoppingBag,
  faArrowLeft,
  faInfoCircle,
  faMinus,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

// Add this import at the top of the file
import { useRouter } from "next/navigation";

export default function PreorderCheckout() {
  const { preorderList, updateQuantity, removeFromPreorder } = usePreorder();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pickupDate: "",
    pickupTime: "",
    specialInstructions: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Add this inside the component, near the other hooks
  const router = useRouter();

  // Calculate total
  const subtotal = preorderList.reduce(
    (sum, item) => sum + (item.price / 100) * item.quantity,
    0
  );
  const tax = subtotal * 0.0725; // 7.25% tax rate
  const total = subtotal + tax;

  // Get tomorrow's date as minimum date for pickup
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get image URL based on product
  const getImageUrl = (product: any) => {
    if (!product.img) return "/placeholder.svg?height=64&width=64";

    if (typeof product.img === "string") {
      return product.img;
    }

    // If img is an object with topping options
    if (product.selectedTopping && product.img[product.selectedTopping]) {
      return product.img[product.selectedTopping];
    }

    // Fallback to the first image in the object
    if (typeof product.img === "object") {
      return Object.values(product.img)[0];
    }

    return "/placeholder.svg?height=64&width=64";
  };

  // Validate form
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    }

    if (!formData.pickupDate) {
      errors.pickupDate = "Pickup date is required";
    }

    if (!formData.pickupTime) {
      errors.pickupTime = "Pickup time is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Make an actual API call to the submit-preorder endpoint
      const response = await fetch("/api/submit-preorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerInfo: formData,
          items: preorderList.map((item) => ({
            id: item.id,
            name: item.topName,
            bottomName: item.bottomName,
            price: item.price,
            quantity: item.quantity,
            selectedTopping: item.selectedTopping,
          })),
          total: total,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit order");
      }

      setSubmitStatus("success");
    } catch (error) {
      console.error("Error submitting preorder:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Then replace the success state handling with this:
  useEffect(() => {
    if (submitStatus === "success") {
      // Redirect to success page with form data as URL parameters
      const params = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        pickupDate: formData.pickupDate,
        pickupTime: formData.pickupTime,
      }).toString();

      router.push(`/order/success?${params}`);
    }
  }, [submitStatus, formData, router]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <Link
          href="/order"
          className="inline-flex items-center text-gray-600 hover:text-[#e79fc4] mb-8 transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to Menu
        </Link>

        <h1 className="text-3xl font-bold mb-8 text-center">
          Complete Your Preorder
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white p-6 rounded-xl shadow-md sticky top-24">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-100 flex items-center">
                <FontAwesomeIcon
                  icon={faShoppingBag}
                  className="mr-2 text-[#e79fc4]"
                />
                Order Summary
              </h2>

              <div className="max-h-[400px] overflow-y-auto mb-6 pr-2">
                {preorderList.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedTopping || ""}`}
                    className="flex items-start space-x-3 mb-4 pb-4 border-b border-gray-100 last:border-0"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={getImageUrl(item) || "/placeholder.svg"}
                        alt={item.alt || item.topName}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          // Fallback if image doesn't exist
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg?height=64&width=64";
                        }}
                      />
                    </div>

                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.topName}</h3>
                        <span className="font-medium">
                          ${((item.price / 100) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {item.bottomName}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity - 1,
                                item.selectedTopping
                              )
                            }
                            className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                            aria-label="Decrease quantity"
                          >
                            <FontAwesomeIcon
                              icon={faMinus}
                              className="text-gray-600 text-xs"
                            />
                          </button>
                          <span className="text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity + 1,
                                item.selectedTopping
                              )
                            }
                            className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                            aria-label="Increase quantity"
                          >
                            <FontAwesomeIcon
                              icon={faPlus}
                              className="text-gray-600 text-xs"
                            />
                          </button>
                        </div>
                        <button
                          onClick={() =>
                            removeFromPreorder(item.id, item.selectedTopping)
                          }
                          className="text-red-500 hover:text-red-700 text-sm"
                          aria-label="Remove item"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                      {item.selectedTopping && (
                        <div className="mt-1">
                          <span className="text-xs px-2 py-1 bg-[#e79fc4]/10 text-[#e79fc4] rounded-full">
                            {item.selectedTopping}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-gray-100 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (7.25%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>

                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-xl">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[#e79fc4]/10 rounded-lg">
                <div className="flex items-start">
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="text-[#e79fc4] mt-1 mr-3"
                  />
                  <p className="text-sm">
                    This is a preorder. Payment will be collected when you pick
                    up your items.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Preorder Form */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h2 className="text-xl font-bold mb-6 pb-2 border-b border-gray-100">
                Customer & Pickup Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-gray-400"
                      />
                    </div>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-3 border ${
                        formErrors.name ? "border-red-300" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e79fc4]`}
                      placeholder="Your full name"
                    />
                  </div>
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="text-gray-400"
                      />
                    </div>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-3 border ${
                        formErrors.email ? "border-red-300" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e79fc4]`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FontAwesomeIcon
                        icon={faPhone}
                        className="text-gray-400"
                      />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-3 border ${
                        formErrors.phone ? "border-red-300" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e79fc4]`}
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  {formErrors.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pickup Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        className="text-gray-400"
                      />
                    </div>
                    <input
                      type="date"
                      name="pickupDate"
                      required
                      min={minDate}
                      value={formData.pickupDate}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-3 border ${
                        formErrors.pickupDate
                          ? "border-red-300"
                          : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e79fc4]`}
                    />
                  </div>
                  {formErrors.pickupDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.pickupDate}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Preorders require at least 1 day advance notice
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pickup Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FontAwesomeIcon
                        icon={faClock}
                        className="text-gray-400"
                      />
                    </div>
                    <select
                      name="pickupTime"
                      required
                      value={formData.pickupTime}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-3 border ${
                        formErrors.pickupTime
                          ? "border-red-300"
                          : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e79fc4] appearance-none bg-white`}
                    >
                      <option value="">Select a pickup time</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                    </select>
                  </div>
                  {formErrors.pickupTime && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.pickupTime}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Available pickup times: 9:00 AM - 5:00 PM
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e79fc4]"
                    placeholder="Any special requests or notes for your order"
                  ></textarea>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg mb-6">
                <h3 className="font-medium mb-2">Pickup Information</h3>
                <p className="text-sm text-gray-600">
                  Please bring your order confirmation email or ID when you
                  arrive. Payment will be collected at pickup. If you need to
                  cancel or modify your preorder, please contact us at least 24
                  hours before your scheduled pickup time.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#e79fc4] text-white py-4 rounded-lg hover:bg-[#e79fc4]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium"
              >
                {isSubmitting ? (
                  <>
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="animate-spin mr-2"
                    />
                    Processing...
                  </>
                ) : (
                  "Submit Preorder"
                )}
              </button>

              {submitStatus === "error" && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="text-red-500 mt-1 mr-3"
                  />
                  <div>
                    <h3 className="font-medium text-red-800">
                      Failed to submit preorder
                    </h3>
                    <p className="text-red-700">
                      Please try again or contact customer support if the issue
                      persists.
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

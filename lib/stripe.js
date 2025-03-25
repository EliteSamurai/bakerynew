"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCheck,
  faSpinner,
  faExclamationCircle,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { getStripe, createPaymentIntent } from "./stripe-client";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Checkout Form Component
const CheckoutForm = ({ selectedProduct, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    pickupDate: "",
    pickupTime: "",
    notes: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  // Calculate order total
  const subtotal = selectedProduct.reduce(
    (total, item) => total + (item.price / 100) * item.quantity,
    0
  );

  const tax = subtotal * 0.0725; // 7.25% tax rate
  const total = subtotal + tax;
  const totalInCents = Math.round(total * 100);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  // Create payment intent when component mounts
  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        // Only create payment intent when form is filled
        if (!formData.name || !formData.email || !formData.phone) {
          return;
        }

        setIsProcessing(true);
        const { clientSecret } = await createPaymentIntent(
          selectedProduct,
          formData
        );
        setClientSecret(clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
        setPaymentError(error.message);
      } finally {
        setIsProcessing(false);
      }
    };

    if (stripe) {
      fetchPaymentIntent();
    }
  }, [stripe, formData.name, formData.email, formData.phone, selectedProduct]);

  // Validate form
  const validateForm = () => {
    const errors = {};
    const requiredFields = [
      "name",
      "email",
      "phone",
      "pickupDate",
      "pickupTime",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        errors[field] =
          `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    try {
      // Confirm the card payment
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        throw new Error("Card element not found");
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
            },
          },
        }
      );

      if (error) {
        throw new Error(error.message);
      }

      if (paymentIntent.status === "succeeded") {
        onSuccess(formData);
      } else {
        throw new Error("Payment processing failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentError(error.message);
      onError(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              formErrors.name ? "border-red-300" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e79fc4]`}
            placeholder="Your full name"
          />
          {formErrors.name && (
            <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              formErrors.email ? "border-red-300" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e79fc4]`}
            placeholder="Your email address"
          />
          {formErrors.email && (
            <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-4 py-2 border ${
            formErrors.phone ? "border-red-300" : "border-gray-300"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e79fc4]`}
          placeholder="Your phone number"
        />
        {formErrors.phone && (
          <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Pickup Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="pickupDate"
            value={formData.pickupDate}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            className={`w-full px-4 py-2 border ${
              formErrors.pickupDate ? "border-red-300" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e79fc4]`}
          />
          {formErrors.pickupDate && (
            <p className="mt-1 text-sm text-red-600">{formErrors.pickupDate}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Pickup Time <span className="text-red-500">*</span>
          </label>
          <select
            name="pickupTime"
            value={formData.pickupTime}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              formErrors.pickupTime ? "border-red-300" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e79fc4] bg-white`}
          >
            <option value="">Select a time</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="1:00 PM">1:00 PM</option>
            <option value="2:00 PM">2:00 PM</option>
            <option value="3:00 PM">3:00 PM</option>
            <option value="4:00 PM">4:00 PM</option>
            <option value="5:00 PM">5:00 PM</option>
          </select>
          {formErrors.pickupTime && (
            <p className="mt-1 text-sm text-red-600">{formErrors.pickupTime}</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Special Instructions (Optional)
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e79fc4]"
          rows="3"
          placeholder="Any special requests or notes for your order"
        ></textarea>
      </div>

      <div className="p-4 bg-[#e79fc4]/10 rounded-lg mb-6">
        <h3 className="font-bold mb-4 flex items-center">
          <FontAwesomeIcon icon={faLock} className="mr-2 text-[#e79fc4]" />
          Payment Information
        </h3>

        <div className="mb-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
              hidePostalCode: true,
            }}
            className="p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <FontAwesomeIcon icon={faLock} className="mr-2 text-gray-400" />
          Your payment information is encrypted and secure
        </div>
      </div>

      {paymentError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
          <FontAwesomeIcon
            icon={faExclamationCircle}
            className="text-red-500 mt-1 mr-3"
          />
          <div>
            <h3 className="font-medium text-red-800">Payment Failed</h3>
            <p className="text-red-700">{paymentError}</p>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isProcessing || !stripe}
        className="w-full bg-[#e79fc4] hover:bg-[#e79fc4]/80 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70"
      >
        {isProcessing ? (
          <>
            <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
            Processing...
          </>
        ) : (
          <>Pay ${total.toFixed(2)}</>
        )}
      </button>
    </form>
  );
};

// Main Checkout Component
export default function Checkout({ selectedProduct }) {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [customerInfo, setCustomerInfo] = useState(null);
  const stripePromise = getStripe();

  // Handle going back to shopping
  const handleBackToShopping = () => {
    window.location.href = "/order";
  };

  // Handle successful payment
  const handlePaymentSuccess = (formData) => {
    setPaymentStatus("success");
    setCustomerInfo(formData);
  };

  // Handle payment error
  const handlePaymentError = (errorMessage) => {
    setPaymentStatus("error");
  };

  // If payment was successful, show confirmation
  if (paymentStatus === "success") {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-green-500 text-2xl"
                />
              </div>

              <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for your order. We've sent a confirmation email to{" "}
                {customerInfo?.email}.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-bold mb-2">Pickup Details</h3>
                <p className="text-gray-700">
                  Date: {customerInfo?.pickupDate}
                  <br />
                  Time: {customerInfo?.pickupTime}
                  <br />
                  Order #: ORD-{Math.floor(100000 + Math.random() * 900000)}
                </p>
              </div>

              <button
                onClick={handleBackToShopping}
                className="bg-[#e79fc4] hover:bg-[#e79fc4]/80 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Back to Shop
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <button
          onClick={handleBackToShopping}
          className="mb-8 flex items-center text-gray-600 hover:text-[#e79fc4] transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to Shopping
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-gray-600">Complete your order</p>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Checkout Form */}
          <div className="md:col-span-7">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold">Pickup Information</h2>
              </div>

              <Elements stripe={stripePromise}>
                <CheckoutForm
                  selectedProduct={selectedProduct}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              </Elements>
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-5">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold">Order Summary</h2>
              </div>

              <div className="p-6">
                <div className="max-h-[300px] overflow-y-auto mb-6">
                  {selectedProduct.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-start mb-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0 last:mb-0"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={product.img || "/placeholder.svg"}
                          alt={product.alt}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="ml-4 flex-grow">
                        <div className="flex justify-between">
                          <h4 className="font-bold text-gray-800">
                            {product.topName}
                          </h4>
                          <span className="font-medium">
                            $
                            {((product.price / 100) * product.quantity).toFixed(
                              2
                            )}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm">
                          Qty: {product.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-gray-100 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      $
                      {selectedProduct
                        .reduce(
                          (total, item) =>
                            total + (item.price / 100) * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (7.25%)</span>
                    <span className="font-medium">
                      $
                      {(
                        selectedProduct.reduce(
                          (total, item) =>
                            total + (item.price / 100) * item.quantity,
                          0
                        ) * 0.0725
                      ).toFixed(2)}
                    </span>
                  </div>

                  <div className="border-t border-gray-100 pt-3 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-xl">
                      $
                      {(
                        selectedProduct.reduce(
                          (total, item) =>
                            total + (item.price / 100) * item.quantity,
                          0
                        ) * 1.0725
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold mb-2">Pickup Information</h3>
                  <p className="text-gray-700 text-sm">
                    All orders must be picked up during business hours. Please
                    bring your order confirmation email or ID when you arrive.
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-center space-x-4">
                  <img src="images/visa.svg" alt="Visa" className="h-6" />
                  <img
                    src="images/mastercard.svg"
                    alt="Mastercard"
                    className="h-6"
                  />
                  <img
                    src="images/amex.svg"
                    alt="American Express"
                    className="h-6"
                  />
                  <img
                    src="images/discover.svg"
                    alt="Discover"
                    className="h-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

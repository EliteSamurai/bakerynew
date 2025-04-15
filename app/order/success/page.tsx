"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCheck,
  faCalendarAlt,
  faClock,
  faUser,
  faShoppingBag,
  faUtensils,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons"

export default function PreorderSuccess() {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pickupDate: "",
    pickupTime: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    try {
      // Get data from URL parameters
      const name = searchParams.get("name") || ""
      const email = searchParams.get("email") || ""
      const phone = searchParams.get("phone") || ""
      const pickupDate = searchParams.get("pickupDate") || ""
      const pickupTime = searchParams.get("pickupTime") || ""

      // Validate that we have the required data
      if (!name || !email || !pickupDate || !pickupTime) {
        setHasError(true)
      } else {
        setFormData({
          name,
          email,
          phone,
          pickupDate,
          pickupTime,
        })
      }
    } catch (error) {
      console.error("Error parsing success data:", error)
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }, [searchParams])

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
    } catch (error) {
      return dateString
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#e79fc4] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading confirmation...</p>
        </div>
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-md">
          <div className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500 text-3xl" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Something Went Wrong</h2>
            <p className="text-gray-600 mb-8">
              We couldn't load your order confirmation. Please contact customer support for assistance.
            </p>
            <Link
              href="/order"
              className="bg-[#e79fc4] text-white px-6 py-3 rounded-lg hover:bg-[#e79fc4]/80 transition-colors inline-flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faUtensils} className="mr-2" />
              Return to Menu
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={faCheck} className="text-green-500 text-3xl" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Thank You for Your Preorder!</h2>
          <p className="text-gray-600 mb-8 text-lg">
            We've received your preorder and sent a confirmation email to{" "}
            <span className="font-medium">{formData.email}</span>.
          </p>

          <div className="bg-gray-50 p-6 rounded-xl mb-8">
            <h3 className="font-bold text-xl mb-4">Pickup Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start">
                <div className="bg-[#e79fc4]/10 p-2 rounded-full mr-3">
                  <FontAwesomeIcon icon={faCalendarAlt} className="text-[#e79fc4]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{formatDate(formData.pickupDate)}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-[#e79fc4]/10 p-2 rounded-full mr-3">
                  <FontAwesomeIcon icon={faClock} className="text-[#e79fc4]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">
                    {formData.pickupTime
                      ? new Date(`2000-01-01T${formData.pickupTime}`).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })
                      : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-[#e79fc4]/10 p-2 rounded-full mr-3">
                  <FontAwesomeIcon icon={faUser} className="text-[#e79fc4]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{formData.name}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-[#e79fc4]/10 p-2 rounded-full mr-3">
                  <FontAwesomeIcon icon={faShoppingBag} className="text-[#e79fc4]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order Number</p>
                  <p className="font-medium">#{Math.floor(100000 + Math.random() * 900000)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/order"
              className="bg-[#e79fc4] text-white px-6 py-3 rounded-lg hover:bg-[#e79fc4]/80 transition-colors flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faUtensils} className="mr-2" />
              Return to Menu
            </Link>

            <button
              onClick={() => window.print()}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Print Confirmation
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

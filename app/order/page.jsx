"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCircleInfo,
  faMinus,
  faPlus,
  faXmark,
  faShoppingCart,
  faArrowLeft,
  faTrash,
  faHeart,
  faTag,
  faCheck,
  faExclamationCircle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import data from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { PreorderProvider, usePreorder } from "@/context/preordercontext";
import PreorderCheckout from "../../components/PreorderCheckout";

// Product Card Component
const ProductCard = ({
  product,
  index,
  isOpen,
  toggleModal,
  addToPreorder,
  handleBuyNow,
}) => {
  const [selectedTopping, setSelectedTopping] = useState(
    product.selectedTopping || "sugar"
  );

  const handleToppingChange = (topping) => {
    setSelectedTopping(topping); // Update selected topping state
  };

  // Determine the image source based on selected topping
  const imageSrc =
    product.img[selectedTopping] || product.img || "/placeholder.svg"; // If topping is selected, use that specific image, otherwise fallback to default image

  const handleAddToPreorder = () => {
    // Pass selected topping and image when adding to cart
    addToPreorder({ ...product, selectedTopping, toppingImage: imageSrc });
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-72 overflow-hidden">
        <Image
          src={imageSrc} // Dynamic image based on selected topping
          alt={product.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        {product.isNew && (
          <div className="absolute top-4 left-4 bg-[#e79fc4] text-white text-xs font-bold px-2 py-1 rounded-full">
            NEW
          </div>
        )}
        {product.isBestSeller && (
          <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
            <FontAwesomeIcon icon={faHeart} className="mr-1" />
            BEST SELLER
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold line-clamp-2 min-h-[3rem]">
            {product.topName}
          </h3>
          <button
            onClick={() => toggleModal(index)}
            className="w-8 h-8 flex items-center justify-center bg-[#e79fc4]/10 rounded-full hover:bg-[#e79fc4]/20 transition-colors"
            aria-label="View ingredients"
          >
            <FontAwesomeIcon icon={faCircleInfo} className="text-[#e79fc4]" />
          </button>
        </div>

        <p className="text-gray-600 text-sm mb-4 font-medium">
          {product.bottomName}
        </p>

        {isOpen ? (
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-medium text-sm mb-1">Ingredients:</h4>
            <p className="text-gray-600 text-sm">{product.ingredients}</p>
          </div>
        ) : null}

        {/* Topping Selection for Honeycomb Bread */}
        {product.id === 6 && (
          <div className="mt-4">
            <span className="text-sm font-medium">Choose Topping:</span>
            <div className="flex space-x-4 mt-2">
              <button
                onClick={() => handleToppingChange("sugar")}
                className={`w-24 h-10 text-sm font-medium rounded-lg transition-colors ${selectedTopping === "sugar" ? "bg-[#e79fc4] text-white" : "bg-gray-200 text-gray-800"}`}
              >
                Sugar
              </button>
              <button
                onClick={() => handleToppingChange("condensedMilk")}
                className={`w-24 h-10 text-sm font-medium rounded-lg transition-colors ${selectedTopping === "condensedMilk" ? "bg-[#e79fc4] text-white" : "bg-gray-200 text-gray-800"}`}
              >
                Condensed Milk
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex flex-col space-y-3">
            <span className="text-2xl font-bold text-gray-800">
              ${(product.price / 100).toFixed(2)}
            </span>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleAddToPreorder} // Add to cart with selected topping
                className="bg-[#e79fc4] hover:bg-[#e79fc4]/80 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center shadow-sm"
              >
                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                <span>Add</span>
              </button>

              <button
                onClick={() => handleBuyNow(product, selectedTopping)} // Pass selected topping when buying now
                className="bg-black hover:bg-gray-800 text-white px-4 py-3 rounded-lg transition-colors shadow-sm"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Cart Item Component
const CartItem = ({
  product,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
}) => {
  return (
    <div className="flex items-start border-b border-gray-200 py-5">
      <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src={product.toppingImage || product.img || "/placeholder.svg"}
          alt={product.alt}
          fill
          className="object-cover"
        />
      </div>

      <div className="ml-5 flex-grow pt-1">
        <h4 className="font-bold text-gray-800 text-base mb-1">
          {product.topName}
        </h4>
        <p className="text-gray-500 text-sm mb-1 line-clamp-1">
          {product.ingredients}
          {product.selectedTopping && ` - ${product.selectedTopping}`}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-[#e79fc4] text-lg">
            ${((product.price / 100) * product.quantity).toFixed(2)}
          </span>

          <div className="flex items-center space-x-1">
            <button
              onClick={() =>
                decreaseQuantity(product.id, product.selectedTopping)
              }
              className="w-9 h-9 flex items-center justify-center bg-gray-100 rounded-l-lg hover:bg-gray-200 transition-colors"
              aria-label="Decrease quantity"
            >
              <FontAwesomeIcon icon={faMinus} className="text-gray-700" />
            </button>

            <span className="w-12 h-9 flex items-center justify-center bg-gray-50 text-gray-800 font-medium">
              {product.quantity}
            </span>

            <button
              onClick={() =>
                increaseQuantity(product.id, product.selectedTopping)
              }
              className="w-9 h-9 flex items-center justify-center bg-gray-100 rounded-r-lg hover:bg-gray-200 transition-colors"
              aria-label="Increase quantity"
            >
              <FontAwesomeIcon icon={faPlus} className="text-gray-700" />
            </button>

            <button
              onClick={() => deleteItem(product.id, product.selectedTopping)}
              className="ml-4 w-9 h-9 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-full transition-colors"
              aria-label="Remove item"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Cart Summary Component
const CartSummary = ({ products, subtotal, goBack, proceedToCheckout }) => {
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;

    setIsApplyingPromo(true);

    // Simulate API call
    setTimeout(() => {
      if (promoCode.toLowerCase() === "welcome10") {
        setPromoApplied(true);
        setPromoError(false);
      } else {
        setPromoError(true);
        setPromoApplied(false);
      }
      setIsApplyingPromo(false);
    }, 800);
  };

  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4">Order Summary</h3>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">
            Subtotal ({products.length} items)
          </span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>

        {promoApplied && (
          <div className="flex justify-between text-green-600">
            <span className="flex items-center">
              <FontAwesomeIcon icon={faTag} className="mr-2" />
              Discount (10%)
            </span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="border-t border-gray-200 pt-3 flex justify-between font-bold">
          <span>Total</span>
          <span className="text-xl">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Promo Code
        </label>
        <div className="flex">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => {
              setPromoCode(e.target.value);
              setPromoError(false);
            }}
            placeholder="Enter promo code"
            className={`flex-grow px-3 py-2 border ${
              promoError ? "border-red-300" : "border-gray-300"
            } rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#e79fc4]`}
          />
          <button
            onClick={handleApplyPromo}
            disabled={isApplyingPromo || promoApplied}
            className={`px-4 py-2 rounded-r-lg ${
              promoApplied
                ? "bg-green-500 text-white"
                : "bg-gray-800 text-white hover:bg-gray-700"
            } transition-colors flex items-center`}
          >
            {isApplyingPromo ? (
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            ) : promoApplied ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : (
              "Apply"
            )}
          </button>
        </div>

        {promoError && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
            Invalid promo code
          </p>
        )}

        {promoApplied && (
          <p className="mt-1 text-sm text-green-600 flex items-center">
            <FontAwesomeIcon icon={faCheck} className="mr-1" />
            Promo code applied successfully!
          </p>
        )}

        {/* <p className="mt-2 text-xs text-gray-500">
          Try "WELCOME10" for 10% off your first order
        </p> */}
      </div>

      <div className="space-y-3">
        <button
          onClick={proceedToCheckout}
          className="w-full bg-[#e79fc4] hover:bg-[#e79fc4]/80 text-white font-bold py-3 rounded-lg transition-colors"
        >
          Proceed to Checkout
        </button>

        <button
          onClick={goBack}
          className="w-full bg-transparent hover:bg-gray-100 text-gray-700 font-medium py-3 rounded-lg transition-colors flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

// Filter Component
const ProductFilter = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="mb-10 overflow-x-auto pb-3">
      <div className="flex space-x-3 min-w-max">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-5 py-2.5 rounded-full transition-colors font-medium ${
            activeCategory === "all"
              ? "bg-[#e79fc4] text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All Products
        </button>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 rounded-full transition-colors font-medium ${
              activeCategory === category
                ? "bg-[#e79fc4] text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

// Main Order Component
export default function Order() {
  // Extract unique categories from data
  const categories = [...new Set(data.map((item) => item.category || "Other"))];
  const { addToPreorder, preorderList } = usePreorder();

  // State variables
  const [showCart, setShowCart] = useState(false);
  const [openStates, setOpenStates] = useState(Array(data.length).fill(false));
  const [proceedToCheckout, setProceedToCheckout] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products based on category and search query
  const filteredProducts = data.filter((product) => {
    const matchesCategory =
      activeCategory === "all" || product.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      product.topName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.bottomName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Calculate cart subtotal
  const subtotal = preorderList.reduce(
    (total, item) => total + (item.price / 100) * item.quantity,
    0
  );

  // Delete a selected item from the cart
  const deleteSelectedItem = (id, topping) => {
    setPreorderList((prevProducts) =>
      prevProducts.filter(
        (item) => !(item.id === id && item.selectedTopping === topping)
      )
    );
  };

  // Hide the cart if no products are selected
  useEffect(() => {
    if (preorderList.length === 0) {
      setShowCart(false);
    }
  }, [preorderList]);

  // Go back from the cart to the product selection
  const goBack = () => {
    setShowCart(false);
  };

  // Increase the quantity of a product in the cart
  const increaseQuantity = (id, topping) => {
    setPreorderList((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id && product.selectedTopping === topping
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  // Decrease the quantity of a product in the cart
  const decreaseQuantity = (id, topping) => {
    setPreorderList(
      (prevProducts) =>
        prevProducts
          .map((product) =>
            product.id === id && product.selectedTopping === topping
              ? { ...product, quantity: product.quantity - 1 }
              : product
          )
          .filter((product) => product.quantity > 0) // Remove item if quantity reaches 0
    );
  };

  // Hide or show the Order-page scroll bar
  useEffect(() => {
    if (showCart && !proceedToCheckout) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [showCart, proceedToCheckout]);

  // Toggle the product ingredients modal
  const toggleModal = (index) => {
    const newOpenStates = [...openStates];
    newOpenStates[index] = !newOpenStates[index];
    setOpenStates(newOpenStates);
  };

  // Handle the Buy Now button click
  const handleBuyNowClick = (product) => {
    addToPreorder({ ...product, quantity: 1 });
    setProceedToCheckout(true);
  };

  if (proceedToCheckout) {
    return <PreorderCheckout />;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Hero Section */}
      <div className="bg-[#e79fc4]/10 py-16 mb-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Order Our Treats
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            Browse our selection of freshly baked goods and place your preorder
            for pickup. All items are made fresh to order with the finest
            ingredients.
          </p>

          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for treats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-14 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e79fc4] text-lg shadow-sm"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl">
        {/* Category Filter */}
        <ProductFilter
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Cart Button (Mobile) */}
        <div className="md:hidden fixed bottom-4 right-4 z-10">
          <button
            onClick={() => setShowCart(true)}
            className="bg-[#e79fc4] text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center relative"
          >
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            {preorderList.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {preorderList.length}
              </span>
            )}
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-10">
          {/* Product Grid */}
          <div className="md:w-3/4">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  className="text-gray-400 text-4xl mb-4"
                />
                <h3 className="text-xl font-bold mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any products matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setSearchQuery("");
                  }}
                  className="bg-[#e79fc4] hover:bg-[#e79fc4]/80 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  View All Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    isOpen={openStates[index]}
                    toggleModal={toggleModal}
                    addToPreorder={addToPreorder}
                    handleBuyNow={handleBuyNowClick}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Cart (Desktop) */}
          <div className="md:w-1/4 hidden md:block">
            <div className="sticky top-24">
              {preorderList.length > 0 ? (
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold flex items-center">
                      <FontAwesomeIcon
                        icon={faShoppingCart}
                        className="mr-2 text-[#e79fc4]"
                      />
                      Your Cart ({preorderList.length})
                    </h2>
                  </div>

                  <div className="max-h-[450px] overflow-y-auto p-6">
                    {preorderList.map((product) => (
                      <CartItem
                        key={`${product.id}-${product.selectedTopping}`}
                        product={product}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                        deleteItem={deleteSelectedItem}
                      />
                    ))}
                  </div>

                  <div className="p-6 bg-gray-50">
                    <div className="flex justify-between mb-4">
                      <span className="font-medium">Subtotal</span>
                      <span className="font-bold">${subtotal.toFixed(2)}</span>
                    </div>

                    <button
                      onClick={() => setProceedToCheckout(true)}
                      className="w-full bg-[#e79fc4] hover:bg-[#e79fc4]/80 text-white font-bold py-3 rounded-lg transition-colors"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-md p-10 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      className="text-gray-400 text-xl"
                    />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Your cart is empty</h3>
                  <p className="text-gray-600 mb-4">
                    Add some delicious treats to get started!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Cart Modal */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCart(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  Your Cart ({preorderList.length})
                </h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              {preorderList.length === 0 ? (
                <div className="flex-grow overflow-y-auto p-6">
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FontAwesomeIcon
                        icon={faShoppingCart}
                        className="text-gray-400 text-xl"
                      />
                    </div>
                    <h3 className="text-lg font-bold mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-gray-600">
                      Add some delicious treats to get started!
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-grow overflow-y-auto p-6">
                    {preorderList.map((product) => (
                      <CartItem
                        key={product.id}
                        product={product}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                        deleteItem={deleteSelectedItem}
                      />
                    ))}
                  </div>

                  <div className="p-6 bg-gray-50">
                    <CartSummary
                      products={preorderList}
                      subtotal={subtotal}
                      goBack={goBack}
                      proceedToCheckout={() => setProceedToCheckout(true)}
                    />
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

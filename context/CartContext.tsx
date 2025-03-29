"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the structure of a product in the cart
interface CartProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  selectedTopping?: string; // Ensure toppings are stored
}

// Define the context type
interface CartContextType {
  selectedProduct: CartProduct[];
  setSelectedProduct: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  addToCart: (product: CartProduct) => void; // Include addToCart function
}

// Create context with a default value of `null`
const CartContext = createContext<CartContextType | null>(null);

// Provider Component
export function CartProvider({ children }: { children: ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<CartProduct[]>([]);

  // Function to add an item to the cart
  const addToCart = (product: CartProduct) => {
    setSelectedProduct((prevCart) => {
      const existingItem = prevCart.find(
        (item) =>
          item.id === product.id &&
          item.selectedTopping === product.selectedTopping
      );

      if (existingItem) {
        // If the same product+topping exists, increase its quantity
        return prevCart.map((item) =>
          item.id === product.id &&
          item.selectedTopping === product.selectedTopping
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Otherwise, add it as a new item
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <CartContext.Provider
      value={{ selectedProduct, setSelectedProduct, addToCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom Hook for easier access
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

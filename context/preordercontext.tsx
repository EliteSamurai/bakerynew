"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface PreorderProduct {
  id: number | string;
  topName: string;
  bottomName: string;
  price: number;
  quantity: number;
  img: string | { [key: string]: string };
  alt?: string;
  selectedTopping?: string;
  category?: string;
}

interface PreorderContextType {
  preorderList: PreorderProduct[];
  setPreorderList: React.Dispatch<React.SetStateAction<PreorderProduct[]>>;
  addToPreorder: (product: PreorderProduct) => void;
  removeFromPreorder: (
    productId: number | string,
    selectedTopping?: string
  ) => void;
  updateQuantity: (
    productId: number | string,
    quantity: number,
    selectedTopping?: string
  ) => void;
  clearPreorder: () => void;
}

const PreorderContext = createContext<PreorderContextType | null>(null);

export function PreorderProvider({ children }: { children: ReactNode }) {
  const [preorderList, setPreorderList] = useState<PreorderProduct[]>([]);

  const addToPreorder = (product: PreorderProduct) => {
    setPreorderList((prevList) => {
      const existingItem = prevList.find(
        (item) =>
          item.id === product.id &&
          item.selectedTopping === product.selectedTopping
      );

      if (existingItem) {
        return prevList.map((item) =>
          item.id === product.id &&
          item.selectedTopping === product.selectedTopping
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevList, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromPreorder = (
    productId: number | string,
    selectedTopping?: string
  ) => {
    setPreorderList((prevList) =>
      prevList.filter(
        (item) =>
          !(item.id === productId && item.selectedTopping === selectedTopping)
      )
    );
  };

  const updateQuantity = (
    productId: number | string,
    quantity: number,
    selectedTopping?: string
  ) => {
    if (quantity <= 0) {
      removeFromPreorder(productId, selectedTopping);
      return;
    }

    setPreorderList((prevList) =>
      prevList.map((item) =>
        item.id === productId && item.selectedTopping === selectedTopping
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearPreorder = () => {
    setPreorderList([]);
  };

  return (
    <PreorderContext.Provider
      value={{
        preorderList,
        setPreorderList,
        addToPreorder,
        removeFromPreorder,
        updateQuantity,
        clearPreorder,
      }}
    >
      {children}
    </PreorderContext.Provider>
  );
}

export function usePreorder() {
  const context = useContext(PreorderContext);
  if (!context) {
    throw new Error("usePreorder must be used within a PreorderProvider");
  }
  return context;
}

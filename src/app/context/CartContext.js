"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Automatically create cart on mount
  useEffect(() => {
    if (!cart && !loading) {
      (async () => {
        setLoading(true);
        try {
          const response = await fetch("/api/cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ action: "create" }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          setCart(data);
        } catch (err) {
          console.error("Failed to create cart:", err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [cart, loading]);

  const addToCart = async (variantId, quantity = 1) => {
    try {
      let cartId = cart?.id;

      if (!cartId) {
        const createResponse = await fetch("/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "create" }),
        });

        if (!createResponse.ok) {
          throw new Error(`HTTP error! status: ${createResponse.status}`);
        }

        const createData = await createResponse.json();
        cartId = createData.id;
        setCart(createData);
      }

      const addResponse = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "add",
          cartId,
          variantId,
          quantity,
        }),
      });

      if (!addResponse.ok) {
        throw new Error(`HTTP error! status: ${addResponse.status}`);
      }

      const data = await addResponse.json();
      setCart(data);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, loading, isCartOpen, setIsCartOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

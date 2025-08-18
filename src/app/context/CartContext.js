"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize cart on mount
  useEffect(() => {
    const initializeCart = async () => {
      try {
        const savedCartId = localStorage.getItem("cartId");
        const savedCart = localStorage.getItem("cart");

        if (savedCartId && savedCart) {
          try {
            JSON.parse(savedCart); // Validate JSON format
            console.log("Found saved cart:", savedCartId);

            // Try to restore the saved cart from Shopify
            const response = await fetch("/api/cart", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ action: "get", cartId: savedCartId }),
            });

            if (response.ok) {
              const cartData = await response.json();
              console.log("Restored cart data:", cartData);

              // Set cart regardless of items (empty carts are valid)
              if (cartData && cartData.id) {
                setCart(cartData);
              } else {
                console.log("Cart data invalid, creating new cart");
                await createNewCart();
              }
            } else {
              console.log("Cart not found on Shopify, creating new cart");
              await createNewCart();
            }
          } catch (error) {
            console.error("Failed to parse saved cart:", error);
            localStorage.removeItem("cartId");
            localStorage.removeItem("cart");
            await createNewCart();
          }
        } else {
          // No saved cart, create a new one
          await createNewCart();
        }
      } catch (error) {
        console.error("Failed to initialize cart:", error);
        await createNewCart();
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    };

    const createNewCart = async () => {
      try {
        const response = await fetch("/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "create" }),
        });

        if (response.ok) {
          const data = await response.json();
          setCart(data);
        } else {
          console.error("Failed to create new cart");
        }
      } catch (error) {
        console.error("Failed to create new cart:", error);
      }
    };

    initializeCart();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized && cart) {
      localStorage.setItem("cartId", cart.id);
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log("Saved cart to localStorage:", cart.id);
    }
  }, [cart, isInitialized]);

  // Fallback: If no cart after initialization, try to restore from localStorage
  useEffect(() => {
    if (isInitialized && !cart && !loading) {
      const savedCartId = localStorage.getItem("cartId");
      const savedCart = localStorage.getItem("cart");

      if (savedCartId && savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          console.log("Fallback: Restoring cart from localStorage");
          setCart(parsedCart);
        } catch (error) {
          console.error("Fallback: Failed to parse saved cart:", error);
        }
      }
    }
  }, [isInitialized, cart, loading]);

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

  const removeFromCart = async (lineId) => {
    try {
      if (!cart?.id) return;

      // Optimistic update
      const previousCart = cart;
      setCart((prev) => {
        if (!prev) return prev;
        const updatedEdges = (prev.lines?.edges || []).filter((e) => e.node.id !== lineId);
        return { ...prev, lines: { ...(prev.lines || {}), edges: updatedEdges } };
      });

      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "remove",
          cartId: cart.id,
          lineId,
        }),
      });

      if (!response.ok) {
        setCart(previousCart);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCart(data);
    } catch (err) {
      console.error("Failed to remove from cart:", err);
    }
  };

  const updateCartItemQuantity = async (lineId, quantity) => {
    try {
      if (!cart?.id) return;

      // Optimistic update
      const previousCart = cart;
      setCart((prev) => {
        if (!prev) return prev;
        const updatedEdges = (prev.lines?.edges || []).map((e) =>
          e.node.id === lineId ? { ...e, node: { ...e.node, quantity } } : e
        );
        return { ...prev, lines: { ...(prev.lines || {}), edges: updatedEdges } };
      });

      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "update",
          cartId: cart.id,
          lineId,
          quantity,
        }),
      });

      if (!response.ok) {
        setCart(previousCart);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCart(data);
    } catch (err) {
      console.error("Failed to update cart item:", err);
    }
  };

  const clearCart = () => {
    setCart(null);
    localStorage.removeItem("cartId");
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        loading,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

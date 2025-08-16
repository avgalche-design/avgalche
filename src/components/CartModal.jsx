"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../app/context/CartContext";
import { FaTimes, FaTrash } from "react-icons/fa";

export default function CartModal() {
  const { cart, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen || !cart) return null;

  const lines = cart.lines?.edges || [];

  // Calculate subtotal - handle different price structures
  const subtotal = lines.reduce((sum, line) => {
    const item = line.node;
    const price =
      item.merchandise.price?.amount ||
      item.merchandise.product?.priceRange?.minVariantPrice?.amount ||
      0;
    return sum + parseFloat(price) * item.quantity;
  }, 0);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-[9999] p-4"
        onClick={() => setIsCartOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white text-black rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold">Shopping Cart</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex flex-col h-full">
            {lines.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-6">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FaTimes className="text-3xl text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-600 text-center">
                  Looks like you haven't added any items to your cart yet.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {lines.map(({ node }) => (
                    <div
                      key={node.id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                    >
                      <img
                        src={node.merchandise.product.images.edges[0]?.node.url}
                        alt={node.merchandise.product.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">
                          {node.merchandise.product.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {node.merchandise.title}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                              Qty: {node.quantity}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              $
                              {(
                                parseFloat(
                                  node.merchandise.price?.amount || 0
                                ) * node.quantity
                              ).toFixed(2)}
                            </p>
                            {node.merchandise.price?.amount && (
                              <p className="text-sm text-gray-500">
                                $
                                {parseFloat(
                                  node.merchandise.price.amount
                                ).toFixed(2)}{" "}
                                each
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-red-100 rounded-full transition-colors text-red-500">
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Footer with Subtotal and Checkout */}
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Subtotal</span>
                    <span className="text-2xl font-bold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <a
                      href={cart.checkoutUrl}
                      className="block w-full bg-black text-white text-center py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-colors"
                    >
                      Proceed to Checkout
                    </a>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="block w-full bg-white text-black text-center py-3 rounded-xl font-semibold border-2 border-black hover:bg-gray-100 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

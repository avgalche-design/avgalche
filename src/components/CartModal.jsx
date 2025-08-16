"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../app/context/CartContext";
import { FaTimes, FaTrash, FaMinus, FaPlus } from "react-icons/fa";

export default function CartModal() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartItemQuantity,
    loading,
  } = useCart();

  if (!isCartOpen) return null;

  // Show loading state while cart is being initialized
  if (loading) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-[9999] p-2 sm:p-4"
          onClick={() => setIsCartOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white text-black rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md lg:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-xl sm:text-2xl font-bold">Shopping Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaTimes className="text-lg sm:text-xl" />
              </button>
            </div>
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
                <p className="text-gray-600">Loading cart...</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (!cart) return null;

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

  const handleQuantityChange = (lineId, currentQuantity, change) => {
    const newQuantity = Math.max(1, currentQuantity + change);
    updateCartItemQuantity(lineId, newQuantity);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-[9999] p-2 sm:p-4"
        onClick={() => setIsCartOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white text-black rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md lg:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold">Shopping Cart</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaTimes className="text-lg sm:text-xl" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex flex-col h-full">
            {lines.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4 sm:px-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FaTimes className="text-2xl sm:text-3xl text-gray-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center">
                  Your cart is empty
                </h3>
                <p className="text-gray-600 text-center text-sm sm:text-base">
                  Looks like you haven't added any items to your cart yet.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 bg-black text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-sm sm:text-base"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items - Scrollable area */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4 max-h-[50vh] sm:max-h-[60vh]">
                  {lines.map(({ node }) => (
                    <div
                      key={node.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl"
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={
                            node.merchandise.product.images.edges[0]?.node.url
                          }
                          alt={node.merchandise.product.title}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm sm:text-lg text-black truncate">
                          {node.merchandise.product.title}
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm truncate">
                          {node.merchandise.title}
                        </p>

                        {/* Price */}
                        <div className="mt-1 sm:mt-2">
                          <p className="font-semibold text-sm sm:text-base text-black">
                            $
                            {(
                              parseFloat(node.merchandise.price?.amount || 0) *
                              node.quantity
                            ).toFixed(2)}
                          </p>
                          {node.merchandise.price?.amount && (
                            <p className="text-xs sm:text-sm text-gray-500">
                              $
                              {parseFloat(
                                node.merchandise.price.amount
                              ).toFixed(2)}{" "}
                              each
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls and Remove */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() =>
                              handleQuantityChange(node.id, node.quantity, -1)
                            }
                            className="p-2 hover:bg-gray-100 transition-colors"
                            disabled={node.quantity <= 1}
                          >
                            <FaMinus className="text-xs text-gray-600" />
                          </button>
                          <span className="px-3 py-2 text-sm font-medium text-black min-w-[2rem] text-center">
                            {node.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(node.id, node.quantity, 1)
                            }
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <FaPlus className="text-xs text-gray-600" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(node.id)}
                          className="p-2 hover:text-black rounded-full transition-colors text-gray-600"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer with Subtotal and Checkout */}
                <div className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-base sm:text-lg font-semibold text-black">
                      Subtotal
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-black">
                      ₹{subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <a
                      href={cart.checkoutUrl}
                      className="block w-full bg-black text-white text-center py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-gray-800 transition-colors"
                    >
                      Proceed to Checkout
                    </a>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="block w-full bg-white text-black text-center py-3 rounded-xl font-semibold border-2 border-black hover:bg-gray-100 transition-colors text-sm sm:text-base"
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

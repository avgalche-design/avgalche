"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useWishlist } from "../app/context/WishlistContext";
import { useCart } from "../app/context/CartContext";
import {
  FaTimes,
  FaTrash,
  FaHeart,
  FaShoppingBag,
  FaCheck,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function WishlistModal() {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, removeFromWishlist } =
    useWishlist();

  const { addToCart } = useCart();
  const [loadingItems, setLoadingItems] = useState(new Set());
  const [addedItems, setAddedItems] = useState(new Set());
  const [selectedVariants, setSelectedVariants] = useState({});
  const [showSizeSelector, setShowSizeSelector] = useState(null);

  if (!isWishlistOpen) return null;

  const handleAddToCart = async (product) => {
    const selectedVariant = selectedVariants[product.id];

    if (!selectedVariant) {
      // Show size selector for this product
      setShowSizeSelector(product.id);
      return;
    }

    setLoadingItems((prev) => new Set(prev).add(product.id));

    try {
      await addToCart(selectedVariant.id, 1);

      // Show success animation
      setAddedItems((prev) => new Set(prev).add(product.id));
      setTimeout(() => {
        setAddedItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(product.id);
          return newSet;
        });
      }, 2000);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setLoadingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }
  };

  const handleSizeSelect = (productId, variant) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: variant,
    }));
    setShowSizeSelector(null);
  };

  const handleCloseSizeSelector = () => {
    setShowSizeSelector(null);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-[9999] p-2 sm:p-4"
        onClick={() => setIsWishlistOpen(false)}
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
            <h2 className="text-xl sm:text-2xl mx-auto font-bold">Wishlist</h2>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaTimes className="text-lg sm:text-xl" />
            </button>
          </div>

          {/* Wishlist Content */}
          <div className="flex flex-col h-full">
            {wishlist.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4 sm:px-6">
                <div className="w-24 h-24 sm:w-44 sm:h-44  rounded-full flex items-center justify-center mb-4">
                  <Image
                    src="/images/sadwishlist.png" // Path inside the public folder
                    alt="Profile picture"
                    width={300} // Required: sets intrinsic width
                    height={300} // Required: sets intrinsic height
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center">
                  Your wishlist is empty
                </h3>
                <p className="text-gray-600 text-center text-sm sm:text-base">
                  Start adding items to your wishlist to save them for later.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="mt-6 bg-black text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-sm sm:text-base"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Wishlist Items - Scrollable area */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4 max-h-[50vh] sm:max-h-[60vh]">
                  {wishlist.map((product) => (
                    <div
                      key={product.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl"
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={
                            product.images?.[0]?.node?.url ||
                            product.images?.[0]?.url ||
                            "/images/placeholder.jpg"
                          }
                          alt={product.title}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${product.handle}`}
                          className="block"
                          onClick={() => setIsWishlistOpen(false)}
                        >
                          <h3 className="font-semibold text-sm sm:text-lg text-black truncate hover:text-gray-600 transition-colors">
                            {product.title}
                          </h3>
                        </Link>

                        {/* Price */}
                        <div className="mt-1 sm:mt-2">
                          {product.variants?.[0]?.price && (
                            <p className="font-semibold text-sm sm:text-base text-black">
                              ₹
                              {parseFloat(
                                product.variants[0].price.amount
                              ).toFixed(2)}
                            </p>
                          )}
                        </div>

                        {/* Selected Size Display */}
                        {selectedVariants[product.id] && (
                          <div className="mt-2">
                            <p className="text-xs text-gray-600">
                              Size:{" "}
                              <span className="font-medium text-black">
                                {selectedVariants[product.id].title}
                              </span>
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 sm:gap-3">
                        {/* Add to Cart Button */}
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={loadingItems.has(product.id)}
                          className={`p-2 rounded-full transition-all duration-300 ${
                            loadingItems.has(product.id)
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : addedItems.has(product.id)
                              ? "bg-green-100 text-green-600"
                              : selectedVariants[product.id]
                              ? "hover:bg-green-100 text-green-600"
                              : "hover:bg-blue-100 text-blue-600"
                          }`}
                          title={
                            addedItems.has(product.id)
                              ? "Added to Cart!"
                              : selectedVariants[product.id]
                              ? "Add to Cart"
                              : "Select Size"
                          }
                        >
                          {loadingItems.has(product.id) ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                          ) : addedItems.has(product.id) ? (
                            <FaCheck className="text-sm" />
                          ) : (
                            <FaShoppingBag className="text-sm" />
                          )}
                        </button>

                        {/* Remove from Wishlist Button */}
                        <button
                          onClick={() => removeFromWishlist(product.id)}
                          className="p-2 hover:bg-red-100 rounded-full transition-colors text-red-500"
                          title="Remove from Wishlist"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-base sm:text-lg font-semibold text-black">
                      {wishlist.length} Item{wishlist.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <button
                      onClick={() => setIsWishlistOpen(false)}
                      className="block w-full bg-black text-white text-center py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-gray-800 transition-colors"
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

      {/* Size Selector Modal */}
      {showSizeSelector && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-[10000] p-4"
            onClick={handleCloseSizeSelector}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white text-black rounded-2xl shadow-2xl w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Select Size</h3>
                <button
                  onClick={handleCloseSizeSelector}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>

              {(() => {
                const product = wishlist.find((p) => p.id === showSizeSelector);
                if (!product || !product.variants) return null;

                return (
                  <div className="space-y-4">
                    <div className="text-center mb-4">
                      <h4 className="font-semibold text-lg">{product.title}</h4>
                      <p className="text-gray-600 text-sm">Choose your size</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {product.variants.map((variant) => (
                        <button
                          key={variant.id}
                          onClick={() => handleSizeSelect(product.id, variant)}
                          className="p-4 border border-gray-300 rounded-lg hover:border-black hover:bg-gray-50 transition-all duration-200 text-center"
                        >
                          <div className="font-medium text-black">
                            {variant.title}
                          </div>
                          {variant.price && (
                            <div className="text-sm text-gray-600 mt-1">
                              ₹{parseFloat(variant.price.amount).toFixed(2)}
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </AnimatePresence>
  );
}

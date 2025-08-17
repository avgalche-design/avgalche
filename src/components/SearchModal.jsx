"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaSearch } from "react-icons/fa";
import Link from "next/link";
import { useSearch } from "../app/context/SearchContext";

export default function SearchModal() {
  const { isOpen, closeSearch } = useSearch();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const onClose = closeSearch;

  // Fetch all products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/shopify-products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("API Response:", data); // Debug log

          // Check if there's an error in the response
          if (data.error) {
            console.error("API Error:", data.error);
            setError(data.error);
            setAllProducts([]);
            return;
          }

          // Check if data.products exists and is an array
          if (data && data.products && Array.isArray(data.products)) {
            setAllProducts(data.products);
            console.log("Products loaded:", data.products.length); // Debug log
          } else {
            console.error("Invalid products data structure:", data);
            setError("Failed to load products - invalid data structure");
            setAllProducts([]);
          }
        } else {
          console.error("API request failed:", response.status);
          setError("Failed to fetch products");
          setAllProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Failed to fetch products");
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Search functionality
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    if (!Array.isArray(allProducts) || allProducts.length === 0) {
      console.error("allProducts is not an array or is empty:", allProducts);
      setResults([]);
      return;
    }

    setLoading(true);

    // Debounce search
    const timeoutId = setTimeout(() => {
      const searchTerm = query.toLowerCase();
      const filtered = allProducts.filter((product) => {
        // Safety check for product object
        if (!product || typeof product !== "object") {
          console.warn("Invalid product object:", product);
          return false;
        }

        const titleMatch =
          product.title?.toLowerCase().includes(searchTerm) || false;
        const typeMatch =
          product.productType?.toLowerCase().includes(searchTerm) || false;
        const tagMatch =
          (Array.isArray(product.tags) &&
            product.tags.some(
              (tag) =>
                tag &&
                typeof tag === "string" &&
                tag.toLowerCase().includes(searchTerm)
            )) ||
          false;

        return titleMatch || typeMatch || tagMatch;
      });

      setResults(filtered);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, allProducts]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-start z-[9999] p-2 sm:p-4 pt-20"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white text-black rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center p-4 sm:p-6 border-b border-gray-200">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <button
              onClick={onClose}
              className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>

          {/* Search Results */}
          <div className="flex-1 overflow-y-auto max-h-[60vh]">
            {error ? (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <FaSearch className="text-4xl text-red-300 mb-4" />
                <h3 className="text-lg font-semibold text-red-600 mb-2">
                  Error loading products
                </h3>
                <p className="text-gray-500 text-center">
                  {error}. Please try refreshing the page.
                </p>
              </div>
            ) : loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
              </div>
            ) : query.trim() ? (
              results.length > 0 ? (
                <div className="p-4 sm:p-6 space-y-3">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.handle}`}
                      onClick={onClose}
                      className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={
                            product.images?.[0]?.url ||
                            "/images/placeholder.jpg"
                          }
                          alt={product.title}
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base text-black truncate">
                          {product.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">
                          {product.productType}
                        </p>
                        {product.variants?.[0]?.price && (
                          <p className="text-sm font-semibold text-black">
                            $
                            {parseFloat(
                              product.variants[0].price.amount
                            ).toFixed(2)}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 px-4">
                  <FaSearch className="text-4xl text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-500 text-center">
                    Try searching with different keywords or browse our
                    categories.
                  </p>
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <FaSearch className="text-4xl text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Start searching
                </h3>
                <p className="text-gray-500 text-center">
                  Search for products by name, type, or category.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

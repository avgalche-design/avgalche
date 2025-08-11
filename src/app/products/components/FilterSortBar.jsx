// components/FilterSortBar.jsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FilterSortBar({
  productCount,
  sort,
  setSort,
  categories,
  selectedCategories,
  setSelectedCategories,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <>
      {/* Sticky top bar */}
      <div className="sticky top-0 z-20 bg-black border-b border-gray-700 py-4 flex justify-between items-center">
        <p className="text-sm text-gray-400 uppercase tracking-widest">
          {productCount} Products
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="text-sm text-gray-400 hover:text-white transition"
        >
          Filter & Sort
        </button>
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="absolute right-0 top-0 h-full w-full sm:w-96 bg-black text-white p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium">Filter & Sort</h2>
                <button onClick={() => setIsOpen(false)}>✕</button>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <h3 className="text-sm text-gray-400 uppercase">Sort by</h3>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="bg-black border border-gray-700 text-white w-full p-2 mt-1"
                >
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-sm text-gray-400 uppercase">Categories</h3>
                <ul className="space-y-1 mt-1">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat)}
                          onChange={() => toggleCategory(cat)}
                        />
                        {cat}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

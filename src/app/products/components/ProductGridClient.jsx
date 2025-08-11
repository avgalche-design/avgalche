"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductGridClient({ products }) {
  const [sortOrder, setSortOrder] = useState("asc");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const sortedProducts = [...products]
    .filter((p) => categoryFilter === "all" || p.category === categoryFilter)
    .sort((a, b) => {
      const priceA = parseFloat(a.variants?.[0]?.price?.amount ?? 0);
      const priceB = parseFloat(b.variants?.[0]?.price?.amount ?? 0);
      return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
    });

  // Unique category list
  const categories = ["all", ...new Set(products.map((p) => p.category))];

  return (
    <div className="max-w-9xl mx-auto">
      {/* Filter + Sort controls */}
      <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
        {/* Filter */}
        <select
          className="bg-black border border-gray-700 px-3 py-2 text-sm rounded"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All Categories" : cat}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          className="bg-black border border-gray-700 px-3 py-2 text-sm rounded"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
        {sortedProducts.map((product, index) => (
          <motion.div
            key={product.id || index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: index * 0.03 }}
          >
            <ProductCard
              product={{
                handle: product.handle,
                title: product.title,
                description: product.description,
                price: `${product.variants?.[0]?.price?.amount ?? "0.00"} ${
                  product.variants?.[0]?.price?.currencyCode ?? ""
                }`,
                images: product.images?.map((img) => img.url) || [],
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

ProductGridClient.propTypes = {
  products: PropTypes.array.isRequired,
};

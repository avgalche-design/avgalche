"use client";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import LuxuryProductCard from "./ProductCard";

// Main Grid Component
export default function ProductGridClient({ products }) {
  const [sortOrder, setSortOrder] = useState("newest");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const sortedProducts = [...products]
    .filter((p) => categoryFilter === "all" || p.category === categoryFilter)
    .sort((a, b) => {
      if (sortOrder === "newest") {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA; // newest first
      }
      const priceA = parseFloat(a.variants?.[0]?.price?.amount ?? 0);
      const priceB = parseFloat(b.variants?.[0]?.price?.amount ?? 0);
      if (sortOrder === "price-asc") return priceA - priceB;
      if (sortOrder === "price-desc") return priceB - priceA;
      if (sortOrder === "name") return a.title.localeCompare(b.title);
      return 0;
    });

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  return (
    <div
      className={`transition-all duration-1000 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Premium Filter Bar */}
      <section className="sticky top-0 bg-white/90 backdrop-blur-lg z-40 border-b border-black/10">
        <div className="px-6 md:px-12 lg:px-20 py-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            {/* Left side filters */}
            <div className="flex items-center space-x-10">
              {/* Filter Trigger (optional) */}
              <button
                className="group flex items-center space-x-3 text-xs uppercase tracking-[0.15em] text-black/80 hover:text-black transition-all duration-300"
                onClick={() => setCategoryFilter("all")}
              >
                <span className="font-extralight">Filter</span>
                <div className="w-4 h-4 border border-black/30 rounded-sm flex items-center justify-center group-hover:border-black/60 transition-colors">
                  <div className="w-2 h-[1px] bg-black/40 group-hover:bg-black/70 transition-colors"></div>
                </div>
              </button>
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-6">
              {/* Sort Dropdown */}
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="text-xs uppercase tracking-[0.15em] font-extralight border-none bg-transparent text-black/80 focus:outline-none cursor-pointer hover:text-black transition-colors"
              >
                <option value="newest" className="bg-white text-black">
                  Newest
                </option>
                <option value="price-asc" className="bg-white text-black">
                  Price: Low to High
                </option>
                <option value="price-desc" className="bg-white text-black">
                  Price: High to Low
                </option>
                <option value="name" className="bg-white text-black">
                  Name: A to Z
                </option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-2  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-16 gap-x-8 gap-y-16">
          {sortedProducts.map((product, index) => (
            <LuxuryProductCard
              key={product.id || index}
              product={{
                ...product,
                images: product.images?.map((img) => img.url) || [],
              }}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 text-black">No Products Found</div>
      )}
    </div>
  );
}

ProductGridClient.propTypes = {
  products: PropTypes.array.isRequired,
};

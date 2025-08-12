"use client";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import LuxuryProductCard from "./ProductCard";

// Main Grid Component
export default function ProductGridClient({ products }) {
  const [sortOrder, setSortOrder] = useState("relevance");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const sortedProducts = [...products]
    .filter((p) => categoryFilter === "all" || p.category === categoryFilter)
    .sort((a, b) => {
      if (sortOrder === "relevance") return 0;
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
      <section className="sticky top-0 bg-black/90 backdrop-blur-lg z-40 border-b border-white/10">
        <div className="px-6 md:px-12 lg:px-20 py-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            {/* Left side filters */}
            <div className="flex items-center space-x-10">
              {/* Filter Trigger (optional) */}
              <button
                className="group flex items-center space-x-3 text-xs uppercase tracking-[0.15em] text-white/80 hover:text-white transition-all duration-300"
                onClick={() => setCategoryFilter("all")}
              >
                <span className="font-extralight">Filter</span>
                <div className="w-4 h-4 border border-white/30 rounded-sm flex items-center justify-center group-hover:border-white/60 transition-colors">
                  <div className="w-2 h-[1px] bg-white/40 group-hover:bg-white/70 transition-colors"></div>
                </div>
              </button>
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-6">
              {/* Sort Dropdown */}
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)} // <-- changes state in parent
                className="text-xs uppercase tracking-[0.15em] font-extralight border-none bg-transparent text-white/80 focus:outline-none cursor-pointer hover:text-white transition-colors"
              >
                <option value="relevance" className="bg-black text-white">
                  Relevance
                </option>
                <option value="price-asc" className="bg-black text-white">
                  Price: Low to High
                </option>
                <option value="price-desc" className="bg-black text-white">
                  Price: High to Low
                </option>
                <option value="name" className="bg-black text-white">
                  Name: A to Z
                </option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-16 gap-x-8 gap-y-16">
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
        <div className="text-center py-24 text-white">No Products Found</div>
      )}
    </div>
  );
}

ProductGridClient.propTypes = {
  products: PropTypes.array.isRequired,
};

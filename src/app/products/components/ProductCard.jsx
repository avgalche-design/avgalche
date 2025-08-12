"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import Link from "next/link";

export default function LuxuryProductCard({ product, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const images =
    product.images?.map((img) => (typeof img === "string" ? img : img.url)) ??
    [];

  const price = parseFloat(product.variants?.[0]?.price?.amount ?? 0);
  const currency = product.variants?.[0]?.price?.currencyCode ?? "";

  // Show first image by default, second image on hover
  const currentImage = isHovered && images.length > 1 ? images[1] : images[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.8,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.handle}`} className="block">
        {/* IMAGE WRAPPER */}
        <div className="relative aspect-[3/4] mb-5 overflow-hidden border border-neutral-200/20">
          {/* Fade Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-700" />

          {images.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage} // triggers animation on change
                src={currentImage}
                alt={product.title}
                className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${
                  imageLoaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
                } group-hover:scale-105`}
                onLoad={() => setImageLoaded(true)}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-neutral-100">
              <span className="text-neutral-500 tracking-[0.2em] text-xs uppercase">
                No Image
              </span>
            </div>
          )}
        </div>

        {/* TEXT CONTENT */}
        <div className="text-center space-y-1">
          {product.category && (
            <p className="text-neutral-500 text-[10px] uppercase tracking-[0.3em] font-light">
              {product.category}
            </p>
          )}
          <h3 className="text-[12px] tracking-[0.08em] uppercase font-extralight text-[#A1A1A1] group-hover:text-white transition-colors duration-300">
            {product.title}
          </h3>
          <p className="text-[11px] font-light tracking-wider text-white">
            {currency} {price.toFixed(2)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

LuxuryProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

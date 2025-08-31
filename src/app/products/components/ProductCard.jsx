"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import Link from "next/link";
import { useCurrency } from "@/app/context/CurrencyContext";

export default function LuxuryProductCard({ product, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [loaded, setLoaded] = useState({}); // track loaded state per image
  const { format } = useCurrency();

  const images =
    product.images?.map((img) => (typeof img === "string" ? img : img.url)) ??
    [];

  const price = parseFloat(product.variants?.[0]?.price?.amount ?? 0);
  const currency = product.variants?.[0]?.price?.currencyCode ?? "INR";

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
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-700 z-10" />

          {images.length > 0 ? (
            <>
              {/* Base Image */}
              <motion.img
                src={images[0]}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover bg-[radial-gradient(circle_at_center,_#f8f9fa_0%,_#e5e7eb_50%,_#d6d9dd_100%)] transition-transform duration-1000 ease-out group-hover:scale-105"
                style={{ opacity: isHovered && images[1] ? 0 : 1 }}
                loading={index < 8 ? "eager" : "lazy"}
                decoding="async"
                onLoad={() => setLoaded((prev) => ({ ...prev, 0: true }))}
                initial={{ opacity: 1, scale: 1.0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              />

              {/* Hover Image */}
              {images[1] && (
                <motion.img
                  src={images[1]}
                  alt={`${product.title} hover`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  style={{ opacity: isHovered ? 1 : 0 }}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => setLoaded((prev) => ({ ...prev, 1: true }))}
                  initial={{ opacity: 0, scale: 1.0 }}
                  animate={{ opacity: isHovered ? 1 : 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </>
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
          <h3 className="text-[12px] tracking-[0.08em] uppercase font-extralight text-[#525252] group-hover:text-black transition-colors duration-300">
            {product.title}
          </h3>
          <p className="text-[11px] font-bold tracking-wider text-black">
            {format(price, currency)}
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

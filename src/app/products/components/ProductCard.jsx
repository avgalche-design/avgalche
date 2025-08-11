"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductCard({ product }) {
  const router = useRouter();
  const images = product.images || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleClick = () => {
    router.push(`/products/${product.handle}`);
  };

  const progressWidth =
    images.length > 1
      ? `${((currentIndex + 1) / images.length) * 100}%`
      : "100%";

  return (
    <div
      className="group relative w-full max-w-xs mx-auto cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        {images.length > 0 && (
          <img
            src={images[currentIndex]}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 "
          />
        )}

        {/* Prev/Next Arrows */}
        {isHovered && images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 hover:bg-white"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 hover:bg-white"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Slider bar */}
        {/* {images.length > 1 && (
          <div className="absolute bottom-2 left-0 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-black transition-transform duration-300"
              style={{
                width: `${100 / images.length}%`, // width = 1/nth of total images
                transform: `translateX(${
                  currentIndex * (100 / images.length)
                }%)`, // move in steps
              }}
            />
          </div>
        )} */}
      </div>

      {/* Product Info */}
      <div className="mt-3 text-center group">
        <h3 className="font-semibold">{product.title}</h3>
        <p className="text-gray-700">{product.price}</p>

        <p
          className="text-gray-400 text-[12px] mt-1 line-clamp-1 overflow-hidden transition-opacity duration-300"
          style={{
            minHeight: "1.2em", // keeps the height fixed
            opacity: isHovered ? 1 : 0, // fades in/out
          }}
        >
          {product.description || ""}
        </p>
      </div>
    </div>
  );
}

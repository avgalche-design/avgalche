// app/products/[handle]/ProductPageClient.js
"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import YouMayAlsoLike from "../components/YouMayAlsoLike";
import { useCurrency } from "@/app/context/CurrencyContext";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaPlay,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// Image Zoom Modal Component
function ImageZoomModal({ images, selectedIndex, onClose, onImageChange }) {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastTouchDistance, setLastTouchDistance] = useState(null);
  const startRef = useRef({ x: 0, y: 0 });
  const startTranslateRef = useRef({ x: 0, y: 0 });
  const swipeStartXRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setCurrentIndex(selectedIndex);
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, [selectedIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    onImageChange(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    onImageChange(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const distance = (t1, t2) => {
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const onTouchStart = (e) => {
    if (e.touches.length === 2) {
      setIsPanning(false);
      setLastTouchDistance(distance(e.touches[0], e.touches[1]));
    } else if (e.touches.length === 1) {
      swipeStartXRef.current = e.touches[0].clientX;
      startRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      startTranslateRef.current = { ...translate };
      setIsPanning(scale > 1);
    }
  };

  const onTouchMove = (e) => {
    if (e.touches.length === 2) {
      const newDist = distance(e.touches[0], e.touches[1]);
      if (lastTouchDistance != null) {
        const delta = newDist - lastTouchDistance;
        const newScale = Math.min(3, Math.max(1, scale + delta / 200));
        setScale(newScale);
      }
      setLastTouchDistance(newDist);
    } else if (e.touches.length === 1 && isPanning) {
      const dx = e.touches[0].clientX - startRef.current.x;
      const dy = e.touches[0].clientY - startRef.current.y;
      setTranslate({
        x: startTranslateRef.current.x + dx,
        y: startTranslateRef.current.y + dy,
      });
    }
  };

  const onTouchEnd = (e) => {
    if (!isPanning && scale === 1 && swipeStartXRef.current != null) {
      const endX =
        (e.changedTouches && e.changedTouches[0]?.clientX) ||
        swipeStartXRef.current;
      const dx = endX - swipeStartXRef.current;
      if (Math.abs(dx) > 60) {
        if (dx < 0) handleNext();
        else handlePrevious();
      }
    }
    if (e.touches.length < 2) setLastTouchDistance(null);
    setIsPanning(false);
    swipeStartXRef.current = null;
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const delta = -e.deltaY;
      const newScale = Math.min(3, Math.max(1, scale + delta / 400));
      setScale(newScale);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [scale]);

  const onDoubleClick = () => {
    if (scale > 1) {
      setScale(1);
      setTranslate({ x: 0, y: 0 });
    } else {
      setScale(2);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              >
                <FaChevronLeft className="text-xl" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              >
                <FaChevronRight className="text-xl" />
              </button>
            </>
          )}

          {/* Main Image with zoom/pan and swipe */}
          <div
            ref={containerRef}
            className="relative w-full h-full flex items-center justify-center touch-pan-y"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onDoubleClick={onDoubleClick}
          >
            <div
              className="relative"
              style={{
                transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
                transition: isPanning ? "none" : "transform 0.2s ease-out",
              }}
            >
              <img
                src={images[currentIndex]?.node.url}
                alt={images[currentIndex]?.node.altText || "Product image"}
                className="max-w-full max-h-[85vh] object-contain select-none"
                draggable={false}
              />
            </div>
          </div>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}

          {/* Thumbnail Navigation */}
          {images.length > 1 && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    onImageChange(index);
                  }}
                  className={`w-16 h-16 border-2 rounded-lg overflow-hidden transition-all ${
                    currentIndex === index
                      ? "border-white scale-110"
                      : "border-white/30 hover:border-white/60"
                  }`}
                >
                  <img
                    src={image.node.url}
                    alt={image.node.altText || "Thumbnail"}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function RenderShopifyRichText({ richTextJson }) {
  if (!richTextJson) return null;

  let data;
  try {
    data =
      typeof richTextJson === "string"
        ? JSON.parse(richTextJson)
        : richTextJson;
  } catch {
    // If parsing fails, render as plain text
    return <p>{richTextJson}</p>;
  }

  // Recursively render rich text nodes
  function renderNodes(nodes) {
    return nodes.map((node, idx) => {
      switch (node.type) {
        case "paragraph":
          return (
            <p key={idx} className="mb-4">
              {renderNodes(node.children)}
            </p>
          );

        case "text":
          let textElement = node.value;
          if (node.marks) {
            node.marks.forEach((mark) => {
              switch (mark.type) {
                case "bold":
                  textElement = <strong key={idx}>{textElement}</strong>;
                  break;
                case "italic":
                  textElement = <em key={idx}>{textElement}</em>;
                  break;
                // Add underline or other formats if needed
                default:
                  break;
              }
            });
          }
          return textElement;

        case "list":
          if (node.listType === "ordered") {
            return (
              <ol key={idx} className="list-decimal list-inside mb-4">
                {renderNodes(node.children)}
              </ol>
            );
          }
          return (
            <ul key={idx} className="list-disc list-inside mb-4">
              {renderNodes(node.children)}
            </ul>
          );

        case "list-item":
          return <li key={idx}>{renderNodes(node.children)}</li>;

        case "heading":
          const Tag = `h${node.level || 3}`;
          return (
            <Tag key={idx} className="font-semibold mt-4 mb-2">
              {renderNodes(node.children)}
            </Tag>
          );

        case "link":
          return (
            <a
              key={idx}
              href={node.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {renderNodes(node.children)}
            </a>
          );

        default:
          // For unknown node types just render children recursively
          if (node.children) {
            return <>{renderNodes(node.children)}</>;
          }
          return null;
      }
    });
  }

  return <div>{renderNodes(data.children || [])}</div>;
}

// Animated Background Component
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Base solid white background */}
      <div className="absolute inset-0 bg-white">
        {/* Subtle gradients for depth */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-gray-100 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-radial from-gray-50 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );
}

// Enhanced Size Guide Component
function SizeGuide({ sizeGuideData }) {
  const [unit, setUnit] = useState("cm");
  const defaultSizeGuide = {
    title: "Size Guide",
    measurements: [
      { size: "XS", chest: "86-91cm", waist: "71-76cm", length: "66cm" },
      { size: "S", chest: "91-96cm", waist: "76-81cm", length: "68cm" },
      { size: "M", chest: "96-101cm", waist: "81-86cm", length: "70cm" },
      { size: "L", chest: "101-106cm", waist: "86-91cm", length: "72cm" },
      { size: "XL", chest: "106-111cm", waist: "91-96cm", length: "74cm" },
      { size: "XXL", chest: "111-116cm", waist: "96-101cm", length: "76cm" },
    ],
  };

  const sizeData = sizeGuideData ? JSON.parse(sizeGuideData) : defaultSizeGuide;

  const parseRange = (text) => {
    // Matches "86-91cm" OR "66cm"
    const rangeMatch = text.match(/([0-9.]+)\s*-\s*([0-9.]+)\s*(cm|in)?/i);
    if (rangeMatch) {
      return {
        min: parseFloat(rangeMatch[1]),
        max: parseFloat(rangeMatch[2]),
        unit: (rangeMatch[3] || "cm").toLowerCase(),
      };
    }

    const singleMatch = text.match(/([0-9.]+)\s*(cm|in)?/i);
    if (singleMatch) {
      const value = parseFloat(singleMatch[1]);
      return {
        min: value,
        max: value,
        unit: (singleMatch[2] || "cm").toLowerCase(),
      };
    }

    return { raw: text };
  };

  const cmToIn = (cm) => +(cm / 2.54).toFixed(1);
  const inToCm = (inch) => +(inch * 2.54).toFixed(0);

  const displayRange = (text) => {
    const parsed = parseRange(text);
    if (parsed.raw) return parsed.raw;
    if (unit === "cm") {
      const from = parsed.unit === "in" ? inToCm(parsed.min) : parsed.min;
      const to = parsed.unit === "in" ? inToCm(parsed.max) : parsed.max;
      return `${from}-${to}cm`;
    } else {
      const from = parsed.unit === "cm" ? cmToIn(parsed.min) : parsed.min;
      const to = parsed.unit === "cm" ? cmToIn(parsed.max) : parsed.max;
      return `${from}-${to}in`;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-xl font-extralight tracking-[0.3em] text-black mb-2 uppercase">
          {sizeData.title}
        </h3>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto opacity-60"></div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-lg">
        <div className="flex items-center justify-center gap-3 py-3 border-b bg-white">
          <span
            className={`text-xs uppercase tracking-[0.2em] ${
              unit === "cm" ? "text-black" : "text-gray-400"
            }`}
          >
            CM
          </span>
          <button
            aria-label="Toggle unit"
            onClick={() => setUnit((u) => (u === "cm" ? "in" : "cm"))}
            className="relative w-12 h-6 bg-gray-200 rounded-full"
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                unit === "in" ? "translate-x-6" : "translate-x-0"
              }`}
            ></span>
          </button>
          <span
            className={`text-xs uppercase tracking-[0.2em] ${
              unit === "in" ? "text-black" : "text-gray-400"
            }`}
          >
            IN
          </span>
        </div>
        {/* Desktop Table */}
        <div className="hidden sm:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-100">
                <th className="text-left py-4 px-6 font-extralight tracking-[0.15em] text-gray-600 text-xs uppercase">
                  Size
                </th>
                <th className="text-left py-4 px-6 font-extralight tracking-[0.15em] text-gray-600 text-xs uppercase">
                  Chest
                </th>
                <th className="text-left py-4 px-6 font-extralight tracking-[0.15em] text-gray-600 text-xs uppercase">
                  Waist
                </th>
                <th className="text-left py-4 px-6 font-extralight tracking-[0.15em] text-gray-600 text-xs uppercase">
                  Length
                </th>
              </tr>
            </thead>
            <tbody>
              {sizeData.measurements.map((measurement, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-all duration-300 group"
                >
                  <td className="py-4 px-6 font-light text-black group-hover:text-gray-800 transition-colors">
                    {measurement.size}
                  </td>
                  <td className="py-4 px-6 text-gray-600 group-hover:text-gray-700 transition-colors font-light">
                    {displayRange(measurement.chest)}
                  </td>
                  <td className="py-4 px-6 text-gray-600 group-hover:text-gray-700 transition-colors font-light">
                    {displayRange(measurement.waist)}
                  </td>
                  <td className="py-4 px-6 text-gray-600 group-hover:text-gray-700 transition-colors font-light">
                    {displayRange(measurement.length)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden">
          <div className="p-4 space-y-3">
            {sizeData.measurements.map((measurement, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-black text-sm">
                    Size {measurement.size}
                  </h4>
                </div>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <p className="text-gray-500 font-extralight tracking-[0.1em] uppercase mb-1">
                      Chest
                    </p>
                    <p className="text-gray-700 font-light">
                      {displayRange(measurement.chest)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-extralight tracking-[0.1em] uppercase mb-1">
                      Waist
                    </p>
                    <p className="text-gray-700 font-light">
                      {displayRange(measurement.waist)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-extralight tracking-[0.1em] uppercase mb-1">
                      Length
                    </p>
                    <p className="text-gray-700 font-light">
                      {displayRange(measurement.length)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 tracking-[0.1em] text-center font-light">
        All measurements are approximate and may vary between styles
      </p>
    </div>
  );
}

export default function ProductPageClient({
  product,
  price,
  relatedProducts,
  washCareInfo,
  shippingInfo,
  sizeGuideData,
}) {
  const { format } = useCurrency();
  const [activeTab, setActiveTab] = useState("description");
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
  const [zoomImageIndex, setZoomImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const swiperRef = useRef(null);
  const [isImageZoomOpen, setIsImageZoomOpen] = useState(false);
  const { addToCart, setIsCartOpen } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist, setIsWishlistOpen } =
    useWishlist();

  const galleryItems = useMemo(() => {
    const mediaEdges = product?.media?.edges ?? [];
    const mappedMedia = mediaEdges
      .map(({ node }) => {
        if (!node) return null;

        const baseAlt =
          node.previewImage?.altText ||
          node.alt ||
          (node.image?.altText ?? null) ||
          product.title;

        const base = {
          id: node.id || node.previewImage?.url || node.image?.url,
          type: node.mediaContentType,
          alt: baseAlt || product.title,
          previewImageUrl:
            node.previewImage?.url || node.image?.url || null,
        };

        switch (node.mediaContentType) {
          case "IMAGE":
            if (!node.image?.url) return null;
            return {
              ...base,
              url: node.image.url,
              isVideo: false,
            };
          case "VIDEO": {
            const sources = node.sources?.filter((source) => source?.url) || [];
            if (!sources.length) return null;
            return {
              ...base,
              isVideo: true,
              sources: sources.map((source) => ({
                url: source.url,
                mimeType: source.mimeType || "video/mp4",
              })),
            };
          }
          case "EXTERNAL_VIDEO":
            if (!node.originUrl) return null;
            let embedUrl = node.originUrl;
            if (node.host) {
              try {
                const parsed = new URL(node.originUrl);
                const pathSegments = parsed.pathname.split("/").filter(Boolean);
                if (node.host === "YOUTUBE") {
                  const videoId =
                    parsed.searchParams.get("v") ||
                    pathSegments[pathSegments.length - 1];
                  if (videoId) {
                    embedUrl = `https://www.youtube.com/embed/${videoId}`;
                  }
                } else if (node.host === "VIMEO") {
                  const videoId = pathSegments[pathSegments.length - 1];
                  if (videoId) {
                    embedUrl = `https://player.vimeo.com/video/${videoId}`;
                  }
                }
              } catch (error) {
                // fallback to originUrl if parsing fails
              }
            }
            return {
              ...base,
              isVideo: true,
              isExternal: true,
              externalUrl: embedUrl,
              externalHost: node.host,
              externalOriginUrl: node.originUrl,
            };
          default:
            if (base.previewImageUrl) {
              return {
                ...base,
                url: base.previewImageUrl,
                isVideo: false,
              };
            }
            return null;
        }
      })
      .filter(Boolean);

    const imageEdges = product?.images?.edges ?? [];
    const fallbackImages = imageEdges
      .map(({ node }, index) => {
        if (!node?.url) return null;
        return {
          id: node?.id || `${node.url}-${index}`,
          type: "IMAGE",
          alt: node.altText || product.title,
          previewImageUrl: node.url,
          url: node.url,
          isVideo: false,
        };
      })
      .filter(Boolean);

    const combined = [...mappedMedia];
    fallbackImages.forEach((image) => {
      const exists = combined.some((item) => {
        const matchesUrl =
          (item.url && image.url && item.url === image.url) ||
          (item.previewImageUrl &&
            image.previewImageUrl &&
            item.previewImageUrl === image.previewImageUrl);
        return matchesUrl;
      });
      if (!exists) {
        combined.push(image);
      }
    });

    return combined.filter(
      (item) => item.url || item.sources?.length || item.externalUrl
    );
  }, [product]);

  const imageItemsForZoom = useMemo(() => {
    return galleryItems
      .filter((item) => !item.isVideo && item.url)
      .map((item) => ({
        id: item.id,
        node: {
          url: item.url,
          altText: item.alt,
        },
      }));
  }, [galleryItems]);

  useEffect(() => {
    if (selectedSlideIndex >= galleryItems.length && galleryItems.length > 0) {
      setSelectedSlideIndex(0);
    }
  }, [galleryItems.length, selectedSlideIndex]);

  useEffect(() => {
    if (zoomImageIndex >= imageItemsForZoom.length && imageItemsForZoom.length > 0) {
      setZoomImageIndex(0);
    }
  }, [imageItemsForZoom.length, zoomImageIndex]);

  const openZoomAtIndex = (galleryIndex) => {
    const targetItem = galleryItems[galleryIndex];
    if (!targetItem || targetItem.isVideo) return;
    const imageIndex = imageItemsForZoom.findIndex(
      (image) => image.id === targetItem.id
    );
    if (imageIndex === -1) return;
    setZoomImageIndex(imageIndex);
    setIsImageZoomOpen(true);
  };

  const handleZoomImageChange = (imageIndex) => {
    setZoomImageIndex(imageIndex);
    const targetImage = imageItemsForZoom[imageIndex];
    if (!targetImage) return;
    const galleryIndex = galleryItems.findIndex(
      (item) => item.id === targetImage.id
    );
    if (galleryIndex !== -1) {
      setSelectedSlideIndex(galleryIndex);
      swiperRef.current?.slideTo(galleryIndex);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addToCart(selectedVariant.id, 1);
    setIsCartOpen(true); // 👈 open modal instead of redirect
  };

  const getWishlistKey = () =>
    `${product.id}::${selectedVariant?.id || "no-variant"}`;

  const handleWishlistToggle = () => {
    if (!selectedVariant) return;
    const wishlistId = getWishlistKey();
    const productData = {
      id: wishlistId,
      productId: product.id,
      title: product.title,
      handle: product.handle,
      selectedVariantId: selectedVariant.id,
      selectedVariantTitle: selectedVariant.title,
      selectedVariantAvailableForSale: selectedVariant.availableForSale,
      selectedVariantPrice: selectedVariant.price,
      images: product.images.edges,
      variants: product.variants.edges.map((edge) => ({
        id: edge.node.id,
        title: edge.node.title,
        price: edge.node.price,
        availableForSale: edge.node.availableForSale,
      })),
    };

    if (isInWishlist(wishlistId)) {
      removeFromWishlist(wishlistId);
    } else {
      addToWishlist(productData);
      setIsWishlistOpen?.(true);
    }
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const tabs = [
    { id: "description", label: "Description" },
    { id: "size-guide", label: "Size Guide" },
    { id: "wash-care", label: "Wash & Care" },
    { id: "shipping", label: "Shipping" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto opacity-60"></div>
            </div>
            <p className="text-gray-700 leading-[1.8] bg-[#F9FAFB]  border border-gray-200 rounded-md p-6 text-left font-extralight tracking-[0.02em] text-base max-w-2xl mx-auto">
              {product.description ||
                "Embodying the essence of contemporary luxury, this piece transcends ordinary fashion. Meticulously crafted from premium materials with uncompromising attention to detail, it represents the perfect harmony between avant-garde design and timeless sophistication."}
            </p>
          </div>
        );
      case "size-guide":
        return <SizeGuide sizeGuideData={sizeGuideData} />;
      case "wash-care":
        return (
          <div className="space-y-6 flex flex-col items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl font-extralight tracking-[0.3em] text-black mb-2 uppercase">
                Care Instructions
              </h3>
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto opacity-60"></div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
              <ul className="space-y-2 font-light text-gray-700">
                {washCareInfo
                  ?.split("\n")
                  ?.filter((line) => line.trim() !== "")
                  ?.map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
              </ul>
            </div>
          </div>
        );

      case "shipping":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-extralight tracking-[0.3em] text-black mb-2 uppercase">
                Shipping Information
              </h3>
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto opacity-60"></div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
              <div className="space-y-3">
                {shippingInfo.split("\n").map(
                  (line, index) =>
                    line.trim() && (
                      <div
                        key={index}
                        className="flex items-center space-x-3 group"
                      >
                        <div className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-gray-600 transition-colors"></div>
                        <p className="text-sm font-extralight tracking-[0.05em] text-gray-600 group-hover:text-gray-800 transition-colors">
                          {line.trim().replace("•", "").trim()}
                        </p>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <AnimatedBackground />

      <main className="relative z-10 text-black min-h-screen">
        {/* Hero Section */}
        <div
          className={`px-6 md:px-12 lg:px-20 pt-24 pb-4 max-w-8xl mx-auto transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* LEFT - Product Images */}
            <div className="space-y-8">
              {/* Main Image */}
              <div className="relative">
                <div className="aspect-[4/5] bg-white border  border-gray-200 overflow-hidden">
                  <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    speed={0} // ← makes slide change instant
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={(swiper) => {
                      const newIndex = swiper.activeIndex;
                      setSelectedSlideIndex(newIndex);
                      const activeItem = galleryItems[newIndex];
                      if (activeItem && !activeItem.isVideo) {
                        const imageIndex = imageItemsForZoom.findIndex(
                          (image) => image.id === activeItem.id
                        );
                        if (imageIndex !== -1) {
                          setZoomImageIndex(imageIndex);
                        }
                      }
                    }}
                  >
                    {galleryItems.length > 0 ? (
                      galleryItems.map((item, index) => (
                        <SwiperSlide
                          key={item.id || index}
                          className="relative aspect-[4/5]"
                        >
                          {item.isVideo ? (
                            item.isExternal ? (
                              <iframe
                                src={item.externalUrl}
                                title={item.alt || product.title}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            ) : (
                              <video
                                controls
                                className="w-full h-full object-cover"
                                poster={item.previewImageUrl || undefined}
                              >
                                {item.sources?.map((source) => (
                                  <source
                                    key={source.url}
                                    src={source.url}
                                    type={source.mimeType}
                                  />
                                ))}
                                Your browser does not support the video tag.
                              </video>
                            )
                          ) : (
                            <Image
                              src={item.url}
                              alt={item.alt || product.title}
                              fill
                              sizes="(max-width:768px) 100vw, 50vw"
                              className="object-cover"
                              onClick={() => {
                                setSelectedSlideIndex(index);
                                openZoomAtIndex(index);
                              }}
                            />
                          )}
                        </SwiperSlide>
                      ))
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-500 font-extralight tracking-[0.2em] text-sm uppercase">
                          No Media Available
                        </span>
                      </div>
                    )}
                  </Swiper>
                </div>
              </div>

              {/* Product Images Grid */}
              {galleryItems.length > 1 && (
                <div className="grid grid-cols-2 gap-4">
                  {galleryItems.map((item, index) => {
                    const thumbnailSrc = item.previewImageUrl || item.url;
                    return (
                      <button
                        key={item.id || index}
                        onClick={() => {
                          setSelectedSlideIndex(index);
                          swiperRef.current?.slideTo(index);
                          if (
                            !item.isVideo &&
                            typeof window !== "undefined" &&
                            window.innerWidth < 768
                          ) {
                            openZoomAtIndex(index);
                          }
                        }}
                        className={`relative aspect-[4/5] border overflow-hidden  transition-all duration-300 ${
                          selectedSlideIndex === index
                            ? "border-gray-400 "
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {thumbnailSrc ? (
                          <img
                            src={thumbnailSrc}
                            alt={item.alt || product.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 text-xs uppercase tracking-[0.2em]">
                            No Preview
                          </div>
                        )}
                        {item.isVideo && (
                          <span className="absolute inset-0 flex items-center justify-center bg-black/30 text-white">
                            <FaPlay className="text-lg" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* RIGHT - Product Details */}
            <div className="lg:sticky lg:top-8 space-y-10">
              {/* Product Header */}
              <div className="text-center space-y-6 pb-10 border-b border-gray-200">
                <div className="space-y-4">
                  <h1 className="text-xl lg:text-5xl font-extralight tracking-[0.1em] text-black leading-tight">
                    {product.title}
                  </h1>
                  <p className="text-xs text-gray-500 uppercase tracking-[0.3em] font-extralight">
                    {product.productType}
                  </p>
                </div>

                {price && (
                  <div className="pt-6">
                    <div className="inline-block">
                      <p className="text-3xl font-extralight tracking-[0.05em] text-black">
                        {format(parseFloat(price.amount), price.currencyCode)}
                      </p>
                      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent mt-2"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Size Selection */}
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-sm uppercase tracking-[0.3em] text-gray-500 font-extralight mb-4">
                    Select Size
                  </h3>
                  <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto"></div>
                </div>

                <div className="flex flex-wrap gap-3 justify-center">
                  {product.variants.edges.map(({ node }) => (
                    <button
                      key={node.id}
                      onClick={() => setSelectedVariant(node)}
                      className={`
                        relative w-14 h-14 border transition-all duration-500 text-xs font-extralight tracking-wider rounded-sm
                        ${
                          selectedVariant?.id === node.id
                            ? "border-black bg-black text-white shadow-lg scale-110"
                            : node.availableForSale
                            ? "border-gray-300 hover:border-black hover:bg-gray-50 hover:scale-105 text-gray-700 hover:text-black"
                            : "border-gray-200 text-gray-500"
                        }
                      `}
                    >
                      {node.title}
                      {selectedVariant?.id === node.id && (
                        <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 via-transparent to-gray-200 rounded-sm blur-sm"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-6">
                {selectedVariant ? (
                  selectedVariant.availableForSale ? (
                    <button
                      onClick={handleAddToCart}
                      className="relative w-full py-4 text-sm uppercase tracking-[0.2em] font-light transition-all duration-500 rounded-sm overflow-hidden group bg-black text-white hover:bg-gray-800 hover:scale-[1.02] shadow-lg"
                    >
                      <span className="relative z-10">Add to Cart</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsWishlistOpen?.(true)}
                      className="relative w-full py-4 text-sm uppercase tracking-[0.2em] font-light transition-all duration-500 rounded-sm overflow-hidden group border border-gray-300 bg-white text-black"
                    >
                      <span className="relative z-10">Notify me</span>
                    </button>
                  )
                ) : (
                  <button
                    className="relative w-full py-4 text-sm uppercase tracking-[0.2em] font-light transition-all duration-500 rounded-sm overflow-hidden group bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                    disabled
                  >
                    <span className="relative z-10">Select Size</span>
                  </button>
                )}

                <button
                  onClick={handleWishlistToggle}
                  disabled={!selectedVariant}
                  className={`relative w-full border py-4 text-sm uppercase tracking-[0.2em] font-extralight transition-all duration-500 rounded-sm group overflow-hidden flex items-center justify-center gap-2 ${
                    !selectedVariant
                      ? "cursor-not-allowed opacity-60 border-gray-200"
                      : !selectedVariant.availableForSale
                      ? "bg-black text-white border-black hover:bg-black"
                      : "border-gray-300 hover:border-black hover:bg-gray-50"
                  }`}
                >
                  <FaHeart
                    className={`text-sm ${
                      selectedVariant &&
                      isInWishlist(`${product.id}::${selectedVariant.id}`)
                        ? !selectedVariant.availableForSale
                          ? "text-white"
                          : "text-red-500"
                        : !selectedVariant?.availableForSale
                        ? "text-white"
                        : "text-gray-400"
                    }`}
                  />
                  <span className="relative z-10">
                    {selectedVariant
                      ? isInWishlist(`${product.id}::${selectedVariant.id}`)
                        ? `Remove from Wishlist (${selectedVariant.title})`
                        : `Add to Wishlist (${selectedVariant.title})`
                      : "Add to Wishlist"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </button>
              </div>

              {/* Product Information Tabs */}
              <div className="pt-10 border-t  border-gray-200">
                {/* Tab Navigation */}
                <nav className="flex justify-center gap-8 mb-12">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative pb-3 text-xs font-extralight tracking-[0.15em] uppercase transition-all duration-500 ${
                        activeTab === tab.id
                          ? "text-black"
                          : "text-gray-500 hover:text-black"
                      }`}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
                      )}
                    </button>
                  ))}
                </nav>

                {/* Tab Content */}
                <div className="min-h-[300px]">{renderTabContent()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like Section */}
        <div className="px-6 md:px-12 lg:px-20 py-4">
          <YouMayAlsoLike products={relatedProducts} />
        </div>
      </main>

      {/* Image Zoom Modal */}
      {isImageZoomOpen && imageItemsForZoom.length > 0 && (
        <ImageZoomModal
          images={imageItemsForZoom}
          selectedIndex={zoomImageIndex}
          onClose={() => setIsImageZoomOpen(false)}
          onImageChange={handleZoomImageChange}
        />
      )}
    </>
  );
}

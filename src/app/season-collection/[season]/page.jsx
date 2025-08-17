"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const seasonData = {
  summer: {
    title: "Summer Collection",
    description:
      "Embrace the warmth with our curated summer essentials. Light, breathable fabrics meet timeless elegance in every piece.",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1628535890509-2a8b79b9b034?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Summer Collection Main",
        type: "large",
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1628537509499-7a8b5d1c5240?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Summer Style 1",
        type: "small",
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1628538184867-c91cd11e2d78?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Summer Style 2",
        type: "small",
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1628537553363-640c5da382ba?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Summer Style 3",
        type: "small",
      },
      {
        id: 5,
        url: "https://images.unsplash.com/photo-1596910941795-99165dd1174c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Summer Collection Secondary",
        type: "large",
      },
      {
        id: 6,
        url: "https://images.unsplash.com/photo-1623247146463-612fd69092f7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Summer Style 4",
        type: "small",
      },
      {
        id: 7,
        url: "https://images.unsplash.com/photo-1596913426691-660945d833ff?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Summer Style 5",
        type: "small",
      },
      {
        id: 8,
        url: "https://images.unsplash.com/photo-1623246938157-f793110ee4d9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Summer Style 6",
        type: "small",
      },
    ],
  },
  winter: {
    title: "Winter Collection",
    description:
      "Sophisticated winter wear that combines warmth with style. Premium fabrics and elegant designs for the modern connoisseur.",
    images: [
      {
        id: 1,
        url: "https://plus.unsplash.com/premium_photo-1664302018699-6ac9c92ee80a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Winter Collection Main",
        type: "large",
      },
      {
        id: 2,
        url: "https://plus.unsplash.com/premium_photo-1664301996261-9eb69c8a5019?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Winter Style 1",
        type: "small",
      },
      {
        id: 3,
        url: "https://plus.unsplash.com/premium_photo-1683140737975-762028aff484?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Winter Style 2",
        type: "small",
      },
      {
        id: 4,
        url: "https://plus.unsplash.com/premium_photo-1663045686073-b20529f9a147?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Winter Style 3",
        type: "small",
      },
      {
        id: 5,
        url: "https://images.unsplash.com/photo-1704989977281-a741f7e1f7a0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Winter Collection Secondary",
        type: "large",
      },
      {
        id: 6,
        url: "https://images.unsplash.com/photo-1704989969259-39f5189359bf?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Winter Style 4",
        type: "small",
      },
      {
        id: 7,
        url: "https://images.unsplash.com/photo-1704989974977-8f0983f9d681?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Winter Style 5",
        type: "small",
      },
      {
        id: 8,
        url: "https://images.unsplash.com/photo-1704989983343-21476626a16a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Winter Style 6",
        type: "small",
      },
    ],
  },
};

export default function SeasonCollection({ params }) {
  const [season, setSeason] = useState(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const { season: seasonParam } = params; // direct access, no use()
    if (seasonData[seasonParam]) {
      setSeason(seasonData[seasonParam]);
    }
    setLoading(false);
  }, [params]);

  useEffect(() => {
    if (season && typeof window !== "undefined") {
      // GSAP animations
      const ctx = gsap.context(() => {
        // Header animation
        gsap.fromTo(
          headerRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.2,
          }
        );

        // Image animations with ScrollTrigger
        const images = gsap.utils.toArray(".image-item");
        images.forEach((image, index) => {
          gsap.fromTo(
            image,
            {
              y: 100,
              opacity: 0,
              scale: 0.95,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: image,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        // Hover animations for images
        images.forEach((image) => {
          const img = image.querySelector("img");
          const overlay = image.querySelector(".image-overlay");

          image.addEventListener("mouseenter", () => {
            gsap.to(img, { scale: 1.05, duration: 0.6, ease: "power2.out" });
            gsap.to(overlay, { opacity: 0.2, duration: 0.3 });
          });

          image.addEventListener("mouseleave", () => {
            gsap.to(img, { scale: 1, duration: 0.6, ease: "power2.out" });
            gsap.to(overlay, { opacity: 0, duration: 0.3 });
          });
        });
      }, containerRef);

      return () => ctx.revert();
    }
  }, [season]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!season) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light tracking-wide text-neutral-400 mb-2">
            Collection Not Found
          </h1>
          <p className="text-sm text-neutral-500 tracking-wider">
            The requested collection is not available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-black/10">
        <div ref={headerRef} className="max-w-7xl mx-auto px-6 py-12">
          <Link
            href="/"
            className="inline-block mb-8 text-sm uppercase tracking-widest text-black/60 hover:text-black transition-colors"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.05em] text-black mb-4">
            {season.title}
          </h1>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-black/40 to-transparent mb-6" />
          <p className="text-lg text-black/70 max-w-2xl leading-relaxed">
            {season.description}
          </p>
        </div>
      </div>

      {/* Image Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* First Large Image */}
          <div className="image-item group cursor-pointer overflow-hidden flex justify-center">
            <div className="relative aspect-[2/3] overflow-hidden max-w-2xl">
              <img
                src={season.images[0].url}
                alt={season.images[0].alt}
                className="w-full h-full object-cover"
              />
              <div className="image-overlay absolute inset-0 bg-black/0" />
            </div>
          </div>

          {/* First Row of 3 Small Images */}
          <div className="flex mt-10 justify-center">
            <div className="grid grid-cols-3 gap-4 max-w-4xl">
              {season.images.slice(1, 4).map((image, index) => (
                <div
                  key={image.id}
                  className="image-item group cursor-pointer overflow-hidden"
                >
                  <div className="relative aspect-[2/3] overflow-hidden max-w-xs">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="image-overlay absolute inset-0 bg-black/0" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Second Large Image */}
          <div className="image-item group cursor-pointer overflow-hidden flex justify-center">
            <div className="relative aspect-[2/3] overflow-hidden max-w-2xl">
              <img
                src={season.images[4].url}
                alt={season.images[4].alt}
                className="w-full h-full object-cover"
              />
              <div className="image-overlay absolute inset-0 bg-black/0" />
            </div>
          </div>

          {/* Second Row of 3 Small Images */}
          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-4 max-w-4xl">
              {season.images.slice(5, 8).map((image, index) => (
                <div
                  key={image.id}
                  className="image-item group cursor-pointer overflow-hidden"
                >
                  <div className="relative aspect-[2/3] overflow-hidden max-w-xs">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="image-overlay absolute inset-0 bg-black/0" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className=" border-black/10 py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-extralight tracking-[0.05em] text-black mb-6">
            Discover More
          </h2>
          <p className="text-black/70 mb-8 max-w-2xl mx-auto">
            Explore our complete collection and find your perfect style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-block bg-black rounded-md text-white px-8 py-4 text-sm uppercase tracking-[0.2em] font-light hover:bg-neutral-800 transition-colors"
            >
              Shop Collection
            </Link>
            <Link
              href="/"
              className="inline-block border rounded-md border-black text-black px-8 py-4 text-sm uppercase tracking-[0.2em] font-light hover:bg-black hover:text-white transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

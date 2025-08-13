"use client";
import React, { useRef, useEffect, useState } from "react";
import { ArrowBigDown, Facebook, Instagram, Twitter } from "lucide-react";
import { IoIosArrowRoundDown } from "react-icons/io";

const imagesSet1 = [
  "https://images.unsplash.com/photo-1743024599050-391c63c52d32?q=80&w=687&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600481006437-5ef63a680aa5?q=80&w=687&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559907286-d76559dcbdcc?q=80&w=735&auto=format&fit=crop",
];

const imagesSet2 = [
  "https://plus.unsplash.com/premium_photo-1675186049419-d48f4b28fe7c?q=80&w=1587&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1682752392983-12ab417802d7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1575403538007-acb790100421?q=80&w=687&auto=format&fit=crop",
];

export default function HeroSection() {
  const set1Ref = useRef(null);
  const set2Ref = useRef(null);
  const containerRef = useRef(null);
  const [slideWidth, setSlideWidth] = useState(1000);

  useEffect(() => {
    // Simple GSAP-like animation using CSS transforms
    let currentSet = 0; // 0 for set1, 1 for set2

    const animateCarousel = () => {
      if (!set1Ref.current || !set2Ref.current) return;

      const width = set1Ref.current.offsetWidth;
      setSlideWidth(width);

      if (currentSet === 0) {
        // Show set1, hide set2 to the right
        set1Ref.current.style.transform = `translateX(0px)`;
        set2Ref.current.style.transform = `translateX(${width}px)`;
        set1Ref.current.style.transition = "transform 1s ease-in-out";
        set2Ref.current.style.transition = "transform 1s ease-in-out";
      } else {
        // Show set2, hide set1 to the right
        set1Ref.current.style.transform = `translateX(${width}px)`;
        set2Ref.current.style.transform = `translateX(0px)`;
        set1Ref.current.style.transition = "transform 1s ease-in-out";
        set2Ref.current.style.transition = "transform 1s ease-in-out";
      }

      currentSet = 1 - currentSet; // Toggle between 0 and 1
    };

    // Initial setup
    if (set1Ref.current && set2Ref.current) {
      const width = set1Ref.current.offsetWidth;
      setSlideWidth(width);

      // Position set1 visible, set2 hidden to the right
      set1Ref.current.style.transform = `translateX(0px)`;
      set2Ref.current.style.transform = `translateX(${width}px)`;
      set1Ref.current.style.transition = "none";
      set2Ref.current.style.transition = "none";
    }

    // Start animation after 5 seconds, then repeat every 5 seconds
    const interval = setInterval(animateCarousel, 3000);

    return () => clearInterval(interval);
  }, []);

  const renderImageSet = (images, ref) => (
    <div
      ref={ref}
      className="absolute flex items-center gap-8 flex-shrink-0"
      style={{ height: "500px" }}
    >
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className={
            i === 1
              ? "h-[500px] w-auto object-cover"
              : "h-72 w-auto object-cover"
          }
        />
      ))}
    </div>
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden min-h-screen bg-white flex flex-col justify-center"
    >
      <div className="flex  justify-between  text-black items-end px-8">
        {/* Left Social Icons */}
        <div className="flex flex-col gap-4  ml-24 items-center">
          <a href="#" className="p-2 border rounded-full">
            <Facebook size={18} />
          </a>
          <a href="#" className="p-2 border rounded-full">
            <Instagram size={18} />
          </a>
          <a href="#" className="p-2 border rounded-full">
            <Twitter size={18} />
          </a>
        </div>

        {/* Horizontal Carousel */}
        <div
          className="relative overflow-hidden   "
          style={{ width: slideWidth, height: "500px" }}
        >
          {renderImageSet(imagesSet1, set1Ref)}
          {renderImageSet(imagesSet2, set2Ref)}
        </div>

        {/* Scroll Down */}
        <div className="flex flex-col items-center mr-24 text-sm">
          <span>Scroll Down</span>
          <span className="mt-2">
            <IoIosArrowRoundDown className=" animate-bounce text-3xl" />
          </span>
        </div>
      </div>

      {/* Brand Title */}
      <h1
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[120px] font-light logo"
        style={{
          color: "white", // set white for better contrast
          mixBlendMode: "difference", // negative effect
          WebkitMixBlendMode: "difference",
          zIndex: 30,
          position: "absolute",
          userSelect: "none",
        }}
      >
        AV GaLche
      </h1>
    </section>
  );
}

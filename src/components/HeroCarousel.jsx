"use client";
import React, { useRef, useEffect, useState } from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
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
    let currentSet = 0;

    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setSlideWidth(width);
        if (set1Ref.current && set2Ref.current) {
          set1Ref.current.style.transform = `translateX(0px)`;
          set2Ref.current.style.transform = `translateX(${width}px)`;
          set1Ref.current.style.transition = "none";
          set2Ref.current.style.transition = "none";
        }
      }
    };

    requestAnimationFrame(updateWidth);
    window.addEventListener("resize", updateWidth);

    const animateCarousel = () => {
      if (!set1Ref.current || !set2Ref.current) return;

      const width = slideWidth;
      if (currentSet === 0) {
        set1Ref.current.style.transform = `translateX(0px)`;
        set2Ref.current.style.transform = `translateX(${width}px)`;
      } else {
        set1Ref.current.style.transform = `translateX(${width}px)`;
        set2Ref.current.style.transform = `translateX(0px)`;
      }
      set1Ref.current.style.transition = "transform 1s ease-in-out";
      set2Ref.current.style.transition = "transform 1s ease-in-out";

      currentSet = 1 - currentSet;
    };

    const interval = setInterval(animateCarousel, 2000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", updateWidth);
    };
  }, [slideWidth]);

  const renderImageSet = (images, ref) => (
    <div
      ref={ref}
      className="absolute flex items-center justify-center gap-4 sm:gap-6 md:gap-8 flex-shrink-0 w-full"
      style={{ height: "clamp(200px, 50vw, 500px)" }}
    >
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className={
            i === 1
              ? "object-cover h-[clamp(200px,50vw,500px)] w-auto"
              : "object-cover h-[clamp(150px,35vw,288px)] w-auto"
          }
        />
      ))}
    </div>
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden  h-[17rem] md:h-[37rem] xl:min-h-screen  flex flex-col justify-center "
    >
      <div className="flex justify-between text-black items-end px-4 sm:px-8">
        {/* Left Social Icons */}
        <div className="hidden xl:flex flex-col gap-3 sm:gap-4 md:ml-24 items-center">
          <a href="#" className="p-1 sm:p-2 border rounded-full">
            <Facebook size={16} />
          </a>
          <a href="#" className="p-1 sm:p-2 border rounded-full">
            <Instagram size={16} />
          </a>
          <a href="#" className="p-1 sm:p-2 border rounded-full">
            <Twitter size={16} />
          </a>
        </div>

        {/* Horizontal Carousel */}
        <div
          className="relative overflow-hidden"
          style={{ width: slideWidth, height: "clamp(200px, 50vw, 500px)" }}
        >
          {renderImageSet(imagesSet1, set1Ref)}
          {renderImageSet(imagesSet2, set2Ref)}
        </div>

        {/* Scroll Down */}
        <div className="hidden xl:flex flex-col items-center sm:mr-12 md:mr-24 text-xs w-24">
          <span>Scroll Down</span>
          <span className="mt-2">
            <IoIosArrowRoundDown className="animate-bounce text-2xl sm:text-3xl" />
          </span>
        </div>
      </div>

      {/* Brand Title */}
      <h1
        className="absolute bottom-4 left-1/2 -translate-x-1/2 font-light logo text-3xl md:text-6xl xl:text-[120px]"
        style={{
          color: "white",
          mixBlendMode: "difference",
          WebkitMixBlendMode: "difference",
          zIndex: 30,
          position: "absolute",
          userSelect: "none",
          isolation: "isolate", // <-- add this
          transform: "translateZ(0)", // <-- optional GPU fix
        }}
      >
        AV GaLche
      </h1>
    </section>
  );
}

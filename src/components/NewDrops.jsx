// components/NewDrops.js
"use client";
import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NewDrops() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1, // Smoother scrubbing
        },
      });

      // Text: Fade and slide in from left, color to black
      tl.fromTo(
        textRef.current,
        {
          opacity: 0,
          x: -150,
          color: "#cccccc",
        },
        {
          opacity: 1,
          x: 250,
          color: "#000000",
          duration: 0.7,
          ease: "power2.out",
        },
        0
      );

      // Image: Start very small and scale up dramatically
      tl.fromTo(
        imgRef.current,
        {
          scale: 0.1, // Much smaller starting scale
          opacity: 0.3,
          transformOrigin: "center center",
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1, // Slightly longer duration for smoother effect
          ease: "power2.out",
        },
        0.2 // Start slightly after text for better visual flow
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col lg:flex-row bg-white justify-between px-8 py-6   min-h-screen"
    >
      {/* Left: Text */}
      <div className="w-full lg:w-1/2  flex flex-col h-[300px]  mb-12 lg:mb-0 lg:pr-12">
        <h2
          ref={textRef}
          className="text-5xl lg:text-6xl xl:text-7xl font-light leading-tight"
          style={{
            letterSpacing: "-0.02em",
          }}
        >
          Our New
          <br />
          Drops
        </h2>
      </div>

      {/* Right: Image */}
      <div className="w-full lg:w-1/2 flex  justify-center ">
        <div className="relative">
          <img
            ref={imgRef}
            src="https://images.unsplash.com/photo-1586072068429-f8d46f1e9a47?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Fashion Services"
            className=" object-cover"
            style={{
              width: 400,
              height: 500,
              willChange: "transform", // Optimize for animations
            }}
          />
        </div>
      </div>
    </section>
  );
}

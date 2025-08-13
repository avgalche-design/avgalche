"use client";
import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function NewDrops() {
  const [products, setProducts] = useState([]);
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);
  const secondImgRef = useRef(null);
  const thirdImgRef = useRef(null);
  const fourthImgRef = useRef(null);
  const paraRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/shopify-products");
        const data = await res.json();
        const prods = data.products.edges.map((edge) => {
          const node = edge.node;
          return {
            image: node.images.edges[0]?.node.url || "/images/placeholder.png",
            alt: node.images.edges[0]?.node.altText || node.title || "Product",
          };
        });
        setProducts(prods);
      } catch (err) {
        console.error("Error loading products:", err);
      }
    }
    loadProducts();
  }, []);

  // Detect screen width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000); // Tailwind 'md' breakpoint
    };
    handleResize(); // check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    if (isMobile) return; // Skip animations on mobile

    let ctx = gsap.context(() => {
      // === TEXT ===
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -150, color: "#cccccc" },
        {
          opacity: 1,
          x: 250,
          color: "#000000",
          ease: "power1.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      // === FIRST IMAGE ===
      gsap.fromTo(
        imgRef.current,
        { scale: 0.1, opacity: 0.3, transformOrigin: "center center" },
        {
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: imgRef.current,
            start: "top 90%",
            end: "top top",
            scrub: 1,
          },
        }
      );

      // === SECOND IMAGE ===
      gsap.fromTo(
        secondImgRef.current,
        {
          scale: 0.1,
          opacity: 0,
          x: 200,
          y: -80,
          transformOrigin: "top right",
        },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: secondImgRef.current,
            start: "top 50%",
            end: "top 10%",
            scrub: 1,
          },
        }
      );

      // === THIRD IMAGE ===
      gsap.fromTo(
        thirdImgRef.current,
        {
          scale: 0.1,
          opacity: 0,
          x: -150,
          y: -50,
          transformOrigin: "top left",
        },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: thirdImgRef.current,
            start: "top 60%",
            end: "top 10%",
            scrub: 1,
          },
        }
      );

      // === FOURTH IMAGE ===
      gsap.fromTo(
        fourthImgRef.current,
        { scale: 0.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: fourthImgRef.current,
            start: "top 95%",
            end: "top 10%",
            scrub: 1,
          },
        }
      );

      // === PARAGRAPH ===
      gsap.fromTo(
        paraRef.current,
        { opacity: 0, x: 150, color: "#cccccc" },
        {
          opacity: 1,
          x: 0,
          color: "#000000",
          ease: "power1.out",
          scrollTrigger: {
            trigger: paraRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className={`bg-white px-8 py-12 ${
        isMobile
          ? "grid grid-cols-2 gap-4 h-auto"
          : "flex flex-col lg:flex-row justify-between h-auto"
      }`}
    >
      {isMobile ? (
        <>
          {/* Mobile Grid - only images, no animation */}
          <img
            src="https://images.unsplash.com/photo-1586072068429-f8d46f1e9a47?q=80&w=687&auto=format&fit=crop"
            alt="First Drop"
            className="object-cover w-full h-48"
          />
          <img
            src="https://images.unsplash.com/photo-1586072068429-f8d46f1e9a47?q=80&w=687&auto=format&fit=crop"
            alt="Second Drop"
            className="object-cover w-full h-48"
          />
          <img
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=687&auto=format&fit=crop"
            alt="Third Drop"
            className="object-cover w-full h-48"
          />
          <img
            src="https://images.unsplash.com/photo-1586072068429-f8d46f1e9a47?q=80&w=687&auto=format&fit=crop"
            alt="Fourth Drop"
            className="object-cover w-full h-48"
          />
          {/* Paragraph */}
          <div className="mt-2  w-[300px]">
            <p className="text-gray-600 text-sm mb-4">
              Odio fermentum blandit aliquam varius amet id vel augue. Amet
              vulputate duis pulvinar pellentesque sed suspendisse sagittis.
            </p>
            <button className="relative text-black p-1 font-medium group">
              <h2>Discover Collection</h2>
              <span className="absolute left-0 bottom-0 h-[2px] w-1/4 bg-black transition-all duration-500 group-hover:w-full"></span>
              <span className="absolute right-0 bottom-0 h-[2px] w-1/4 bg-black transition-all duration-500 group-hover:w-full"></span>
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Original Layout for md+ screens */}
          {/* Left column */}
          <div className="w-full lg:w-1/2 flex flex-col mb-12 lg:mb-0 lg:pr-12">
            <h2
              ref={textRef}
              className="text-5xl lg:text-6xl xl:text-7xl font-light leading-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              Our New
              <br />
              Drops
            </h2>

            {/* Second image */}
            <div className="ml-22 mt-44 flex justify-end">
              <img
                ref={secondImgRef}
                src="https://images.unsplash.com/photo-1586072068429-f8d46f1e9a47?q=80&w=687&auto=format&fit=crop"
                alt="Second Drop"
                className="object-cover mt-8"
                style={{ width: 450, height: 500 }}
              />
            </div>

            {/* Fourth image */}
            <div className="ml-22 mt-44 flex justify-end">
              <img
                ref={fourthImgRef}
                src="https://images.unsplash.com/photo-1586072068429-f8d46f1e9a47?q=80&w=687&auto=format&fit=crop"
                alt="Fourth Drop"
                className="object-cover mt-8"
                style={{ width: 450, height: 500 }}
              />
            </div>
          </div>

          {/* Right column */}
          <div className="w-full lg:w-1/2 flex flex-col justify-start">
            <div className="relative p-0">
              <img
                ref={imgRef}
                src={products[0]?.image}
                alt="First Drop"
                className="object-cover"
                style={{ width: 450, height: 500 }}
              />
            </div>

            {/* Third image */}
            <div className="relative mt-64 p-0">
              <img
                ref={thirdImgRef}
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=687&auto=format&fit=crop"
                alt="Third Drop"
                className="object-cover"
                style={{ width: 450, height: 500 }}
              />

              {/* Paragraph */}
              <div ref={paraRef} className="mt-60 ml-24 w-[350px]">
                <p className="text-gray-600 text-sm mb-4">
                  Discover timeless silhouettes, refined textures, and statement
                  pieces curated for the modern luxury wardrobe.
                </p>
                <Link href="/products">
                  <button className="relative text-black p-1 font-medium group">
                    <h2>Discover Collection</h2>
                    <span className="absolute left-0 bottom-0 h-[2px] w-1/4 bg-black transition-all duration-500 group-hover:w-full"></span>
                    <span className="absolute right-0 bottom-0 h-[2px] w-1/4 bg-black transition-all duration-500 group-hover:w-full"></span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

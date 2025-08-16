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
            handle: node.handle,
            title: node.title || "Product",
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
      setIsMobile(window.innerWidth < 1200); // Tailwind 'md' breakpoint
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
            trigger: fourthImgRef.current,
            start: "top 40%",
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

  const images = [
    "https://plus.unsplash.com/premium_photo-1675186049409-f9f8f60ebb5e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1681223965612-8948231413b6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1681980021035-5db5823c974b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1675186049406-3fabe5f387eb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <section
      ref={sectionRef}
      className={` px-8 pb-12 bg-white ${
        isMobile
          ? "grid grid-cols-2 gap-4 h-auto"
          : "flex flex-col lg:flex-row justify-between h-auto"
      }`}
    >
      {isMobile ? (
        <>
          {/* Mobile Grid Heading */}
          <h2 className="col-span-2 text-2xl font-light uppercase text-black tracking-wide mb-4">
            Our Latest Drops
          </h2>

          {/* Mobile Grid - only images, no animation */}
          {/* {products.map((prod, index) => (
            <Link
              href={`/products/${prod.handle || ""}`}
              key={prod.handle || index}
            >
              <div className="relative w-full h-48 md:h-[30rem]">
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 via-black/30 to-transparent px-2 py-1">
                  <p className="text-white font-serif text-sm tracking-wide">
                    {prod.title}
                  </p>
                </div>
              </div>
            </Link>
          ))} */}
          {images.map((url, index) => (
            <div className="relative w-full h-48 md:h-[30rem]">
              <img
                src={url}
                alt={`Product ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}

          {/* Paragraph */}
          <div className="mt-2 w-[300px] md:w-[600px] ">
            <p className="text-gray-600 text-sm md:text-2xl mb-4">
              Discover timeless silhouettes, refined textures, and statement
              pieces curated for the modern luxury wardrobe.
            </p>
            <Link href="/products">
              <button className="relative text-black p-1 font-medium group">
                <h2 className=" text-sm md:text-2xl">Discover Collection</h2>
                <span className="absolute left-0 bottom-0 h-[2px] w-1/4 bg-black transition-all duration-500 group-hover:w-full"></span>
                <span className="absolute right-0 bottom-0 h-[2px] w-1/4 bg-black transition-all duration-500 group-hover:w-full"></span>
              </button>
            </Link>
          </div>
        </>
      ) : (
        <>
          {/* Original Layout for md+ screens */}
          {/* Left column */}
          <div className="w-full lg:w-1/2 flex flex-col mb-12 lg:mb-0 lg:pr-12">
            <h2
              ref={textRef}
              className="text-5xl lg:text-5xl uppercase xl:text-6xl font-light leading-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              Our Latest
              <br />
              Drops
            </h2>

            {/* Second image */}
            <div className="ml-22 mt-44 flex justify-end">
              <Link href={`/products/${products[1]?.handle || ""}`}>
                <div
                  ref={secondImgRef}
                  className="relative overflow-hidden"
                  style={{ width: 450, height: 500 }}
                >
                  <img
                    src={
                      products[7]?.image ||
                      "https://plus.unsplash.com/premium_photo-1681223965612-8948231413b6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt="Third Drop"
                    className=" h-full  w-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full  px-4 py-3">
                    <p className="text-white font-serif text-lg tracking-wide">
                      {products[1]?.title}
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Fourth image */}
            <div className="ml-22 mt-48 flex justify-end">
              <Link href={`/products/${products[3]?.handle || ""}`}>
                <div
                  ref={fourthImgRef}
                  className="relative overflow-hidden"
                  style={{ width: 450, height: 500 }}
                >
                  <img
                    src={
                      products[9]?.image ||
                      "https://plus.unsplash.com/premium_photo-1681980021035-5db5823c974b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt="Third Drop"
                    className="object-contain"
                  />
                  <div className="absolute bottom-0 left-0 w-full  px-4 py-3">
                    <p className="text-white font-serif text-lg tracking-wide">
                      {products[3]?.title}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Right column */}

          <div className="w-full lg:w-1/2 flex flex-col justify-start">
            <Link href={`/products/${products[0]?.handle || ""}`}>
              <div
                ref={imgRef}
                className="relative overflow-hidden"
                style={{ width: 450, height: 500 }}
              >
                <img
                  // src={products[0]?.image}
                  src={
                    products[8]?.image ||
                    "https://plus.unsplash.com/premium_photo-1675186049406-3fabe5f387eb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt={products[0]?.alt}
                  className=" h-full w-full "
                />
                <div className="absolute bottom-0 left-0 w-full  px-4 py-3">
                  <p className="text-white font-serif text-lg tracking-wide">
                    {products[0]?.title}
                  </p>
                </div>
              </div>
            </Link>

            {/* Third image */}
            <div className="relative mt-64 p-0">
              <Link href={`/products/${products[2]?.handle || ""}`}>
                <div
                  ref={thirdImgRef}
                  className="relative overflow-hidden"
                  style={{ width: 450, height: 500 }}
                >
                  <img
                    src={
                      products[6]?.image ||
                      "https://plus.unsplash.com/premium_photo-1675186049409-f9f8f60ebb5e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt="Third Drop"
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full  px-4 py-3">
                    <p className="text-white font-serif text-lg tracking-wide">
                      {products[2]?.title}
                    </p>
                  </div>
                </div>
              </Link>

              {/* Paragraph */}
              <div ref={paraRef} className="mt-40 ml-24 w-[350px]">
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

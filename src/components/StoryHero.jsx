"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1597423913719-ad1f2b0e8f44?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/flagged/photo-1553802922-e345434156e6?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1597423913719-ad1f2b0e8f44?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1521334884684-d80222895322?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1484328256245-34b71758c30b?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1484328256245-34b71758c30b?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function StoryHero() {
  const gridContainerRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  // Update window width on resize to enable responsive logic
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Assign background images to each grid block
    const blocks = gsap.utils.toArray(".gridBlock");
    blocks.forEach((block, index) => {
      if (images[index]) {
        block.style.backgroundImage = `url(${images[index]})`;
      }
    });

    // Fade in the center image after it loads
    const bigImg = new Image();
    bigImg.onload = () => {
      gsap.to(".centerBlock.centerPiece", { autoAlpha: 1, duration: 0.5 });
    };
    bigImg.src = images[3];

    // Pin grid on wider screens only, disable on small for better UX
    const pinGrid = windowWidth > 768;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: gridContainerRef.current,
        start: "top top",
        end: () => window.innerHeight * 3.5,
        scrub: true,
        pin: pinGrid,
        anticipatePin: 1,
        // markers: true, // Uncomment for debugging
      },
    });

    tl.set(".centerBlock.centerPiece", { autoAlpha: 1 })
      .set(".gridBlock:not(.centerBlock)", { autoAlpha: 0 })
      .to(
        ".gridBlock:not(.centerBlock)",
        { duration: 0.1, autoAlpha: 1 },
        0.001
      )
      .from(".gridLayer", { scale: 3.3333, ease: "none" });

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [windowWidth]);

  return (
    <section
      aria-label="Story hero photo gallery"
      className="w-full  overflow-hidden"
    >
      {/* Top Heading */}
      <h1 className="header-section text-center text-3xl  pt-8">
        The ultimate sanctuary of curated privilege and unmatched prestige
      </h1>

      {/* Grid Section */}
      <div
        ref={gridContainerRef}
        className="grid-container relative w-screen  h-[100vh]"
      >
        <div className="grid absolute top-0 left-0 w-[60vw] h-[50vw] max-w-[800px] max-h-[650px] mx-[calc(100vw/20*3)] max-[580px]:mx-0 max-[580px]:w-screen max-[580px]:h-[89.444vw]">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="gridLayer absolute top-0 left-0 w-full h-full will-change-transform"
            >
              <div
                className={`gridBlock absolute block opacity-0 ${
                  index === 3 ? "centerBlock centerPiece" : ""
                }`}
                style={getGridBlockStyle(index + 1, windowWidth)}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Responsive grid block positioning styles
function getGridBlockStyle(n, windowWidth) {
  const base = {
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "darkgray",
  };

  if (windowWidth <= 580) {
    // Smaller sizes & positions for mobile viewport widths
    switch (n) {
      case 1:
        return {
          ...base,
          top: "5vw",
          left: "10vw",
          width: "12vw",
          height: "12vw",
        };
      case 2:
        return {
          ...base,
          top: "0",
          left: "16vw",
          width: "18vw",
          height: "18vw",
        };
      case 3:
        return {
          ...base,
          top: "24vw",
          left: "0",
          width: "18vw",
          height: "18vw",
        };
      case 4:
        return {
          ...base,
          top: "17vw",
          left: "18vw",
          width: "38vw",
          height: "38vw",
        };
      case 5:
        return {
          ...base,
          top: "20vw",
          left: "50vw",
          width: "6vw",
          height: "6vw",
          zIndex: 1,
        };
      case 6:
        return {
          ...base,
          top: "27vw",
          left: "50vw",
          width: "25vw",
          height: "25vw",
        };
      case 7:
        return {
          ...base,
          top: "40vw",
          left: "10vw",
          width: "6vw",
          height: "6vw",
        };
      case 8:
        return {
          ...base,
          bottom: "5vw",
          left: "42vw",
          width: "6vw",
          height: "6vw",
        };
      case 9:
        return {
          ...base,
          bottom: "0",
          left: "50vw",
          width: "12vw",
          height: "12vw",
        };
      default:
        return base;
    }
  }

  // Default for larger screen sizes
  switch (n) {
    case 1:
      return { ...base, top: "5vw", left: "20vw", width: "8vw", height: "8vw" };
    case 2:
      return { ...base, top: "0", left: "32vw", width: "12vw", height: "12vw" };
    case 3:
      return { ...base, top: "25vw", left: "0", width: "12vw", height: "12vw" };
    case 4:
      return {
        ...base,
        top: "17vw",
        left: "17vw",
        width: "25vw",
        height: "25vw",
      };
    case 5:
      return {
        ...base,
        top: "20vw",
        left: "50vw",
        width: "4vw",
        height: "4vw",
        zIndex: 1,
      };
    case 6:
      return {
        ...base,
        top: "27vw",
        left: "50vw",
        width: "16vw",
        height: "16vw",
      };
    case 7:
      return {
        ...base,
        top: "42vw",
        left: "10vw",
        width: "4vw",
        height: "4vw",
      };
    case 8:
      return {
        ...base,
        bottom: "5vw",
        left: "42vw",
        width: "4vw",
        height: "4vw",
      };
    case 9:
      return {
        ...base,
        bottom: "0",
        left: "50vw",
        width: "8vw",
        height: "8vw",
      };
    default:
      return base;
  }
}

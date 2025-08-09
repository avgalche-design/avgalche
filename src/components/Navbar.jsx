"use client";
import { useState, useEffect, useRef } from "react";
import { FaUser, FaShoppingBag } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import AnimatedHamburger from "./AnimatedHamburger";
import Dropdown from "./Dropdown";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  // Show/hide navbar on scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // Show black background when not at top
      setIsScrolled(currentScroll > 0);

      if (currentScroll <= 0) {
        setShowNavbar(true); // Always show at top
      } else if (currentScroll > lastScrollY.current) {
        setShowNavbar(false); // scrolling down: hide navbar
      } else if (currentScroll < lastScrollY.current) {
        setShowNavbar(true); // scrolling up: show navbar
      }

      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Allow ESC to close menu
  useEffect(() => {
    if (!menuOpen) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between 
          transition-all duration-300
          ${showNavbar ? "translate-y-0" : "-translate-y-full"} 
          ${
            isScrolled && showNavbar
              ? "bg-black bg-opacity-95 backdrop-blur-md shadow-md"
              : "bg-transparent"
          }
        `}
        style={{ boxSizing: "border-box" }}
      >
        {/* Hamburger Icon */}
        <div className="flex items-center">
          <AnimatedHamburger
            isOpen={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          />
        </div>

        {/* Center: Logo and h1 */}
        <div className="absolute left-0 right-0 mx-auto flex items-center justify-center gap-4 pointer-events-none">
          <img
            src="/logos/GoldPh.png"
            alt="AV GaLche Logo"
            className="h-10 md:h-22 pointer-events-auto"
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Right: Icons */}
        <div className="flex gap-5 items-center ml-auto">
          <button aria-label="Search">
            <FiSearch className="text-white text-xl" />
          </button>
          <button aria-label="Account">
            <FaUser className="text-white text-xl" />
          </button>
          <button aria-label="Cart">
            <FaShoppingBag className="text-white text-xl" />
          </button>
        </div>
      </nav>

      <Dropdown open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

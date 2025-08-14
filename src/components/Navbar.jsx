"use client";
import { useState, useEffect, useRef } from "react";
import { FaUser, FaShoppingBag, FaRegUser } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import AnimatedHamburger from "./AnimatedHamburger";
import Dropdown from "./Dropdown";
import { usePathname } from "next/navigation"; // App Router hook
// If using Pages Router => import { useRouter } from "next/router";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  // Example cart count (replace with your cart state/context)
  const [cartCount, setCartCount] = useState(0);

  const pathname = usePathname(); // Current URL path

  // Show/hide navbar on scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // Show black background when not at top
      setIsScrolled(currentScroll > 0);

      if (currentScroll <= 0) {
        setShowNavbar(true);
      } else if (currentScroll > lastScrollY.current) {
        setShowNavbar(false);
      } else if (currentScroll < lastScrollY.current) {
        setShowNavbar(true);
      }

      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ESC closes menu
  useEffect(() => {
    if (!menuOpen) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [menuOpen]);

  // Logic for showing cart icon
  const shouldShowCart = pathname !== "/" || cartCount > 0;
  const iconColor = isScrolled && showNavbar ? "text-black" : "text-white";
  const barColor = isScrolled && showNavbar ? "black" : "white";

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between 
          transition-all duration-300
          ${showNavbar ? "translate-y-0" : "-translate-y-full"} 
          ${
            isScrolled && showNavbar
              ? "bg-white text-black bg-opacity-95 backdrop-blur-md "
              : "bg-transparent"
          }
        `}
        style={{ boxSizing: "border-box" }}
      >
        {/* Hamburger Icon */}
        <div className=" flex items-center">
          <AnimatedHamburger
            isOpen={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            color={barColor}
          />
        </div>

        {/* Center: Logo */}
        <div className="absolute left-0 right-0 mx-auto flex items-center justify-center gap-4 pointer-events-none">
          <img
            src="/logos/black.png"
            alt="AV GaLche Logo"
            className="h-10 md:h-22 pointer-events-auto"
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Right: Icons */}
        <div className="flex gap-5 items-center ml-auto">
          <button aria-label="Search">
            <FiSearch className={`${iconColor} text-xl`} />
          </button>
          <button aria-label="Account">
            <FaRegUser className={`${iconColor} font-bold text-xl`} />
          </button>

          {/* Cart Icon */}
          {shouldShowCart && (
            <button aria-label="Cart">
              <FaShoppingBag className={`${iconColor} text-xl`} />
              {cartCount > 0 && (
                <span className="ml-1 text-sm text-yellow-400">
                  {cartCount}
                </span>
              )}
            </button>
          )}
        </div>
      </nav>

      <Dropdown open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

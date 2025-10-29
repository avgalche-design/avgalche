"use client";
import { useState, useEffect, useRef } from "react";
import { FaShoppingBag, FaRegUser, FaHeart } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import AnimatedHamburger from "./AnimatedHamburger";
import Dropdown from "./Dropdown";
import { usePathname } from "next/navigation";
import { useCart } from "../app/context/CartContext";
import { useWishlist } from "../app/context/WishlistContext";
import { useSearch } from "../app/context/SearchContext";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const lastScrollY = useRef(0);
  const shopId = "93829235007";

  const { cart, setIsCartOpen } = useCart();
  const { wishlist, setIsWishlistOpen } = useWishlist();
  const { openSearch } = useSearch();
  const cartCount = cart?.lines?.edges?.length || 0;
  const wishlistCount = wishlist.length;
  const pathname = usePathname();

  // ✅ Detect Shopify login status
  useEffect(() => {
    async function checkLoginStatus() {
      try {
        const response = await fetch(
          `https://shopify.com/${shopId}/account/profile`,
          { credentials: "include", mode: "no-cors" }
        );
        // Since Shopify doesn't allow CORS, we can't read the response,
        // but a cached request with cookies will succeed silently for logged-in users.
        // So we fallback to a heuristic approach:
        if (document.cookie.includes("_shopify_s")) {
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error("Shopify auth check failed:", err);
      }
    }

    checkLoginStatus();
  }, []);

  const handleAccountClick = () => {
    const shopId = "93829235007";
    window.location.href = `https://shopify.com/${shopId}/account/profile`;
  };

  // Scroll hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsScrolled(currentScroll > 0);
      if (currentScroll <= 0) setShowNavbar(true);
      else if (currentScroll > lastScrollY.current) setShowNavbar(false);
      else if (currentScroll < lastScrollY.current) setShowNavbar(true);
      lastScrollY.current = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shouldShowCart = pathname !== "/" || cartCount > 0;
  const shouldShowWishlist = wishlistCount > 0;
  const isHome = pathname === "/";
  const iconColor = isHome
    ? isScrolled && showNavbar
      ? "text-black"
      : "text-white"
    : "text-black";

  const hamburgerColor = isHome
    ? isScrolled && showNavbar
      ? "black"
      : "white"
    : "black";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 px-4 py-2 md:px-8 md:py-6 flex items-center justify-between transition-all duration-300
        ${showNavbar ? "translate-y-0" : "-translate-y-full"}
        ${
          isScrolled && showNavbar
            ? "bg-white text-black bg-opacity-95 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center">
          <AnimatedHamburger
            isOpen={menuOpen}
            onClick={() => setMenuOpen((p) => !p)}
            color={hamburgerColor}
          />
        </div>

        <div className="absolute cursor-pointer left-0 right-0 mx-auto flex items-center justify-center gap-4 pointer-events-none">
          <Link href="/">
            <img
              src={
                isHome
                  ? isScrolled && showNavbar
                    ? "/logos/black.png"
                    : "/logos/white.png"
                  : "/logos/black.png"
              }
              alt="Logo"
              className="h-10 md:h-22 pointer-events-auto"
            />
          </Link>
        </div>

        <div className="flex gap-5 items-center ml-auto">
          <button aria-label="Search" onClick={openSearch}>
            <FiSearch
              className={`${iconColor} cursor-pointer text-sm md:text-xl`}
            />
          </button>

          {/* ✅ Dynamic Account Button */}
          <button aria-label="Account" onClick={handleAccountClick}>
            <FaRegUser
              className={`${iconColor} font-bold cursor-pointer text-sm md:text-xl`}
            />
          </button>

          {shouldShowWishlist && (
            <button
              aria-label="Wishlist"
              onClick={() => setIsWishlistOpen(true)}
              className="relative"
            >
              <FaHeart
                className={`${iconColor} text-sm cursor-pointer md:text-xl`}
              />
              <span className="absolute -top-2 -right-2 bg-black/70 text-white rounded-full text-xs px-1">
                {wishlistCount}
              </span>
            </button>
          )}

          {shouldShowCart && (
            <button
              aria-label="Cart"
              onClick={() => setIsCartOpen(true)}
              className="relative"
            >
              <FaShoppingBag
                className={`${iconColor} text-sm cursor-pointer md:text-xl`}
              />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black/70 text-white rounded-full text-xs px-1">
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

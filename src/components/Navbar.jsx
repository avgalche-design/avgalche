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
  const lastScrollY = useRef(0);
  const shopId = "93829235007";
  const returnUrl = encodeURIComponent("https://yourdomain.com/account");
  const loginUrl = `https://shopify.com/${shopId}/account/login?return_url=${returnUrl}`;
  const { cart, setIsCartOpen } = useCart();
  const { wishlist, setIsWishlistOpen } = useWishlist();
  const { openSearch } = useSearch();
  const cartCount = cart?.lines?.edges?.length || 0;
  const wishlistCount = wishlist.length;
  const pathname = usePathname();

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

  const barColor = isScrolled && showNavbar ? "black" : "white";
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
        <div className="flex  items-center">
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
                    ? "/logos/black.png" // scrolled on home: black logo
                    : "/logos/white.png" // initial or hidden navbar on home: white logo
                  : "/logos/black.png" // non-home always black logo
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
          <button
            aria-label="Account"
            onClick={() => (window.location.href = loginUrl)}
          >
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

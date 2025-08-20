"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { useWishlist } from "../app/context/WishlistContext";

const menuData = [
  {
    label: "Maison GaLche",
    key: "home",
    href: "/",
  },
  {
    label: "Gentleman's Collection",
    key: "forHim",
    href: "/category/for-him",
    subItems: [
      {
        label: "Signature T-Shirts",
        href: "/category/t-shirts",
      },
      {
        label: "AV GaLche's Shirts",
        href: "/category/shirts",
      },
      {
        label: "AV GaLche's Polos",
        href: "/category/polos",
      },
      {
        label: "AV GaLche's Co-ord",
        href: "/category/co-ord",
      },
    ],
  },
  {
    label: "Lady GaLche",
    key: "forHer",
    href: "/category/for-her",
    subItems: [
      {
        label: "AV GaLche Women's Shirts",
        href: "/category/womens-shirts",
      },
    ],
  },
  {
    label: "GaLche's Vault of Exclusives",
    key: "vault",
    href: "/category/vault",
  },
  {
    label: "Curated Wishlist",
    key: "wishlist",
    href: "/wishlist",
  },
];

export default function DiorStyleTopDropdown({ open, onClose }) {
  const [expanded, setExpanded] = useState(null);
  const { setIsWishlistOpen } = useWishlist();

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const dropdownVariants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "tween", ease: "easeOut", duration: 0.35 },
    },
    exit: {
      y: "-100%",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  const handleItemClick = (item) => {
    if (item.key === "vault") {
      // Navigate to /story page for "GaLche's Vault of Exclusives"
      window.location.href = "/story";
      onClose();
    } else if (item.key === "wishlist") {
      // Open wishlist modal for "Curated Wishlist"
      setIsWishlistOpen(true);
      onClose();
    } else if (item.href && !item.subItems) {
      // Navigate to the href for regular items
      window.location.href = item.href;
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop with Blur */}
          <motion.div
            className="fixed inset-0 z-40 bg-white/10 backdrop-blur-md"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            onClick={onClose}
          />

          {/* Dropdown Panel */}
          <motion.aside
            className="fixed left-0 top-0 z-50 w-full max-w-sm h-screen bg-white text-black shadow-2xl border-r border-black/10 flex flex-col will-change-transform"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/10 shrink-0">
              <Link href="/" className="text-2xl logo font-serif">
                AV GaLche
              </Link>
              <button
                onClick={onClose}
                className="rounded p-2 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Menu */}
            <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-4">
              {menuData.map((item) => (
                <div key={item.key}>
                  {item.subItems ? (
                    <button
                      className="w-full text-left uppercase tracking-widest text-sm font-light hover:opacity-70 flex justify-between items-center"
                      onClick={() =>
                        setExpanded(expanded === item.key ? null : item.key)
                      }
                    >
                      {item.label}
                      <span
                        className={`transition-transform ${
                          expanded === item.key ? "rotate-45" : ""
                        }`}
                      >
                        +
                      </span>
                    </button>
                  ) : (
                    <button
                      className="block w-full text-left uppercase tracking-widest text-sm font-light hover:opacity-70"
                      onClick={() => handleItemClick(item)}
                    >
                      {item.label}
                    </button>
                  )}

                  {/* Expandable subItems */}
                  <AnimatePresence>
                    {item.subItems && expanded === item.key && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden pl-4 mt-2 space-y-2 text-xs uppercase tracking-wider text-black/70"
                      >
                        {item.subItems.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              className="block hover:text-black cursor-pointer"
                              onClick={() => handleItemClick(sub)}
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Footer with Social Icons */}
            <div className="border-t border-black/10 p-6 flex gap-5 shrink-0">
              <Link href="https://www.instagram.com/av_galche?igsh=MTI3eDZpdXBrbm1xZQ%3D%3D">
                <FaInstagram className="w-5 h-5 cursor-pointer hover:opacity-70" />
              </Link>
              <Link href="https://x.com/avgalche?s=21">
                <FaXTwitter className="w-5 h-5 cursor-pointer hover:opacity-70" />
              </Link>
              <FaFacebookF className="w-5 h-5 cursor-pointer hover:opacity-70" />
              {/* <FaSnapchatGhost className="hover:text-black cursor-pointer" /> */}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

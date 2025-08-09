"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // install framer-motion if not already

// MENU DATA (structure matches your image)
const menuData = [
  {
    label: "Home",
    key: "home",
  },
  {
    label: "For Him",
    key: "forHim",
    subItems: [
      "AV GaLche's T-Shirts",
      "AV GaLche's Shirts",
      "AV GaLche's Polos",
      "AV GaLche's Co-ord",
    ],
  },
  {
    label: "For Her",
    key: "forHer",
    subItems: ["AV GaLche Women's Shirts"],
  },
  {
    label: "Explore GaLche’s Vault",
    key: "vault",
  },
  {
    label: "My wishlist",
    key: "wishlist",
  },
];

export default function Dropdown({ open, onClose }) {
  const [selected, setSelected] = useState(null);

  // Animation variants for smooth in/out
  const dropdownVariants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: "easeInOut" },
    },
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 bg-[#0a0a09] bg-opacity-90"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={dropdownVariants}
        >
          <div className="flex h-full w-full pt-28 px-10">
            {/* Main menu */}
            <ul className="flex flex-col gap-7 text-white font-branch text-2xl font-light w-60">
              {menuData.map((item, idx) => (
                <li key={item.key}>
                  <button
                    className={`text-left w-full hover:font-semibold transition-all pointer-events-auto ${
                      item.key === selected ? "font-semibold" : ""
                    }`}
                    onClick={() => setSelected(item.subItems ? item.key : null)}
                  >
                    {item.label}
                  </button>
                  {/* Underline active with a bar */}
                  {item.subItems && item.key === selected && (
                    <span className="block h-0.5 bg-white w-8 mt-1 rounded-full"></span>
                  )}
                </li>
              ))}
            </ul>
            {/* Sub menu (right) */}
            <div className="ml-12 flex-1 flex items-start">
              {menuData.map((item) =>
                item.subItems && item.key === selected ? (
                  <motion.ul
                    key={item.key}
                    className="flex flex-col gap-5 text-lg text-white"
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 40, opacity: 0 }}
                  >
                    {item.subItems.map((sub) => (
                      <li
                        key={sub}
                        className="hover:font-medium transition-all pointer-events-auto"
                      >
                        {sub}
                      </li>
                    ))}
                  </motion.ul>
                ) : null
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

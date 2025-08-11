// "use client";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion"; // install framer-motion if not already

// // MENU DATA (structure matches your image)
// const menuData = [
//   {
//     label: "Home",
//     key: "home",
//   },
//   {
//     label: "For Him",
//     key: "forHim",
//     subItems: [
//       "AV GaLche's T-Shirts",
//       "AV GaLche's Shirts",
//       "AV GaLche's Polos",
//       "AV GaLche's Co-ord",
//     ],
//   },
//   {
//     label: "For Her",
//     key: "forHer",
//     subItems: ["AV GaLche Women's Shirts"],
//   },
//   {
//     label: "Explore GaLche’s Vault",
//     key: "vault",
//   },
//   {
//     label: "My wishlist",
//     key: "wishlist",
//   },
// ];

// export default function Dropdown({ open, onClose }) {
//   const [selected, setSelected] = useState(null);

//   // Animation variants for smooth in/out
//   const dropdownVariants = {
//     hidden: { y: "-100%", opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { duration: 0.35, ease: "easeInOut" },
//     },
//   };

//   return (
//     <AnimatePresence>
//       {open && (
//         <motion.div
//           className="fixed inset-0 z-40 bg-[#0a0a09] bg-opacity-90"
//           initial="hidden"
//           animate="visible"
//           exit="hidden"
//           variants={dropdownVariants}
//         >
//           <div className="flex h-full w-full pt-28 px-10">
//             {/* Main menu */}
//             <ul className="flex flex-col gap-7 text-white font-branch text-2xl font-light w-60">
//               {menuData.map((item, idx) => (
//                 <li key={item.key}>
//                   <button
//                     className={`text-left w-full hover:font-semibold transition-all pointer-events-auto ${
//                       item.key === selected ? "font-semibold" : ""
//                     }`}
//                     onClick={() => setSelected(item.subItems ? item.key : null)}
//                   >
//                     {item.label}
//                   </button>
//                   {/* Underline active with a bar */}
//                   {item.subItems && item.key === selected && (
//                     <span className="block h-0.5 bg-white w-8 mt-1 rounded-full"></span>
//                   )}
//                 </li>
//               ))}
//             </ul>
//             {/* Sub menu (right) */}
//             <div className="ml-12 flex-1 flex items-start">
//               {menuData.map((item) =>
//                 item.subItems && item.key === selected ? (
//                   <motion.ul
//                     key={item.key}
//                     className="flex flex-col gap-5 text-lg text-white"
//                     initial={{ x: 40, opacity: 0 }}
//                     animate={{ x: 0, opacity: 1 }}
//                     exit={{ x: 40, opacity: 0 }}
//                   >
//                     {item.subItems.map((sub) => (
//                       <li
//                         key={sub}
//                         className="hover:font-medium transition-all pointer-events-auto"
//                       >
//                         {sub}
//                       </li>
//                     ))}
//                   </motion.ul>
//                 ) : null
//               )}
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// MENU DATA (your structure preserved)
const menuData = [
  {
    label: "Maison GaLche", // Instead of "Home" — feels like a luxury house/brand home
    key: "home",
  },
  {
    label: "Gentleman’s Collection", // Instead of "For Him"
    key: "forHim",
    subItems: [
      "Signature T-Shirts",
      "Tailored Shirts",
      "Heritage Polos",
      "Co-ord Ensembles", // Instead of just Co-ord
    ],
  },
  {
    label: "Lady GaLche", // Instead of "For Her" — feels premium and brand-centric
    key: "forHer",
    subItems: [
      "Couture Shirts", // Instead of "Women's Shirts"
    ],
  },
  {
    label: "GaLche’s Vault of Exclusives", // Instead of "Explore GaLche’s Vault"
    key: "vault",
  },
  {
    label: "Curated Wishlist", // Instead of "My wishlist"
    key: "wishlist",
  },
];

export default function DiorStyleSidebar({ open, onClose }) {
  const [selected, setSelected] = useState(null);
  const sidebarRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const sidebarVariants = {
    hidden: { x: -320, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: { x: -320, opacity: 0, transition: { duration: 0.18 } },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: 0.05 * i },
    }),
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/70"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            onClick={onClose}
          />
          {/* Sidebar */}
          <motion.aside
            className="fixed left-0 top-0 z-50 h-full w-[320px] max-w-[90vw] bg-[#0b0b0b] text-white shadow-2xl flex flex-col"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sidebarVariants}
            ref={sidebarRef}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="text-xl font-serif tracking-wide">GaLche</div>
              <button
                onClick={onClose}
                className="rounded p-2 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Menu */}
            <div className="flex flex-1 overflow-hidden">
              {/* Main menu */}
              <nav className="w-40 p-6 flex flex-col gap-6 overflow-y-auto">
                {menuData.map((item, idx) => (
                  <motion.button
                    key={item.key}
                    className={`text-left uppercase tracking-widest text-sm hover:opacity-80 ${
                      item.key === selected ? "font-semibold" : "font-light"
                    }`}
                    custom={idx}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                    onClick={() => setSelected(item.subItems ? item.key : null)}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>

              {/* Submenu */}
              <div className="flex-1 p-6 overflow-y-auto">
                {menuData.map(
                  (item) =>
                    item.subItems &&
                    item.key === selected && (
                      <motion.ul
                        key={item.key}
                        className="flex flex-col gap-4 text-sm uppercase tracking-wider"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 20, opacity: 0 }}
                      >
                        {item.subItems.map((sub) => (
                          <li
                            key={sub}
                            className="hover:opacity-80 cursor-pointer"
                          >
                            {sub}
                          </li>
                        ))}
                      </motion.ul>
                    )
                )}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

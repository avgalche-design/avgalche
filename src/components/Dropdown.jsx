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

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Instagram, Facebook, Twitter } from "lucide-react";

const menuData = [
  { label: "Maison GaLche", key: "home" },
  {
    label: "Gentleman’s Collection",
    key: "forHim",
    subItems: [
      "Signature T-Shirts",
      "Tailored Shirts",
      "Heritage Polos",
      "Co-ord Ensembles",
    ],
  },
  {
    label: "Lady GaLche",
    key: "forHer",
    subItems: ["Couture Shirts"],
  },
  { label: "GaLche’s Vault of Exclusives", key: "vault" },
  { label: "Curated Wishlist", key: "wishlist" },
];

export default function DiorStyleTopDropdown({ open, onClose }) {
  const [expanded, setExpanded] = useState(null);

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
      transition: { type: "spring", stiffness: 80, damping: 20 },
    },
    exit: {
      y: "-100%",
      opacity: 0,
      transition: { duration: 0.3 },
    },
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
            className="fixed left-0 top-0 z-50 w-full max-w-sm h-screen bg-white text-black shadow-2xl border-r border-black/10 flex flex-col"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
              <div className="text-2xl logo font-serif ">AV GaLche</div>
              <button
                onClick={onClose}
                className="rounded p-2 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Menu */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {menuData.map((item) => (
                <div key={item.key}>
                  <button
                    className="w-full text-left uppercase tracking-widest text-sm font-light hover:opacity-70 flex justify-between items-center"
                    onClick={() =>
                      setExpanded(expanded === item.key ? null : item.key)
                    }
                  >
                    {item.label}
                    {item.subItems && (
                      <span
                        className={`transition-transform ${
                          expanded === item.key ? "rotate-45" : ""
                        }`}
                      >
                        +
                      </span>
                    )}
                  </button>

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
                          <li
                            key={sub}
                            className="hover:text-black cursor-pointer"
                          >
                            {sub}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Footer with Social Icons */}
            <div className="border-t border-black/10 p-6 flex gap-5">
              <Instagram className="w-5 h-5 cursor-pointer hover:opacity-70" />
              <Facebook className="w-5 h-5 cursor-pointer hover:opacity-70" />
              <Twitter className="w-5 h-5 cursor-pointer hover:opacity-70" />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

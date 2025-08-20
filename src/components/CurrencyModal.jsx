"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCurrency } from "../app/context/CurrencyContext";

export default function CurrencyModal() {
  const {
    isCurrencyModalOpen,
    setIsCurrencyModalOpen,
    supportedRegions,
    selectedCurrency,
    setSelectedCurrency,
  } = useCurrency();

  if (!isCurrencyModalOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={() => setIsCurrencyModalOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "tween", duration: 0.2 }}
          className="bg-white text-black w-full max-w-md rounded-xl shadow-2xl p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-light tracking-[0.1em] mb-4">
            Select your country/region
          </h2>
          <p className="text-sm text-black/70 mb-6">
            Prices will be shown in your selected currency.
          </p>
          <div className="space-y-2">
            {supportedRegions.map((r) => (
              <button
                key={r.key}
                onClick={() => {
                  setSelectedCurrency(r.currency);
                  setIsCurrencyModalOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded border transition-colors ${
                  selectedCurrency === r.currency
                    ? "border-black bg-black text-white"
                    : "border-black/10 hover:border-black/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">{r.label}</span>
                  <span className="text-xs text-black/60">{r.currency}</span>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setIsCurrencyModalOpen(false)}
              className="px-4 py-2 text-sm border border-black/20 rounded hover:bg-black/5"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}



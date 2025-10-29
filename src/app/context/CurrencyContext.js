"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CurrencyContext = createContext({
  selectedCurrency: "INR",
  setSelectedCurrency: () => {},
  isCurrencyModalOpen: false,
  setIsCurrencyModalOpen: () => {},
  convert: (_amount, _from) => 0,
  format: (_amount, _from) => "",
  supportedRegions: [],
});

// Approximate exchange rates: INR per 1 unit of foreign currency
// Update periodically or replace with a live rates API if needed.
const INR_PER_UNIT = {
  INR: 1,
  USD: 83.0,
  GBP: 105.0,
  CAD: 61.0,
  AED: 22.6,
};

const CURRENCY_SYMBOL = {
  INR: "₹",
  USD: "$",
  GBP: "£",
  CAD: "CA$",
  AED: "AED",
};

const REGIONS = [
  { key: "INR", label: "India (English)", currency: "INR" },
  { key: "USD", label: "United States (English)", currency: "USD" },
  { key: "GBP", label: "United Kingdom (English)", currency: "GBP" },
  { key: "CAD", label: "Canada (English)", currency: "CAD" },
  { key: "AED", label: "United Arab Emirates (English)", currency: "AED" },
];

export function CurrencyProvider({ children }) {
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);

  // Load persisted preference; if none, ask on first visit
  useEffect(() => {
    try {
      const saved = localStorage.getItem("avgalche.currency");
      if (saved) {
        setSelectedCurrency(saved);
      } else {
        setIsCurrencyModalOpen(true);
      }
    } catch {}
  }, []);

  const setAndPersistCurrency = (currencyCode) => {
    setSelectedCurrency(currencyCode);
    try {
      localStorage.setItem("avgalche.currency", currencyCode);
    } catch {}
  };

  const convert = (amount, fromCurrencyCode) => {
    const from = fromCurrencyCode || "INR";
    const to = selectedCurrency || "INR";
    if (!amount || isNaN(parseFloat(amount))) return 0;
    if (from === to) return parseFloat(amount);
    const inrPerFrom = INR_PER_UNIT[from] ?? 1;
    const inrPerTo = INR_PER_UNIT[to] ?? 1;
    const amountInINR = parseFloat(amount) * inrPerFrom;
    const converted = amountInINR / inrPerTo;
    return converted;
  };

  const format = (amount, fromCurrencyCode, options = {}) => {
    const value = convert(amount, fromCurrencyCode);
    const currency = selectedCurrency;
    const symbol = CURRENCY_SYMBOL[currency] || currency;
    const fractionDigits = options.minimumFractionDigits ?? 2;
    return `${symbol} ${value.toFixed(fractionDigits)}`;
  };

  const value = useMemo(
    () => ({
      selectedCurrency,
      setSelectedCurrency: setAndPersistCurrency,
      isCurrencyModalOpen,
      setIsCurrencyModalOpen,
      convert,
      format,
      supportedRegions: REGIONS,
    }),
    [selectedCurrency, isCurrencyModalOpen]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

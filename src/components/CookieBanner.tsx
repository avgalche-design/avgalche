"use client";

import { useState, useEffect } from "react";
import { setConsentCookie, getConsentCookie } from "@/lib/cookies";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (!getConsentCookie()) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    setConsentCookie("accepted");
    setShowBanner(false);
  };

  const handleReject = () => {
    setConsentCookie("rejected");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white text-gray-900 border-t border-gray-300 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-sm sm:text-base text-center sm:text-left leading-snug">
          <span className="font-semibold text-gray-800">
            We value your privacy.
          </span>{" "}
          We use cookies to enhance your experience. You can accept or reject
          them.
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleReject}
            className="px-5 py-2 rounded-md border border-gray-400 text-gray-600 
                       hover:bg-gray-100 transition-colors text-sm font-medium"
          >
            <h2>Reject</h2>
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2 rounded-md  bg-gray-900 text-white 
                       shadow hover:bg-gray-700 transition-colors text-sm"
          >
            <h3>Accept</h3>
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FaTimes,
  FaCrown,
  FaGem,
  FaStar,
  FaHandSparkles,
  FaLock,
} from "react-icons/fa";

export default function TierModal({ isOpen, onClose, tiers }) {
  const [userSpending, setUserSpending] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [customerInfo, setCustomerInfo] = useState(null);

  // Shopify login configuration (same as Navbar)
  const shopId = "93829235007";
  const returnUrl = encodeURIComponent("https://avgalche.com/account");
  const loginUrl = `https://shopify.com/${shopId}/account/login?return_url=${returnUrl}`;

  useEffect(() => {
    const fetchCustomerSpending = async () => {
      try {
        setIsLoading(true);

        // For now, we'll use a mock email - in a real implementation,
        // you'd get this from the logged-in user's session
        const mockEmail = "test@example.com"; // Replace with your real email that has orders in Shopify

        const response = await fetch(
          `/api/customer-spending?email=${encodeURIComponent(mockEmail)}`
        );
        const data = await response.json();

        console.log("Customer spending API response:", data); // Debug log

        if (data.error) {
          console.error("Error fetching customer spending:", data.error);
          // Fallback to mock data if API fails
          setUserSpending(Math.floor(Math.random() * 500000));
        } else {
          console.log("Setting user spending to:", data.totalSpent);
          setUserSpending(data.totalSpent || 0);
          setCustomerInfo(data.customer);
        }
      } catch (error) {
        console.error("Error fetching customer spending:", error);
        // Fallback to mock data if API fails
        setUserSpending(Math.floor(Math.random() * 500000));
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchCustomerSpending();
    }
  }, [isOpen]);

  const getCurrentTier = () => {
    if (!tiers || tiers.length === 0) return null;

    // Find the highest tier the user qualifies for
    for (let i = tiers.length - 1; i >= 0; i--) {
      const threshold = parseInt(tiers[i].threshold.replace(/[^\d]/g, ""));
      if (userSpending >= threshold) {
        return { ...tiers[i], index: i };
      }
    }

    // If user doesn't qualify for any tier, return null
    return null;
  };

  const getNextTier = () => {
    const currentTier = getCurrentTier();
    if (!currentTier || currentTier.index === tiers.length - 1) return null;

    return { ...tiers[currentTier.index + 1], index: currentTier.index + 1 };
  };

  const getProgressToNextTier = () => {
    const currentTier = getCurrentTier();
    const nextTier = getNextTier();

    if (!currentTier || !nextTier) return 0;

    const currentThreshold = parseInt(
      currentTier.threshold.replace(/[^\d]/g, "")
    );
    const nextThreshold = parseInt(nextTier.threshold.replace(/[^\d]/g, ""));

    const progress =
      ((userSpending - currentThreshold) / (nextThreshold - currentThreshold)) *
      100;
    return Math.min(100, Math.max(0, progress));
  };

  const getTierIcon = (tierName) => {
    switch (tierName) {
      case "Elan Privé":
        return <FaStar className="w-8 h-8 text-yellow-500" />;
      case "Argent Privé":
        return <FaCrown className="w-8 h-8 text-gray-600" />;
      case "Apex Privé":
        return <FaGem className="w-8 h-8 text-purple-500" />;
      case "Aurum Privé":
        return <FaHandSparkles className="w-8 h-8 text-yellow-400" />;
      default:
        return <FaLock className="w-8 h-8 text-gray-400" />;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-[9999] p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white text-black rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold">Your Vault Status</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                <span className="ml-3 text-gray-600">
                  Loading your status...
                </span>
              </div>
            ) : (
              <>
                {/* Current Spending */}
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <h3 className="text-lg font-semibold mb-2">Total Spending</h3>
                  <p className="text-3xl font-bold text-black">
                    {formatCurrency(userSpending)}
                  </p>
                  {customerInfo && (
                    <p className="text-sm text-gray-600 mt-2">
                      Welcome back, {customerInfo.firstName || "Customer"}!
                    </p>
                  )}
                </div>

                {/* Current Tier */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Current Tier</h3>
                  {getCurrentTier() ? (
                    <div className="p-4 border border-gray-200 rounded-xl">
                      <div className="flex items-center gap-4">
                        {getTierIcon(getCurrentTier().name)}
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold">
                            {getCurrentTier().name}
                          </h4>
                          <p className="text-gray-600">
                            {getCurrentTier().subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 border border-gray-200 rounded-xl text-center">
                      <p className="text-gray-600">
                        You haven't reached any tier yet.
                      </p>
                    </div>
                  )}
                </div>

                {/* Next Tier Progress */}
                {getNextTier() && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Progress to Next Tier
                    </h3>
                    <div className="p-4 border border-gray-200 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                          {getNextTier().name}
                        </span>
                        <span className="text-sm text-gray-600">
                          {formatCurrency(
                            parseInt(
                              getNextTier().threshold.replace(/[^\d]/g, "")
                            )
                          )}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${getProgressToNextTier()}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between text-xs text-gray-600">
                        <span>{formatCurrency(userSpending)}</span>
                        <span>
                          {formatCurrency(
                            parseInt(
                              getNextTier().threshold.replace(/[^\d]/g, "")
                            )
                          )}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mt-2">
                        {formatCurrency(
                          parseInt(
                            getNextTier().threshold.replace(/[^\d]/g, "")
                          ) - userSpending
                        )}{" "}
                        more to unlock {getNextTier().name}
                      </p>
                    </div>
                  </div>
                )}

                {/* All Tiers Overview */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">All Tiers</h3>
                  <div className="space-y-3">
                    {tiers.map((tier, index) => {
                      const threshold = parseInt(
                        tier.threshold.replace(/[^\d]/g, "")
                      );
                      const isUnlocked = userSpending >= threshold;
                      const isCurrent = getCurrentTier()?.name === tier.name;

                      return (
                        <div
                          key={tier.name}
                          className={`p-3 border rounded-lg transition-all ${
                            isCurrent
                              ? "border-yellow-400 bg-yellow-50"
                              : isUnlocked
                              ? "border-green-400 bg-green-50"
                              : "border-gray-200 bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {getTierIcon(tier.name)}
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{tier.name}</h4>
                                {isCurrent && (
                                  <span className="text-xs bg-yellow-400 text-black px-2 py-1 rounded-full">
                                    Current
                                  </span>
                                )}
                                {isUnlocked && !isCurrent && (
                                  <span className="text-xs bg-green-400 text-white px-2 py-1 rounded-full">
                                    Unlocked
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">
                                {tier.threshold}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6">
            <button
              onClick={onClose}
              className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

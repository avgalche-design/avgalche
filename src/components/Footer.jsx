"use client";
// components/Footer.tsx
import Link from "next/link";
import { useCurrency } from "../app/context/CurrencyContext";
import { FaInstagram, FaFacebookF, FaSnapchatGhost } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiPhone, FiMail } from "react-icons/fi";
import { useState } from "react";

export default function Footer() {
  const { selectedCurrency, supportedRegions, setIsCurrencyModalOpen } =
    useCurrency();

  const selectedLabel =
    supportedRegions.find((r) => r.currency === selectedCurrency)?.label ||
    "Select Region";
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // simple regex
  };

  const handleSubmit = async () => {
    if (!isValidEmail(email)) return;
    setIsSubmitting(true);
    setStatus("");

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzuC2xIC4ybFVOZqVOqVywsP8Kdj70co2sALhOoHaTQAWt-MK-K2T6gESf0hv9_RUzO/exec",
        {
          method: "POST",
          mode: "no-cors", // allows sending without CORS issues
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ email }),
        }
      );
      setStatus("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong. Try again!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-white text-black px-6 py-10">
      {/* Premium Newsletter Section */}
      <section className="border-t border-black/10 py-12 md:pt-8 md:pb-16 bg-white backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-extralight tracking-[0.05em] text-black">
                Stay Connected
              </h2>
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-black/40 to-transparent mx-auto"></div>
              <p className="text-neutral-600 text-base leading-[1.8] font-extralight tracking-[0.02em] max-w-2xl mx-auto">
                Be the first to discover new collections, exclusive pieces, and
                private events. Join our inner circle.
              </p>
            </div>

            <div className="pt-8">
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 bg-black/5 border border-black/20 text-black placeholder-black/40 text-sm font-extralight tracking-wide focus:outline-none focus:border-black/60 focus:bg-black/10 transition-all duration-300 backdrop-blur-sm"
                />
                <button
                  disabled={!isValidEmail(email) || isSubmitting}
                  onClick={handleSubmit}
                  className={`relative px-8 py-4 text-xs uppercase tracking-[0.2em] font-light transition-all duration-300 group overflow-hidden 
                  ${
                    isValidEmail(email)
                      ? "bg-black text-white hover:bg-neutral-800"
                      : "bg-black/30 text-white cursor-not-allowed"
                  }`}
                >
                  <span className="relative z-10">
                    {isSubmitting ? "..." : "Subscribe"}
                  </span>
                  {isValidEmail(email) && !isSubmitting && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  )}
                </button>
              </div>
              {status && (
                <p className="mt-4 text-sm border   border-black/70 md:w-1/3 p-2 mx-auto rounded-md text-black/70">
                  {status}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto">
        {/* Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm">
          {/* support */}
          <div>
            <h3 className="font-serif text-lg mb-3">AV GaLche Support</h3>
            <ul className="space-y-1 text-gray-700">
              <li className="flex items-center hover:underline gap-2">
                <FiPhone className="text-gray-500" />
                +91 88517 60427
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="text-gray-500 flex-shrink-0" />
                <a
                  href="mailto:support@avgalche.com"
                  className="text-gray-700 hover:underline"
                >
                  <span className="hidden md:inline">support@avgalche.com</span>
                  <span className="md:hidden">support</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Client Services */}
          <div>
            <h3 className="font-serif text-lg mb-3">AV GaLche Concierge</h3>
            <ul className="space-y-1 text-gray-700">
              <li>
                <a
                  href="https://api.whatsapp.com/send?phone=918851760427&text=Good%20day%2C%20AV%20GaLche%20Concierge.%20I%20would%20like%20to%20explore%20your%20exclusive%20collection%20and%20discover%20pieces%20tailored%20to%20my%20style.%20Could%20you%20kindly%20assist%20me%20with%20a%20private%20consultation%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" hover:underline transition-colors duration-300"
                >
                  Contact on Whatsapp
                </a>
              </li>

              <li>FAQ</li>
              <li>Return & Refund</li>
            </ul>
          </div>

          {/* House of AV GaLche */}
          <div>
            <h3 className="font-serif text-lg mb-3">The AV GaLche Atelier</h3>
            <ul className="space-y-1 text-gray-700">
              <Link href="/story">
                <li className=" hover:underline">GaLche's Vault</li>
              </Link>

              <Link href="/products">
                <li className=" hover:underline">Discover More</li>
              </Link>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-serif text-lg mb-3">Legal & Policies</h3>
            <ul className="space-y-1 text-gray-700">
              <li>Shipping Policy</li>
              <li>
                <Link href="/privacy-policy" className="hover:underline">
                  Privacy Notice
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="hover:underline">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-300 pt-6">
          {/* Social Icons */}
          <div className="flex gap-4 text-lg text-gray-500">
            <Link href="https://www.instagram.com/av_galche?igsh=MTI3eDZpdXBrbm1xZQ%3D%3D">
              <FaInstagram className="hover:text-black cursor-pointer" />
            </Link>
            <Link href="https://x.com/avgalche?s=21">
              <FaXTwitter className="hover:text-black cursor-pointer" />
            </Link>
            <FaFacebookF className="hover:text-black cursor-pointer" />

            <FaSnapchatGhost className="hover:text-black cursor-pointer" />
          </div>

          {/* Logo */}
          <div>
            <h1 className="text-[black] logo text-xl md:text-4xl font-serif pointer-events-auto">
              AV GaLche
            </h1>
          </div>

          {/* Country */}
          <button
            className="text-sm text-gray-600 hover:text-black"
            onClick={() => setIsCurrencyModalOpen(true)}
          >
            Country / Region{" "}
            <span className="font-medium text-black">{selectedLabel}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

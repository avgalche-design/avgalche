// components/Footer.tsx
import {
  FaTiktok,
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
  FaSnapchatGhost,
  FaLinkedinIn,
  FaPodcast,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiPhone, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-white text-black px-6 py-10">
      {/* Premium Newsletter Section */}
      <section className="border-t border-black/10 py-12 md:pt-8 md:pb-16 bg-white backdrop-blur-sm ">
        <div className="max-w-4xl mx-auto text-center  px-6">
          <div className="  space-y-8">
            <div className="  space-y-6">
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
                  className="flex-1 px-6 py-4 bg-black/5 border border-black/20 text-black placeholder-black/40 text-sm font-extralight tracking-wide focus:outline-none focus:border-black/60 focus:bg-black/10 transition-all duration-300 backdrop-blur-sm"
                />
                <button className="relative bg-black text-white px-8 py-4 text-xs uppercase tracking-[0.2em] font-light hover:bg-neutral-800 transition-all duration-300 group overflow-hidden">
                  <span className="relative z-10">Subscribe</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </button>
              </div>
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
              <li className="flex items-center gap-2">
                <FiPhone className="text-gray-500" />
                +91 88517 60427
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="text-gray-500" />
                support@avgalche.com
              </li>
            </ul>
          </div>

          {/* Client Services */}
          <div>
            <h3 className="font-serif text-lg mb-3">AV GaLche Concierge</h3>
            <ul className="space-y-1 text-gray-700">
              <li>Contact</li>
              <li>FAQ</li>
              <li>Return & Refund</li>
            </ul>
          </div>

          {/* House of AV GaLche */}
          <div>
            <h3 className="font-serif text-lg mb-3">The AV GaLche Atelier</h3>
            <ul className="space-y-1 text-gray-700">
              <li>About Us</li>
              <li>Discover More</li>
              <li>Careers</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-serif text-lg mb-3">Legal & Policies</h3>
            <ul className="space-y-1 text-gray-700">
              <li>Shipping Policy</li>
              <li>Privacy Notice</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-300 pt-6">
          {/* Social Icons */}
          <div className="flex gap-4 text-lg text-gray-500">
            <FaInstagram className="hover:text-black cursor-pointer" />
            <FaXTwitter className="hover:text-black cursor-pointer" />
            <FaFacebookF className="hover:text-black cursor-pointer" />
            <FaPinterestP className="hover:text-black cursor-pointer" />
            <FaSnapchatGhost className="hover:text-black cursor-pointer" />
            <FaLinkedinIn className="hover:text-black cursor-pointer" />
          </div>

          {/* Logo */}
          <div>
            <h1 className="text-[black] logo text-xl md:text-4xl font-serif pointer-events-auto">
              AV GaLche
            </h1>
          </div>

          {/* Country */}
          <div className="text-sm text-gray-600">
            Country / Region{" "}
            <span className="font-medium text-black">India (English)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

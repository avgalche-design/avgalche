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

export default function Footer() {
  return (
    <footer className="bg-[#0A0A09] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter */}
        <div className="mb-10">
          <p className="text-lg font-light mb-4">
            Inspire me with all the latest AV GaLche news
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md">
            <input
              type="email"
              placeholder="* E-mail"
              className="flex-1 bg-[#0A0A09] border border-gray-500 px-4 py-2 rounded text-white placeholder-gray-400 focus:outline-none"
            />
            <button className="bg-gray-200 text-black px-6 py-2 rounded hover:bg-white transition-colors">
              Confirm
            </button>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm">
          {/* Boutiques */}
          <div>
            <h3 className="font-serif text-lg mb-3">AV GaLche Boutiques</h3>
            <ul className="space-y-1 text-gray-300">
              <li>AV GaLche Couture</li>
              <li>Parfums AV GaLche</li>
            </ul>
          </div>

          {/* Client Services */}
          <div>
            <h3 className="font-serif text-lg mb-3">Client Services</h3>
            <ul className="space-y-1 text-gray-300">
              <li>Contact</li>
              <li>FAQ</li>
            </ul>
          </div>

          {/* House of AV GaLche */}
          <div>
            <h3 className="font-serif text-lg mb-3">The House Of AV GaLche</h3>
            <ul className="space-y-1 text-gray-300">
              <li>AV GaLche Sustainability</li>
              <li>Ethics & Compliance</li>
              <li>Careers</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-serif text-lg mb-3">Legal Terms</h3>
            <ul className="space-y-1 text-gray-300">
              <li>Legal Terms</li>
              <li>Privacy Notice</li>
              <li>Sitemap</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-[#a4a4a7] pt-6">
          {/* Social Icons */}
          <div className="flex gap-4 text-lg text-gray-400">
            <FaTiktok className="hover:text-white cursor-pointer" />
            <FaInstagram className="hover:text-white cursor-pointer" />
            <FaXTwitter className="hover:text-white cursor-pointer" />
            <FaFacebookF className="hover:text-white cursor-pointer" />
            <FaPinterestP className="hover:text-white cursor-pointer" />
            <FaSnapchatGhost className="hover:text-white cursor-pointer" />
            <FaLinkedinIn className="hover:text-white cursor-pointer" />
            <FaPodcast className="hover:text-white cursor-pointer" />
          </div>

          {/* Logo */}
          <div>
            <h1 className="text-[white] text-xl md:text-4xl font-serif pointer-events-auto">
              AV GaLche
            </h1>
          </div>

          {/* Country */}
          <div className="text-sm text-gray-400">
            Country / Region{" "}
            <span className="font-medium text-white">India (English)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

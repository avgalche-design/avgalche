import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { SearchProvider } from "./context/SearchContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import CartModal from "../components/CartModal";
import WishlistModal from "../components/WishlistModal";
import SearchModal from "../components/SearchModal";
import CurrencyModal from "../components/CurrencyModal";
import Clarity from "@/components/Clairty";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AV GaLche - Timeless Stories Tailored for You",
  description:
    "Founded by Gurvansh Singh Bhatia & Aashman Mahajan, AV GaLche is redefining Indian luxury with timeless designs inspired by real stories, heritage, and sophistication.",
  keywords: [
    "AV GaLche",
    "luxury fashion India",
    "Indian luxury brand",
    "heritage fashion",
    "timeless design",
    "sophisticated clothing",
  ],
  openGraph: {
    type: "website",
    url: "https://www.avgalche.com",
    title: "AV GaLche - Luxury Fashion from India",
    description:
      "Discover refined elegance and timeless heritage with AV GaLche, India’s first true global luxury fashion house.",
    siteName: "AV GaLche",
    images: [
      {
        url: "https://www.avgalche.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AV GaLche Luxury Fashion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AVGaLche",
    title: "AV GaLche - Timeless Indian Luxury",
    description:
      "AV GaLche crafts global luxury fashion from India, blending old-school classics with modern refinement.",
    images: "https://www.avgalche.com/og-image.jpg",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AV GaLche",
    url: "https://www.avgalche.com",
    logo: "https://www.avgalche.com/logo.png",
    founders: [
      { "@type": "Person", name: "Gurvansh Singh Bhatia" },
      { "@type": "Person", name: "Aashman Mahajan" },
    ],
    foundingDate: "2023",
    foundingLocation: "India",
    sameAs: [
      "https://instagram.com/avgalche",
      "https://linkedin.com/company/avgalche",
      "https://twitter.com/AVGaLche",
    ],
    description:
      "AV GaLche is India’s first true global luxury fashion house, celebrating heritage, authenticity, and timeless elegance.",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AV GaLche",
    url: "https://www.avgalche.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.avgalche.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.avgalche.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Collections",
        item: "https://www.avgalche.com/collections",
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbsSchema),
          }}
        />
      </head>
      <body className={inter.className}>
        <Clarity />
        <CartProvider>
          <WishlistProvider>
            <SearchProvider>
              <CurrencyProvider>
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
                <CartModal />
                <WishlistModal />
                <SearchModal />
                <CurrencyModal />
              </CurrencyProvider>
            </SearchProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}

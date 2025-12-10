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
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AV GaLche - Timeless Stories Tailored for You",
  description:
    "Founded by Gurvansh Singh Bhatia & Aashman Mahajan, AV GaLche is redefining Indian Premium Clothing with timeless designs inspired by real stories, heritage, and sophistication.",
  keywords: [
    "AV GaLche",
    "Premium Clothing fashion India",
    "Indian Premium Clothing brand",
    "heritage fashion",
    "timeless design",
    "sophisticated clothing",
  ],
  openGraph: {
    type: "website",
    url: "https://www.avgalche.com",
    title: "AV GaLche - Premium Clothing Fashion from India",
    description:
      "Discover refined elegance and timeless heritage with AV GaLche, India’s first true global Premium Clothing fashion house.",
    siteName: "AV GaLche",
    images: [
      {
        url: "https://www.avgalche.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AV GaLche Premium Clothing Fashion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AVGaLche",
    title: "AV GaLche - Timeless Indian Premium Clothing",
    description:
      "AV GaLche crafts global Premium Clothing fashion from India, blending old-school classics with modern refinement.",
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
      "AV GaLche is India’s first true global Premium Clothing fashion house, celebrating heritage, authenticity, and timeless elegance.",
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
        {/* Meta Pixel Code */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL}');
          fbq('track', 'PageView');
        `}
        </Script>

        {/* NoScript fallback for tracking */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL}&ev=PageView&noscript=1`}
          />
        </noscript>
        {/* End Meta Pixel Code */}

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
//done?
//work now

import type { Metadata } from "next";
import { Raleway, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "700"], // Add weights you need
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"], // Add weights you need
});

export const metadata: Metadata = {
  title: "AV GaLche",
  description: "Luxury Clothing brand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${raleway.variable} ${montserrat.variable} antialiased`}
      >
        <Navbar />
        <main>
          {children}
          <CookieBanner />
        </main>
        <Footer />
      </body>
    </html>
  );
}

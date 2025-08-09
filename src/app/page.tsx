import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Collections from "@/components/Collections";
import Products from "@/components/Products";
import Footer from "@/components/Footer";
import ArtOfCreation from "@/components/ArtOfCreation";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <HeroSection />
      <ArtOfCreation />
      <Collections />
      <Products />
      <Footer />
    </main>
  );
}

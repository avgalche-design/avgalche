import HeroSection from "@/components/HeroSection";
import Collections from "@/components/Collections";
import Products from "@/components/Products";

import ArtOfCreation from "@/components/ArtOfCreation";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <HeroSection />
      <ArtOfCreation />
      <Collections />
      <Products />
    </main>
  );
}

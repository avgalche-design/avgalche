import HeroSection from "@/components/HeroSection";
import Collections from "@/components/Collections";
// import Products from "@/components/Products";
import HeroCarousel from "@/components/HeroCarousel";
import NewDrops from "@/components/NewDrops";
import ArtOfCreation from "@/components/ArtOfCreation";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <HeroSection />
      <HeroCarousel />
      <NewDrops />
      <ArtOfCreation />

      <Collections />
      {/* <Products /> */}
    </main>
  );
}

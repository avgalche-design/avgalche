// import HeroSection from "@/components/HeroSection";
// import Collections from "@/components/Collections";
// // import Products from "@/components/Products";
// import HeroCarousel from "@/components/HeroCarousel";
// import NewDrops from "@/components/NewDrops";
// import ArtOfCreation from "@/components/ArtOfCreation";

// export default function Home() {
//   return (
//     <main className="relative min-h-screen">
//       <HeroSection />
//       <HeroCarousel />
//       <ArtOfCreation />
//       <NewDrops />
//       <Collections />
//       {/* <Products /> */}
//     </main>
//   );
// }

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          This project is no longer available
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          The hosting for this site has expired. Please contact the owner or
          renew the subscription to bring the site back online.
        </p>
        <a
          href="https://vercel.com/pricing"
          className="inline-block bg-black text-white text-sm px-5 py-3 rounded hover:bg-gray-800 transition"
        >
          Renew Hosting
        </a>
        <div className="mt-8 text-sm text-gray-400">
          Powered by{" "}
          <a href="https://vercel.com" className="underline">
            Vercel
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;

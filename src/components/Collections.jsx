// components/Collections.jsx
import Link from "next/link";

export default function Collections() {
  return (
    <section className="w-full min-h-screen bg-[#EBEBEB] flex flex-col items-center justify-center p-0 m-0">
      {/* Luxury Intro Text */}
      <div className="text-center mt-10 md:mt-16  md:mb-12 px-6">
        <h2 className="text-black text-lg md:text-3xl font-serif uppercase tracking-[0.25em] mb-4">
          A Season for Every Soul
        </h2>
        <p className="text-black/70  text-sm md:text-base font-light tracking-widest max-w-2xl mx-auto">
          From the frost-kissed silhouettes of winter to the radiant ease of
          summer — discover creations crafted for timeless elegance.
        </p>
      </div>

      {/* Side-by-side full-height cards */}
      <div className="flex flex-col mt-16 md:flex-row w-full h-screen gap-[2px]">
        {/* Winter Collection */}
        <Link
          href="/category/winter-collection"
          className="relative flex-1 h-full group overflow-hidden cursor-pointer"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
            style={{
              backgroundImage: "url('/images/winter2.jpg')",
            }}
          />
          {/* Darker gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10 transition-opacity duration-500 group-hover:from-black/80" />
          <div className="relative z-10 flex flex-col h-full justify-center items-center text-center px-6">
            <h3 className="text-md md:text-xl text-white font-serif  mb-4 uppercase tracking-[0.15em] drop-shadow-lg">
              Winter Collection
            </h3>
            <span className="text-white/80 text-sm  font-light tracking-wide">
              Explore luxurious styles for the season
            </span>
            <button className="relative text-white/80 active:bg-neutral-200 md:active:bg-inherit text-sm p-1 font-medium group">
              <h2>Discover Collection</h2>
              <span className="absolute left-0 bottom-0 h-[1px] w-1/4 bg-white transition-all duration-500 group-hover:w-full"></span>
              <span className="absolute right-0 bottom-0 h-[1px] w-1/4 bg-white transition-all duration-500 group-hover:w-full"></span>
            </button>
          </div>
        </Link>

        {/* Summer Collection */}
        <Link
          href="/category/summer-collection"
          className="relative flex-1 h-full group overflow-hidden cursor-pointer"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
            style={{
              backgroundImage: "url('/images/summer.webp')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10 transition-opacity duration-500 group-hover:from-black/80" />
          <div className="relative z-10 flex flex-col h-full justify-center items-center text-center px-6">
            <h3 className="text-md md:text-xl text-white font-serif  mb-4 uppercase tracking-[0.15em] drop-shadow-lg">
              Summer Collection
            </h3>
            <span className="text-white/80 text-sm font-light tracking-wide">
              Light, bright, and bold essentials
            </span>
            <button className="relative text-white/80 active:bg-neutral-200 md:active:bg-inherit text-sm p-1 font-medium group">
              <h2>Discover Collection</h2>
              <span className="absolute left-0 bottom-0 h-[1px] w-1/4 bg-white transition-all duration-500 group-hover:w-full"></span>
              <span className="absolute right-0 bottom-0 h-[1px] w-1/4 bg-white transition-all duration-500 group-hover:w-full"></span>
            </button>
          </div>
        </Link>
      </div>
    </section>
  );
}

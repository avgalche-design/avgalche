// components/Collections.jsx
export default function Collections() {
  return (
    <section className="w-full min-h-screen bg-black flex flex-col items-center justify-center p-0 m-0">
      {/* Luxury Intro Text */}
      <div className="text-center mt-16  mb-12 px-6">
        <h2 className="text-white text-2xl md:text-3xl font-serif uppercase tracking-[0.25em] mb-4">
          A Season for Every Soul
        </h2>
        <p className="text-white/70  text-sm md:text-base font-light tracking-widest max-w-2xl mx-auto">
          From the frost-kissed silhouettes of winter to the radiant ease of
          summer — discover creations crafted for timeless elegance.
        </p>
      </div>

      {/* Side-by-side full-height cards */}
      <div className="flex flex-col mt-16 md:flex-row w-full h-screen gap-[2px]">
        {/* Winter Collection */}
        <a
          href="#winter"
          className="relative flex-1 h-full group overflow-hidden cursor-pointer"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
            style={{
              backgroundImage:
                "url('https://plus.unsplash.com/premium_photo-1682095661711-f5d67d0e75a9?q=80&w=774&auto=format&fit=crop')",
            }}
          />
          {/* Darker gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10 transition-opacity duration-500 group-hover:from-black/80" />
          <div className="relative z-10 flex flex-col h-full justify-center items-center text-center px-6">
            <h3 className="text-4xl md:text-3xl text-white font-serif font-bold mb-4 uppercase tracking-[0.15em] drop-shadow-lg">
              Winter Collection
            </h3>
            <span className="text-white/80 text-lg md:text-sm font-light tracking-wide">
              Explore luxurious styles for the season
            </span>
          </div>
        </a>

        {/* Summer Collection */}
        <a
          href="#summer"
          className="relative flex-1 h-full group overflow-hidden cursor-pointer"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
            style={{
              backgroundImage:
                "url('https://plus.unsplash.com/premium_photo-1714226830926-1af8bf7b06c3?q=80&w=774&auto=format&fit=crop')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10 transition-opacity duration-500 group-hover:from-black/80" />
          <div className="relative z-10 flex flex-col h-full justify-center items-center text-center px-6">
            <h3 className="text-4xl md:text-3xl text-white font-serif font-bold mb-4 uppercase tracking-[0.15em] drop-shadow-lg">
              Summer Collection
            </h3>
            <span className="text-white/80 text-lg md:text-sm font-light tracking-wide">
              Light, bright, and bold essentials
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}

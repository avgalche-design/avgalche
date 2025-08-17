// components/HeroSection.jsx
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Wrapper that maintains 16:9 ratio */}
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/videos/car.mp4" type="video/mp4" />
        </video>

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/5" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-white px-6">
          <h1 className="text-2xl md:text-5xl logo  mb-6 animate-fadeIn">
            AV GaLche
          </h1>
          <Link href="/products">
            <button className="relative text-white p-1 text-sm group">
              <h2>Discover Collection</h2>
              <span className="absolute left-0 bottom-0 h-[1px] w-1/4 bg-white transition-all duration-500 group-hover:w-full"></span>
              <span className="absolute right-0 bottom-0 h-[1px] w-1/4 bg-white transition-all duration-500 group-hover:w-full"></span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

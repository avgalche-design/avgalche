// components/HeroSection.jsx
export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/walk.mp4" type="video/mp4" />
      </video>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/5" />

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-full z-10 text-white px-6">
        <h1 className="text-2xl md:text-5xl logo  tracking-[0.2em] uppercase mb-6 animate-fadeIn">
          AV GaLche
        </h1>
        {/* <p className="text-lg md:text-lg max-w-2xl text-center mb-10 font-light animate-fadeIn delay-200">
          Unveil Your Elegance
        </p> */}
        <button className="border rounded-sm border-white px-8 py-3 text-sm tracking-widest uppercase font-light hover:bg-white hover:text-black transition duration-300 animate-fadeIn delay-100">
          Discover Collection
        </button>
      </div>
    </section>
  );
}

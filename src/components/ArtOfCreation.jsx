// components/ArtOfCreation.jsx
export default function ArtOfCreation() {
  return (
    <section className="w-full bg-white text-black">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        {/* Left Side - Image */}
        <div className="relative group overflow-hidden">
          <img
            src="/images/art.avif"
            alt="Craftsmanship"
            className="w-full h-full object-cover transform group-hover:scale-105 transition duration-[2000ms] ease-out"
          />
        </div>

        {/* Right Side - Text */}
        <div className="flex flex-col justify-center items-start p-10 md:p-20">
          <h2 className="text-3xl md:text-5xl font-serif uppercase tracking-[0.15em] mb-6">
            The Art of Creation
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-8 max-w-xl">
            Every piece at AV GaLche is more than fashion — it’s a story of
            artistry, precision, and timeless elegance. From the first sketch to
            the final stitch, our collections are crafted to inspire, captivate,
            and endure.
          </p>
          <a
            href="#"
            className="border border-black px-8 py-3 text-sm tracking-widest uppercase hover:bg-black hover:text-white transition duration-300"
          >
            Explore the Story
          </a>
        </div>
      </div>
    </section>
  );
}

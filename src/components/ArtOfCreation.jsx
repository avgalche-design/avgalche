// components/ArtOfCreation.jsx
"use client"; // if using Next.js App Router
import Link from "next/link";

export default function ArtOfCreation() {
  return (
    <section className="w-full bg-white px-4 xl:px-14 py-10  text-black">
      <div className="grid grid-cols-1  md:grid-cols-2 h-auto">
        {/* Left Side - Image */}
        <div className="relative  flex items-center group overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1544361591-ad0cb51f54b3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Craftsmanship"
            className="w-full h-[1/2] object-cover transform group-hover:scale-105 transition duration-[2000ms] ease-out"
          />
        </div>

        {/* Right Side - Text */}
        <div className="flex flex-col justify-center items-start  p-4 md:p-10">
          <h2 className="text-xl md:text-3xl font-serif uppercase tracking-[0.15em] mb-6">
            The Art of Creation
          </h2>
          <p className="text-sm md:text-md leading-relaxed text-gray-700 mb-8 max-w-xl">
            Every piece at AV GaLche is more than fashion — it’s a story of
            artistry, precision, and timeless elegance. From the first sketch to
            the final stitch, our collections are crafted to inspire, captivate,
            and endure.
          </p>
          <Link href="/story">
            <button className="relative text-black p-1 font-medium group">
              <h2>Explore The Story</h2>
              <span className="absolute left-0 bottom-0 h-[2px] w-1/4 bg-black transition-all duration-500 group-hover:w-full"></span>
              <span className="absolute right-0 bottom-0 h-[2px] w-1/4 bg-black transition-all duration-500 group-hover:w-full"></span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

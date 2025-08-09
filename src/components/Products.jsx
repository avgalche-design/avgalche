// components/Products.jsx
import { FaShoppingBag } from "react-icons/fa";

export default function Products() {
  const products = [
    {
      image: "/images/p1.avif",
      href: "#",
      alt: "Classic Gold Clock",
    },
    {
      image: "/images/p2.avif",
      href: "#",
      alt: "Royal Chair",
    },
    {
      image: "/images/p3.avif",
      href: "#",
      alt: "Jewelled Apples",
    },
    {
      image: "/images/p4.avif",
      href: "#",
      alt: "Garden Jewel",
    },
  ];

  return (
    <section className="w-full bg-black flex flex-col items-center py-20 px-0">
      {/* Section Heading */}
      <div className="text-center   mb-12 px-6">
        {/* <h2 className="text-white text-4xl md:text-5xl font-serif font-bold mb-16 tracking-[0.2em] text-center uppercase">
          Signature Collection
        </h2> */}
        <h3 className="text-white/70  text-sm md:text-2xl font-light tracking-widest max-w-2xl mx-auto">
          Where artistry meets elegance — each piece a testament to timeless
          design.
        </h3>
      </div>

      {/* Product Grid */}
      <div className="flex flex-wrap justify-center gap-8 px-4 max-w-9xl">
        {products.map((prod) => (
          <a
            href={prod.href}
            key={prod.alt}
            className="
              group
              block
              overflow-hidden
              w-full sm:w-[calc(50%-1rem)] md:w-[calc(25%-1.5rem)]
              aspect-[4/5]
              relative
              bg-[#121212]
              cursor-pointer
              shadow-md
              hover:shadow-lg
              transition-shadow duration-500
            "
          >
            {/* Product Image */}
            <img
              src={prod.image}
              alt={prod.alt}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              draggable={false}
            />

            {/* Product Info Overlay (always visible at bottom) */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 via-black/30 to-transparent px-5 py-4">
              <p className="text-white font-serif text-lg tracking-wide">
                {prod.alt}
              </p>
            </div>

            {/* Hover Overlay with Icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/30">
              <FaShoppingBag className="text-white text-4xl" />
            </div>
          </a>
        ))}
      </div>

      {/* Explore More Button */}
      <div className="mt-16 flex justify-center">
        <button className="px-10 py-3 border border-white text-white rounded-sm uppercase tracking-[0.2em] text-sm font-serif hover:bg-white hover:text-black transition-all duration-300">
          Explore More
        </button>
      </div>
    </section>
  );
}

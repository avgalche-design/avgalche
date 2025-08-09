// components/Products.jsx
import { FaShoppingBag } from "react-icons/fa";

export default function Products() {
  const products = [
    {
      image:
        "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=700&q=80",
      href: "#",
      alt: "Classic Gold Clock",
    },
    {
      image:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=700&q=80",
      href: "#",
      alt: "Royal Chair",
    },
    {
      image:
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=700&q=80",
      href: "#",
      alt: "Jewelled Apples",
    },
    {
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80",
      href: "#",
      alt: "Garden Jewel",
    },
  ];

  return (
    <section className="w-full bg-black flex flex-col items-center py-24 px-0">
      {/* Section Heading */}
      <h2 className="text-white text-4xl md:text-5xl font-serif font-bold mb-16 tracking-[0.2em] text-center uppercase">
        Signature Collection
      </h2>

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

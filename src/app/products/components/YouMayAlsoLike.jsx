"use client";
import Link from "next/link";

export default function YouMayAlsoLike({ products }) {
  // Defensive: Fallback to empty list if none
  if (!products || products.length === 0) return null;

  return (
    <section>
      <h2 className="text-center text-xl font-serif mb-8 text-black">
        Our curated picks for you
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        {products.map((product) => (
          <Link
            tabIndex={0}
            href={`/products/${product.handle}`}
            key={product.id}
            className="flex flex-col items-center group"
          >
            <div className=" rounded-lg overflow-hidden w-full aspect-[3/4] flex items-center justify-center mb-4">
              <img
                src={product.images?.[0]?.url}
                alt={product.images?.[0]?.altText || product.title}
                className=" object-contain"
              />
            </div>
            <p className="text-[13px] font-light group-hover:underline text-center text-black">
              {product.title}
            </p>
            <p className="text-gray-600 text-sm mt-1">
              {product.variants?.[0]?.price?.amount}{" "}
              {product.variants?.[0]?.price?.currencyCode}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

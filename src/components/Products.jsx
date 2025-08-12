import { shopifyFetch } from "../lib/shopify"; // adjust path as needed
import Link from "next/link";

const LATEST_PRODUCTS_QUERY = `
  {
    products(first: 4, sortKey: CREATED_AT, reverse: true) {
      edges {
        node {
          id
          title
          handle
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

export default async function Products() {
  const data = await shopifyFetch({ query: LATEST_PRODUCTS_QUERY });
  const products = data.products.edges.map((edge) => {
    const node = edge.node;
    return {
      image: node.images.edges[0]?.node.url || "/images/placeholder.png",
      href: `/products/${node.handle}`,
      alt: node.title || "Product",
    };
  });

  return (
    <section className="w-full bg-black flex flex-col items-center py-20 px-0">
      <div className="text-center mb-12 px-6">
        <h3 className="text-white/70 text-sm md:text-2xl font-light tracking-widest max-w-2xl mx-auto">
          Where artistry meets elegance — each piece a testament to timeless
          design.
        </h3>
      </div>

      <div className="flex flex-wrap justify-center gap-8 px-4 max-w-9xl">
        {products.map((prod) => (
          <a
            href={prod.href}
            key={prod.alt + prod.href}
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
            <img
              src={prod.image}
              alt={prod.alt}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              draggable={false}
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 via-black/30 to-transparent px-5 py-4">
              <p className="text-white font-serif text-lg tracking-wide">
                {prod.alt}
              </p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/30"></div>
          </a>
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <Link href="/products">
          <button className="px-10 py-3 border border-white text-white rounded-sm uppercase tracking-[0.2em] text-sm font-serif hover:bg-white hover:text-black transition-all duration-300">
            Explore More
          </button>
        </Link>
      </div>
    </section>
  );
}

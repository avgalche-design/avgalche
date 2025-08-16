import { shopifyFetch } from "../../../lib/shopify";
import ProductGridClient from "../../products/components/ProductGridClient";
import { notFound } from "next/navigation";

const PRODUCTS_QUERY = `
{
  products(first: 50) {
    edges {
      node {
        id
        title
        handle
        description
        productType
        tags
        collections(first: 10) {
          edges {
            node {
              title
              handle
            }
          }
        }
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
}
`;

// Category mapping for URL slugs based on actual Shopify collection names
const categoryMapping = {
  "for-him": {
    title: "For Him",
    description:
      "Timeless elegance meets contemporary sophistication in our curated men's collection.",
    collectionNames: ["For him"],
    productTypes: ["T-Shirt", "Shirt", "Polo", "Co-ord"],
    tags: ["men", "gentleman", "mens"],
  },
  "for-her": {
    title: "For Her",
    description:
      "Sophisticated femininity redefined through our exclusive women's collection.",
    collectionNames: ["For her"],
    productTypes: ["Shirt", "Women's Shirt"],
    tags: ["women", "ladies", "womens"],
  },
  "t-shirts": {
    title: "AV GaLche's T-Shirts",
    description: "Iconic designs that define contemporary style and comfort.",
    collectionNames: ["AV GaLche's T-Shirts"],
    productTypes: ["T-Shirt"],
    tags: ["t-shirt", "tshirt", "signature"],
  },
  shirts: {
    title: "AV GaLche's Shirts",
    description:
      "Precision craftsmanship meets modern elegance in every stitch.",
    collectionNames: ["AV GaLche's Shirts"],
    productTypes: ["Shirt"],
    tags: ["shirt", "tailored", "formal"],
  },
  polos: {
    title: "AV GaLche's Polos",
    description:
      "Classic sophistication with a modern twist for the discerning gentleman.",
    collectionNames: ["AV GaLche's Polos"],
    productTypes: ["Polo"],
    tags: ["polo", "heritage", "classic"],
  },
  "co-ord": {
    title: "AV GaLche's Co-ord",
    description:
      "Perfectly coordinated sets that elevate your style effortlessly.",
    collectionNames: ["AV GaLche's Co-ord"],
    productTypes: ["Co-ord"],
    tags: ["co-ord", "ensemble", "set"],
  },
  "womens-shirts": {
    title: "AV GaLche Women's Shirts",
    description:
      "Artisanal craftsmanship meets contemporary design for the modern woman.",
    collectionNames: ["AV GaLche Women's Shirts"],
    productTypes: ["Shirt", "Women's Shirt"],
    tags: ["couture", "womens", "ladies"],
  },
};

export async function generateStaticParams() {
  return Object.keys(categoryMapping).map((slug) => ({
    slug: slug,
  }));
}

export default async function CategoryPage({ params }) {
  const { slug } = params;
  const category = categoryMapping[slug];

  if (!category) {
    notFound();
  }

  const data = await shopifyFetch(
    { query: PRODUCTS_QUERY },
    { next: { revalidate: 30 } }
  );

  // Filter products based on category
  const allProducts = data?.products?.edges || [];
  const filteredProducts = allProducts
    .map((edge) => {
      const node = edge?.node ?? {};
      return {
        id: node.id ?? "",
        title: node.title ?? "Untitled",
        handle: node.handle ?? "",
        description: node.description ?? "",
        category: node.productType ?? "Uncategorized",
        tags: node.tags || [],
        collections:
          node.collections?.edges?.map((ce) => ({
            title: ce?.node?.title ?? "",
            handle: ce?.node?.handle ?? "",
          })) || [],
        images:
          node.images?.edges?.map((ie) => ({
            url: ie?.node?.url ?? null,
            altText: ie?.node?.altText ?? "",
          })) ?? [],
        variants:
          node.variants?.edges?.map((ve) => ({
            price:
              ve?.node?.price?.amount != null
                ? {
                    amount: ve.node.price.amount,
                    currencyCode: ve.node.price.currencyCode,
                  }
                : null,
          })) ?? [],
      };
    })
    .filter((product) => {
      // Check if product matches category criteria
      const matchesCollection = category.collectionNames.some(
        (collectionName) =>
          product.collections.some(
            (collection) =>
              collection.title.toLowerCase() === collectionName.toLowerCase()
          )
      );

      const matchesProductType = category.productTypes.some((type) =>
        product.category.toLowerCase().includes(type.toLowerCase())
      );

      const matchesTags = category.tags.some((tag) =>
        product.tags.some((productTag) =>
          productTag.toLowerCase().includes(tag.toLowerCase())
        )
      );

      return matchesCollection || matchesProductType || matchesTags;
    });

  return (
    <>
      <main className="relative bg-white text-black min-h-screen">
        {/* Hero Collection Header */}
        <section className="px-6 md:px-12 lg:px-20 py-20 md:py-32">
          <div className="max-w-6xl mx-auto text-center">
            <div className="space-y-8">
              {/* Collection Title */}
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl logo lg:text-7xl font-extralight tracking-[0.05em] text-black leading-tight">
                  {category.title}
                </h1>
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-black/40 to-transparent mx-auto"></div>
                <h2 className="text-lg md:text-xl font-extralight tracking-[0.15em] text-neutral-700 uppercase">
                  Collection
                </h2>
              </div>

              {/* Collection Description */}
              <div className="max-w-3xl mx-auto space-y-6">
                <p className="text-neutral-600 text-base md:text-lg leading-[1.8] font-extralight tracking-[0.02em]">
                  {category.description}
                </p>
              </div>

              {/* Product Count */}
              <div className="pt-4">
                <p className="text-xs uppercase tracking-widest text-neutral-500">
                  {filteredProducts.length} Item
                  {filteredProducts.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid Section */}
        <section className="px-6 md:px-12 lg:px-20 mb-10">
          <div className="max-w-9xl mx-auto">
            <ProductGridClient products={filteredProducts} />
          </div>
        </section>
      </main>
    </>
  );
}

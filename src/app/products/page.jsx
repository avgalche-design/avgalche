// app/products/page.jsx
import { shopifyFetch } from "../../lib/shopify";
import ProductGridClient from "./components/ProductGridClient";

const PRODUCTS_QUERY = `
{
  products(first: 30) {
    edges {
      node {
        id
        title
        handle
        description
        productType
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
              priceV2 {
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

export default async function ProductsPage() {
  const data = await shopifyFetch({ query: PRODUCTS_QUERY });

  // Defensive mapping: build a simple, serializable product shape
  const products =
    data?.products?.edges?.map((edge) => {
      const node = edge?.node ?? {};
      return {
        id: node.id ?? "",
        title: node.title ?? "Untitled",
        handle: node.handle ?? "",
        description: node.description ?? "",
        category: node.productType ?? "Uncategorized",
        images:
          node.images?.edges?.map((ie) => ({
            url: ie?.node?.url ?? null,
            altText: ie?.node?.altText ?? "",
          })) ?? [],
        variants:
          node.variants?.edges?.map((ve) => ({
            price:
              ve?.node?.priceV2?.amount != null
                ? {
                    amount: ve.node.priceV2.amount,
                    currencyCode: ve.node.priceV2.currencyCode,
                  }
                : null,
          })) ?? [],
      };
    }) ?? [];

  return (
    <main className="bg-black min-h-screen text-white px-4 sm:px-12 py-12">
      {/* Dior-like intro */}
      <section className="max-w-3xl mx-auto text-center mt-10 mb-12">
        <p className="text-sm text-gray-400 mb-2">Winter 2025-2026</p>
        <h1 className="text-3xl md:text-4xl font-serif mb-4">AV GaLche</h1>
        <p className="text-sm text-gray-300 leading-relaxed">
          Between heritage and modernity, the AV GaLche capsule collection
          reveals an iconic signature inspired by timeless artistry...
        </p>
        <p className="mt-6 text-xs uppercase tracking-widest text-gray-400">
          {products.length} Item(s)
        </p>
      </section>

      {/* Client-side grid receives full products array (images + handle preserved) */}
      <ProductGridClient products={products} />
    </main>
  );
}

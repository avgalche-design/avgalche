// // app/products/page.jsx
// import { shopifyFetch } from "../../lib/shopify";
// import ProductGridClient from "./components/ProductGridClient";

// const PRODUCTS_QUERY = `
// {
//   products(first: 30) {
//     edges {
//       node {
//         id
//         title
//         handle
//         description
//         productType
//         images(first: 5) {
//           edges {
//             node {
//               url
//               altText
//             }
//           }
//         }
//         variants(first: 1) {
//           edges {
//             node {
//               priceV2 {
//                 amount
//                 currencyCode
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
// `;

// export default async function ProductsPage() {
//   const data = await shopifyFetch({ query: PRODUCTS_QUERY });

//   // Defensive mapping: build a simple, serializable product shape
//   const products =
//     data?.products?.edges?.map((edge) => {
//       const node = edge?.node ?? {};
//       return {
//         id: node.id ?? "",
//         title: node.title ?? "Untitled",
//         handle: node.handle ?? "",
//         description: node.description ?? "",
//         category: node.productType ?? "Uncategorized",
//         images:
//           node.images?.edges?.map((ie) => ({
//             url: ie?.node?.url ?? null,
//             altText: ie?.node?.altText ?? "",
//           })) ?? [],
//         variants:
//           node.variants?.edges?.map((ve) => ({
//             price:
//               ve?.node?.priceV2?.amount != null
//                 ? {
//                     amount: ve.node.priceV2.amount,
//                     currencyCode: ve.node.priceV2.currencyCode,
//                   }
//                 : null,
//           })) ?? [],
//       };
//     }) ?? [];

//   return (
//     <main className="bg-black min-h-screen text-white px-4 sm:px-12 py-12">
//       {/* Dior-like intro */}
//       <section className="max-w-3xl mx-auto text-center mt-10 mb-12">
//         <p className="text-sm text-gray-400 mb-2">Winter 2025-2026</p>
//         <h1 className="text-3xl md:text-4xl font-serif mb-4">AV GaLche</h1>
//         <p className="text-sm text-gray-300 leading-relaxed">
//           Between heritage and modernity, the AV GaLche capsule collection
//           reveals an iconic signature inspired by timeless artistry...
//         </p>
//         <p className="mt-6 text-xs uppercase tracking-widest text-gray-400">
//           {products.length} Item(s)
//         </p>
//       </section>

//       {/* Client-side grid receives full products array (images + handle preserved) */}
//       <ProductGridClient products={products} />
//     </main>
//   );
// }

// app/products/page.jsx
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
        createdAt
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

export default async function ProductsPage() {
  const data = await shopifyFetch(
    { query: PRODUCTS_QUERY },
    { next: { revalidate: 30 } } // Refresh every 30 seconds
  );

  const products =
    data?.products?.edges?.map((edge) => {
      const node = edge?.node ?? {};
      return {
        id: node.id ?? "",
        title: node.title ?? "Untitled",
        handle: node.handle ?? "",
        description: node.description ?? "",
        category: node.productType ?? "Uncategorized",
        createdAt: node.createdAt ?? null,
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
    }) ?? [];

  return (
    <>
      <main className="relative bg-white text-black min-h-screen">
        {/* Premium Banner */}
        {/* <div className="relative border-b border-black/5 backdrop-blur-sm bg-white/40">
          <div className="text-center py-3 text-xs tracking-[0.2em] font-extralight text-black/80 uppercase">
            Complimentary shipping on orders over $200
          </div>
        </div> */}

        {/* Hero Collection Header */}
        <section className="px-6 md:px-12 lg:px-20 py-20 md:py-32">
          <div className="max-w-6xl mx-auto text-center">
            <div className="space-y-8">
              {/* Collection Title */}
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl logo lg:text-7xl font-extralight tracking-[0.05em] text-black leading-tight">
                  AV GALCHE
                </h1>
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-black/40 to-transparent mx-auto"></div>
                <h2 className="text-lg md:text-xl font-extralight tracking-[0.15em] text-neutral-700 uppercase">
                  Collection
                </h2>
              </div>

              {/* Collection Description */}
              <div className="max-w-3xl mx-auto space-y-6">
                <p className="text-neutral-600 text-base md:text-lg leading-[1.8] font-extralight tracking-[0.02em]">
                  Winter 2025-2026 | Between heritage and modernity, the AV
                  Galche capsule collection reveals an iconic signature inspired
                  by timeless artistry.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid Section */}
        <section className="px-6 md:px-12 lg:px-20 mb-10">
          <div className="max-w-9xl mx-auto">
            <ProductGridClient products={products} />
          </div>
        </section>
      </main>
    </>
  );
}

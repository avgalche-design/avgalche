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

// Atmospheric Background Component
function AtmosphericBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-black">
        {/* Floating orbs */}
        <div className="absolute top-1/6 left-1/5 w-96 h-96 bg-gradient-radial from-white/[0.015] to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-neutral-200/[0.008] to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-radial from-white/[0.005] to-transparent rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
    </div>
  );
}

export default async function ProductsPage() {
  const data = await shopifyFetch(
    { query: PRODUCTS_QUERY },
    { next: { revalidate: 30 } } // Refresh every 30 seconds
  );

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
    <>
      {/* <AtmosphericBackground /> */}

      <main className="relative  bg-black text-white min-h-screen">
        {/* Premium Banner */}
        {/* <div className="relative border-b border-white/5 backdrop-blur-sm bg-black/40">
          <div className="text-center py-3 text-xs tracking-[0.2em] font-extralight text-white/80 uppercase">
            Complimentary shipping on orders over $200
          </div>
        </div> */}

        {/* Hero Collection Header */}
        <section className="px-6 md:px-12 lg:px-20 py-20 md:py-32">
          <div className="max-w-6xl mx-auto text-center">
            <div className="space-y-8">
              {/* Collection Title */}
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight tracking-[0.05em] text-white leading-tight">
                  AV GALCHE
                </h1>
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto"></div>
                <h2 className="text-lg md:text-xl font-extralight tracking-[0.15em] text-neutral-300 uppercase">
                  Collection
                </h2>
              </div>

              {/* Collection Description */}
              <div className="max-w-3xl mx-auto space-y-6">
                <p className="text-neutral-400 text-base md:text-lg leading-[1.8] font-extralight tracking-[0.02em]">
                  Winter 2025-2026 | Between heritage and modernity, the AV
                  Galche capsule collection reveals an iconic signature inspired
                  by timeless artistry.
                </p>

                {/* Items Count */}
                <div className="pt-8">
                  <div className="inline-block">
                    <div className="text-xs text-white/60 tracking-[0.3em] uppercase font-extralight">
                      {products.length} Pieces
                    </div>
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mt-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid Section */}
        <section className="px-6 md:px-12 lg:px-20 mb-10 ">
          <div className="max-w-9xl mx-auto">
            <ProductGridClient products={products} />
          </div>
        </section>

        {/* Premium Newsletter Section */}
        <section className="border-t border-white/10 py-24 md:py-32 backdrop-blur-sm bg-white/[0.01]">
          <div className="max-w-4xl mx-auto text-center px-6">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-extralight tracking-[0.05em] text-white">
                  Stay Connected
                </h2>
                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto"></div>
                <p className="text-neutral-400 text-base leading-[1.8] font-extralight tracking-[0.02em] max-w-2xl mx-auto">
                  Be the first to discover new collections, exclusive pieces,
                  and private events. Join our inner circle.
                </p>
              </div>

              <div className="pt-8">
                <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-6 py-4 bg-white/5 border border-white/20 text-white placeholder-white/40 text-sm font-extralight tracking-wide focus:outline-none focus:border-white/60 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                  />
                  <button className="relative bg-white text-black px-8 py-4 text-xs uppercase tracking-[0.2em] font-light hover:bg-neutral-100 transition-all duration-300 group overflow-hidden">
                    <span className="relative z-10">Subscribe</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Footer */}
        <footer className="border-t border-white/10 py-20 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-[0.2em] font-extralight text-white mb-6">
                  Support
                </h3>
                <ul className="space-y-4">
                  {[
                    "Size Guide",
                    "Care Instructions",
                    "Returns",
                    "Contact",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm text-neutral-400 hover:text-white transition-all duration-300 font-extralight tracking-wide relative group"
                      >
                        {item}
                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white/40 group-hover:w-full transition-all duration-300"></div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-[0.2em] font-extralight text-white mb-6">
                  About
                </h3>
                <ul className="space-y-4">
                  {[
                    "Our Heritage",
                    "Craftsmanship",
                    "Sustainability",
                    "Careers",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm text-neutral-400 hover:text-white transition-all duration-300 font-extralight tracking-wide relative group"
                      >
                        {item}
                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white/40 group-hover:w-full transition-all duration-300"></div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-[0.2em] font-extralight text-white mb-6">
                  Connect
                </h3>
                <ul className="space-y-4">
                  {["Instagram", "Facebook", "Twitter", "Pinterest"].map(
                    (item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-sm text-neutral-400 hover:text-white transition-all duration-300 font-extralight tracking-wide relative group"
                        >
                          {item}
                          <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white/40 group-hover:w-full transition-all duration-300"></div>
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-[0.2em] font-extralight text-white mb-6">
                  Legal
                </h3>
                <ul className="space-y-4">
                  {[
                    "Privacy Policy",
                    "Terms of Service",
                    "Cookies",
                    "Accessibility",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm text-neutral-400 hover:text-white transition-all duration-300 font-extralight tracking-wide relative group"
                      >
                        {item}
                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white/40 group-hover:w-full transition-all duration-300"></div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 pt-12 text-center">
              <div className="space-y-4">
                <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto"></div>
                <p className="text-xs text-neutral-500 tracking-[0.15em] font-extralight uppercase">
                  © 2025 AV Galche. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

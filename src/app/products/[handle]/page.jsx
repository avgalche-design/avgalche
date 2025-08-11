// app/products/[handle]/page.js
import { shopifyFetch } from "../../../lib/shopify";
import YouMayAlsoLike from "../components/YouMayAlsoLike";

const PRODUCT_QUERY = `
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      productType
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
          }
        }
      }
    }
  }
`;

const RELATED_PRODUCTS_QUERY = `
{
  products(first: 4) {
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

export async function generateStaticParams() {
  const PRODUCTS_HANDLE_QUERY = `
    {
      products(first: 50) {
        edges {
          node {
            handle
          }
        }
      }
    }
  `;
  const { products } = await shopifyFetch({ query: PRODUCTS_HANDLE_QUERY });
  return products.edges.map(({ node }) => ({ handle: node.handle }));
}

export default async function ProductPage({ params }) {
  const { handle } = await params; // ✅ no await here

  const data = await shopifyFetch({
    query: PRODUCT_QUERY,
    variables: { handle },
  });

  const product = data?.productByHandle;
  if (!product) {
    return (
      <main className="p-8 text-center text-gray-500">Product not found</main>
    );
  }

  const price = product.variants.edges[0]?.node.price;

  // Fetch related products
  const relatedData = await shopifyFetch({ query: RELATED_PRODUCTS_QUERY });
  const relatedProducts = relatedData.products.edges
    .map((edge) => ({
      ...edge.node,
      images: edge.node.images.edges.map((imgEdge) => imgEdge.node),
      variants: edge.node.variants.edges.map((vEdge) => ({
        price: vEdge.node.price,
      })),
    }))
    .filter((prod) => prod.handle !== product.handle);

  return (
    <main className="bg-black text-white px-6 md:px-20 py-12 max-w-9xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* LEFT */}
        <div className="flex flex-col gap-4">
          {product.images.edges.length > 0 ? (
            product.images.edges.map(({ node }, index) => (
              <img
                key={index}
                src={node.url}
                alt={node.altText || product.title}
                className="w-full object-contain rounded"
              />
            ))
          ) : (
            <div className="h-96 bg-gray-800 flex items-center justify-center">
              No Image
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="md:sticky md:top-8 p-4 self-start">
          <h1 className="text-3xl font-serif">{product.title}</h1>
          <p className="mt-1 text-gray-400">{product.productType}</p>

          {price && (
            <p className="mt-4 text-2xl text-center font-medium">
              {price.currencyCode} {price.amount}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3">
            <button className="border border-gray-600 py-3 rounded hover:bg-gray-900 transition">
              Add to Wishlist
            </button>
            <button className="bg-white text-black py-3 rounded hover:bg-gray-300 transition">
              Add to Cart
            </button>
          </div>

          <div className="mt-10 border-b border-gray-700">
            <nav className="flex gap-8 text-sm font-medium">
              <button className="pb-2 border-b-2 border-white">
                Description
              </button>
              <button className="pb-2 text-gray-400 hover:text-white">
                Size & Fit
              </button>
              <button className="pb-2 text-gray-400 hover:text-white">
                Contact & In-Store Availability
              </button>
            </nav>
          </div>

          <div className="mt-6 text-gray-300 leading-relaxed">
            {product.description}
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Size & Fit</h2>
            <ul className="space-y-2">
              {product.variants.edges.map(({ node }) => (
                <li
                  key={node.id}
                  className="flex items-center justify-between border-b border-gray-700 pb-2"
                >
                  <span>{node.title}</span>
                  <span
                    className={
                      node.availableForSale ? "text-green-400" : "text-red-500"
                    }
                  >
                    {node.availableForSale ? "In stock" : "Out of stock"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ✅ YouMayAlsoLike */}
      <YouMayAlsoLike products={relatedProducts} />
    </main>
  );
}

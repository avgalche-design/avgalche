// app/products/[handle]/page.js
import { shopifyFetch } from "../../../lib/shopify";
import YouMayAlsoLike from "../components/YouMayAlsoLike";
import ProductPageClient from "../components/ProductPageClient";

const PRODUCT_QUERY = `
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      productType
      metafields(identifiers: [
        {namespace: "custom", key: "wash_care_instructions"},
        {namespace: "custom", key: "composition_care"},
  {namespace: "custom", key: "fabric_and_care"},
        {namespace: "custom", key: "shipping_info"},
        {namespace: "custom", key: "size_guide"}
      ]) {
        key
        value
      }
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
  const { handle } = await params;

  const data = await shopifyFetch(
    {
      query: PRODUCT_QUERY,
      variables: { handle },
    },
    { next: { revalidate: 30 } } // regenerate every 30 seconds
  );

  const product = data?.productByHandle;
  if (!product) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light tracking-wide text-neutral-400 mb-2">
            Product Not Found
          </h1>
          <p className="text-sm text-neutral-500 tracking-wider">
            The requested item is not available.
          </p>
        </div>
      </main>
    );
  }

  const price = product.variants.edges[0]?.node.price;

  // Extract metafield data
  const metafields = product.metafields
    ? product.metafields.reduce((acc, metafield) => {
        if (metafield && metafield.key && metafield.value) {
          acc[metafield.key] = metafield.value;
        }
        return acc;
      }, {})
    : {};

  const washCareInfo =
    metafields.composition_care ||
    metafields.fabric_and_care ||
    metafields.wash_care_instructions ||
    `
    • Machine wash cold with like colors
    • Do not bleach
    • Tumble dry low heat
    • Iron on low temperature
    • Do not dry clean
    • Wash inside out to preserve print and color
  `;

  const shippingInfo =
    metafields.shipping_info ||
    `
    Shipping Method: Orders are shipped via registered courier or speed post—internationally through international couriers and domestically through domestic couriers.

Dispatch Timeline: Orders are dispatched within 6–8 days or as per the confirmed delivery date; delays by courier/postal services are beyond AG Enterprises' control.

Delivery & Support: Orders are delivered to the buyer's provided address, with confirmation sent to the registered email; for support, contact 8851760427 or support@avgalche.com.

Refund & Return Policy: Returns and refunds are accepted within 14 days of delivery, subject to our return policy terms.
  `;

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
    .filter((prod) => prod.handle !== handle);

  return (
    <ProductPageClient
      product={product}
      price={price}
      relatedProducts={relatedProducts}
      washCareInfo={washCareInfo}
      shippingInfo={shippingInfo}
      sizeGuideData={metafields.size_guide}
    />
  );
}

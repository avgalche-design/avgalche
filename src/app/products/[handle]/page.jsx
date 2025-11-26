// app/products/[handle]/page.js
import { shopifyFetch } from "../../../lib/shopify";
import YouMayAlsoLike from "../components/YouMayAlsoLike";
import ProductPageClient from "../components/ProductPageClient";
import ProductJsonLd from "../../../components/SEO/ProductJsonLd";

const PRODUCT_QUERY = `
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      descriptionHtml
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
      media(first: 10) {
  edges {
    node {
      mediaContentType
      alt
      ... on MediaImage {
        image { url }
      }
      ... on Video {
        sources {
          url
          mimeType
        }
        previewImage {
          url
        }
      }
      ... on ExternalVideo {
        host
        originUrl
        previewImage {
          url
        }
      }
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
        media(first: 1) {
          edges {
            node {
              mediaContentType
              alt
              ... on MediaImage {
                image {
                  url
                }
              }
              ... on Video {
                sources {
                  url
                  mimeType
                  format
                  height
                  width
                }
              }
              ... on ExternalVideo {
                host
                originUrl
              }
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

  // ✅ You can leave this as force-cache, since static params rarely change
  const { products } = await shopifyFetch(
    { query: PRODUCTS_HANDLE_QUERY },
    { cache: "force-cache" }
  );

  return products.edges.map(({ node }) => ({ handle: node.handle }));
}

export default async function ProductPage({ params }) {
  const { handle } = await params;

  // ✅ Product data revalidates automatically every 60 seconds
  const data = await shopifyFetch(
    {
      query: PRODUCT_QUERY,
      variables: { handle },
    },
    { next: { revalidate: 60 } } // ✅ updated
  );

  const product = data?.productByHandle;
  if (!product) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
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

  // Extract metafields
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
    • Turn inside out before washing to preserve texture, weave, and print.
• Zip up before wash if applicable.
• Cold gentle cycle or light hand wash recommended.
• Avoid bleach, soaking, friction, and harsh detergents.
• Do not tumble dry or wring.
• Dry flat or line dry in shade; let the fabric rest naturally.
• Cool iron on reverse side, avoiding printed, embroidered, or velvet areas.
• Do not rub or soak velvet; allow it to dry flat in shade to maintain softness.
  `;

  const shippingInfo =
    metafields.shipping_info ||
    `
  Shipping & Delivery At AG Enterprises, we ensure your orders are shipped securely and promptly.
• Domestic Shipping:
Delivered via trusted domestic courier partners.
• International Shipping:
Handled through reliable international courier services.
All orders are dispatched within the next business day or as per the confirmed delivery schedule.
Please note: Delivery delays caused by courier or postal services are beyond our control.                                                                                                       Order Confirmation & Support
Once your order is dispatched, a confirmation email will be sent to your registered email address.
For any queries or support, feel free to contact us:
‪+91 8851760427‬
support@avgalche.com
Returns & Refunds
We offer a 7-day return and refund window from the date of delivery.
Returns are subject to our Return Policy Terms, which ensure a smooth and fair process.
To initiate a return or refund:
• Visit My Account on our website and follow the refund initiation steps.
• If you're unable to reach our customer support team, this is the fastest way to begin your request.
  `;

  // ✅ Related products revalidate automatically as well
  const relatedData = await shopifyFetch(
    { query: RELATED_PRODUCTS_QUERY },
    { next: { revalidate: 60 } } // ✅ updated
  );

  const relatedProducts =
    relatedData?.products?.edges?.map((edge) => ({
      ...edge.node,
      images: edge.node.media?.edges
        ? edge.node.media.edges
            .map((mediaEdge) => {
              const node = mediaEdge.node;
              if (node.mediaContentType === "IMAGE" && node.image) {
                return { url: node.image.url, altText: node.alt || "" };
              }
              return null;
            })
            .filter(Boolean)
        : [],
      variants:
        edge.node.variants?.edges?.map((vEdge) => ({
          price: vEdge.node.price,
        })) || [],
    })) || [];

  return (
    <>
      <ProductJsonLd product={{ ...product, handle }} price={price} />
      <ProductPageClient
        product={product}
        price={price}
        relatedProducts={relatedProducts}
        washCareInfo={washCareInfo}
        shippingInfo={shippingInfo}
        sizeGuideData={metafields.size_guide}
      />
    </>
  );
}

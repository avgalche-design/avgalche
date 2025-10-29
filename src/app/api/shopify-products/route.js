import { shopifyFetch } from "../../../lib/shopify"; // adjust path as needed
import { NextResponse } from "next/server";

const ALL_PRODUCTS_QUERY = `
  {
    products(first: 50, sortKey: CREATED_AT, reverse: true) {
      edges {
        node {
          id
          title
          handle
          productType
          tags
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

export async function GET() {
  try {
    const data = await shopifyFetch(
      { query: ALL_PRODUCTS_QUERY },
      { cache: "force-cache" }
    );

    // Transform the data to match the expected format
    const products =
      data?.products?.edges?.map((edge) => ({
        id: edge.node.id,
        title: edge.node.title,
        handle: edge.node.handle,
        productType: edge.node.productType,
        tags: edge.node.tags || [],
        images: edge.node.images?.edges?.map((img) => img.node) || [],
        variants:
          edge.node.variants?.edges?.map((v) => ({
            price: v.node.price,
          })) || [],
      })) || [];

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Shopify products API error:", error);

    // Return appropriate error status based on error type
    let status = 500;
    if (error.message.includes("Unauthorized")) {
      status = 401;
    } else if (error.message.includes("Not Found")) {
      status = 404;
    } else if (error.message.includes("environment variables")) {
      status = 500;
    }

    return NextResponse.json(
      {
        error: error.message,
        details:
          "Please check your Shopify configuration and environment variables",
      },
      { status }
    );
  }
}

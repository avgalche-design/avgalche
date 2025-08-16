import { shopifyFetch } from "../../../lib/shopify"; // adjust path as needed
import { NextResponse } from "next/server";

const ALL_PRODUCTS_QUERY = `
  {
    products(first: 50) {
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
    const data = await shopifyFetch({ query: ALL_PRODUCTS_QUERY });

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
    return NextResponse.json(
      { error: `Shopify fetch failed: ${error.message}` },
      { status: 500 }
    );
  }
}

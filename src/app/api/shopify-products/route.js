import { shopifyFetch } from "../../../lib/shopify"; // adjust path as needed
import { NextResponse } from "next/server";

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

export async function GET() {
  try {
    const data = await shopifyFetch({ query: LATEST_PRODUCTS_QUERY });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: `Shopify fetch failed: ${error.message}` },
      { status: 500 }
    );
  }
}

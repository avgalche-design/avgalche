import { shopifyFetch } from "../lib/shopify";

const baseUrl = "https://www.avgalche.com";

export default async function sitemap() {
  // Fetch product handles & updated time
  const PRODUCTS_HANDLE_QUERY = `
    {
      products(first: 100) {
        edges {
          node {
            handle
            updatedAt
          }
        }
      }
    }
  `;

  const COLLECTIONS_HANDLE_QUERY = `
    {
      collections(first: 50) {
        edges {
          node {
            handle
            updatedAt
          }
        }
      }
    }
  `;

  const productData = await shopifyFetch({ query: PRODUCTS_HANDLE_QUERY });
  const collectionData = await shopifyFetch({
    query: COLLECTIONS_HANDLE_QUERY,
  });

  const products = productData?.products?.edges ?? [];
  const collections = collectionData?.collections?.edges ?? [];

  // Base static routes
  const routes = [
    { url: baseUrl, lastModified: new Date().toISOString(), priority: 1.0 },
    {
      url: `${baseUrl}/collections`,
      lastModified: new Date().toISOString(),
      priority: 0.8,
    },
  ];

  // Product URLs
  const productUrls = products.map(({ node }) => ({
    url: `${baseUrl}/products/${node.handle}`,
    lastModified: node.updatedAt,
    priority: 0.9,
  }));

  // Collection URLs
  const collectionUrls = collections.map(({ node }) => ({
    url: `${baseUrl}/collections/${node.handle}`,
    lastModified: node.updatedAt,
    priority: 0.8,
  }));

  const allUrls = [...routes, ...productUrls, ...collectionUrls];

  return allUrls.map(({ url, lastModified, priority }) => ({
    url,
    lastModified,
    priority,
  }));
}

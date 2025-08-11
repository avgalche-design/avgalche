// lib/shopify.js
export async function shopifyFetch({ query, variables = {} }) {
  const endpoint = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`Shopify fetch failed: ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Shopify GraphQL returned errors");
  }
  return json.data;
}

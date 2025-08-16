export async function shopifyFetch(
  { query, variables = {} },
  fetchOptions = {}
) {
  const endpoint = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2025-07/graphql.json`;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  // Prepare fetch options, including only one cache strategy
  const fetchSettings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  };

  // Add cache or next option exclusively
  if (fetchOptions.cache && fetchOptions.next) {
    // Prefer fetchOptions.cache if both are provided
    fetchSettings.cache = fetchOptions.cache;
  } else if (fetchOptions.cache) {
    fetchSettings.cache = fetchOptions.cache;
  } else if (fetchOptions.next) {
    fetchSettings.next = fetchOptions.next;
  } else {
    // Default to no-store if none provided
    fetchSettings.cache = "no-store";
  }

  const res = await fetch(endpoint, fetchSettings);

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

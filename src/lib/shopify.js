export async function shopifyFetch(
  { query, variables = {} },
  fetchOptions = {}
) {
  const endpoint = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2025-07/graphql.json`;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  // Check if environment variables are configured
  if (!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || !process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    throw new Error("Shopify environment variables are not configured. Please set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN");
  }

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
    // Default to force-cache for static generation
    fetchSettings.cache = "force-cache";
  }

  try {
    const res = await fetch(endpoint, fetchSettings);

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error("Unauthorized: Please check your Shopify Storefront Access Token");
      } else if (res.status === 404) {
        throw new Error("Not Found: Please check your Shopify Store Domain");
      } else {
        throw new Error(`Shopify fetch failed: ${res.status} ${res.statusText}`);
      }
    }

    const json = await res.json();
    if (json.errors) {
      console.error("Shopify GraphQL errors:", json.errors);
      throw new Error("Shopify GraphQL returned errors");
    }
    return json.data;
  } catch (error) {
    if (error.message.includes("environment variables")) {
      throw error;
    }
    console.error("Shopify fetch error:", error);
    throw new Error(`Shopify fetch failed: ${error.message}`);
  }
}

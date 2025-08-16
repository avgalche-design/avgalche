import { NextResponse } from "next/server";

const shopifyFetch = async ({ query, variables = {} }) => {
  const endpoint = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2025-07/graphql.json`;
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
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors) {
    console.error("Shopify GraphQL errors:", json.errors);
    throw new Error("Shopify GraphQL error");
  }
  return json.data;
};

export async function POST(request) {
  try {
    const { action, cartId, variantId, quantity, lineId } =
      await request.json();

    if (action === "get" && cartId) {
      const query = `
        query getCart($cartId: ID!) {
          cart(id: $cartId) {
            id
            checkoutUrl
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      price {
                        amount
                        currencyCode
                      }
                      product { 
                        title 
                        images(first:1){
                          edges{
                            node{
                              url
                            }
                          }
                        } 
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;
      const data = await shopifyFetch({ query, variables: { cartId } });
      return NextResponse.json(data.cart);
    }

    if (action === "create") {
      const query = `
        mutation {
          cartCreate {
            cart {
              id
              checkoutUrl
              lines(first: 10) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        price {
                          amount
                          currencyCode
                        }
                        product { 
                          title 
                          images(first:1){
                            edges{
                              node{
                                url
                              }
                            }
                          } 
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;
      const data = await shopifyFetch({ query });
      return NextResponse.json(data.cartCreate.cart);
    }

    if (action === "add") {
      const addQuery = `
        mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart {
              id
              checkoutUrl
              lines(first: 10) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        price {
                          amount
                          currencyCode
                        }
                        product { 
                          title 
                          images(first:1){
                            edges{
                              node{
                                url
                              }
                            }
                          } 
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;

      const data = await shopifyFetch({
        query: addQuery,
        variables: {
          cartId,
          lines: [{ merchandiseId: variantId, quantity }],
        },
      });
      return NextResponse.json(data.cartLinesAdd.cart);
    }

    if (action === "remove") {
      const removeQuery = `
        mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
          cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
            cart {
              id
              checkoutUrl
              lines(first: 10) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        price {
                          amount
                          currencyCode
                        }
                        product { 
                          title 
                          images(first:1){
                            edges{
                              node{
                                url
                              }
                            }
                          } 
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;

      const data = await shopifyFetch({
        query: removeQuery,
        variables: {
          cartId,
          lineIds: [lineId],
        },
      });
      return NextResponse.json(data.cartLinesRemove.cart);
    }

    if (action === "update") {
      const updateQuery = `
        mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
          cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart {
              id
              checkoutUrl
              lines(first: 10) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        price {
                          amount
                          currencyCode
                        }
                        product { 
                          title 
                          images(first:1){
                            edges{
                              node{
                                url
                              }
                            }
                          } 
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;

      const data = await shopifyFetch({
        query: updateQuery,
        variables: {
          cartId,
          lines: [{ id: lineId, quantity }],
        },
      });
      return NextResponse.json(data.cartLinesUpdate.cart);
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Cart API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

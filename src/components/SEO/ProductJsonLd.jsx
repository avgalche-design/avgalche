"use client";

import React from "react";

export default function ProductJsonLd({ product, price }) {
  if (!product) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images?.edges.map((img) => img.node.url),
    description: product.description,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "AV GaLche",
    },
    offers: {
      "@type": "Offer",
      url: `https://www.avgalche.com/products/${product.handle}`,
      priceCurrency: price?.currencyCode || "INR",
      price: price?.amount || "0",
      availability: product.variants?.edges?.[0]?.node?.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

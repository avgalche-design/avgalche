// app/products/[handle]/ProductPageClient.js
"use client";
import { useState, useEffect } from "react";
import YouMayAlsoLike from "../components/YouMayAlsoLike";
import Image from "next/image";

function RenderShopifyRichText({ richTextJson }) {
  if (!richTextJson) return null;

  let data;
  try {
    data =
      typeof richTextJson === "string"
        ? JSON.parse(richTextJson)
        : richTextJson;
  } catch {
    // If parsing fails, render as plain text
    return <p>{richTextJson}</p>;
  }

  // Recursively render rich text nodes
  function renderNodes(nodes) {
    return nodes.map((node, idx) => {
      switch (node.type) {
        case "paragraph":
          return (
            <p key={idx} className="mb-4">
              {renderNodes(node.children)}
            </p>
          );

        case "text":
          let textElement = node.value;
          if (node.marks) {
            node.marks.forEach((mark) => {
              switch (mark.type) {
                case "bold":
                  textElement = <strong key={idx}>{textElement}</strong>;
                  break;
                case "italic":
                  textElement = <em key={idx}>{textElement}</em>;
                  break;
                // Add underline or other formats if needed
                default:
                  break;
              }
            });
          }
          return textElement;

        case "list":
          if (node.listType === "ordered") {
            return (
              <ol key={idx} className="list-decimal list-inside mb-4">
                {renderNodes(node.children)}
              </ol>
            );
          }
          return (
            <ul key={idx} className="list-disc list-inside mb-4">
              {renderNodes(node.children)}
            </ul>
          );

        case "list-item":
          return <li key={idx}>{renderNodes(node.children)}</li>;

        case "heading":
          const Tag = `h${node.level || 3}`;
          return (
            <Tag key={idx} className="font-semibold mt-4 mb-2">
              {renderNodes(node.children)}
            </Tag>
          );

        case "link":
          return (
            <a
              key={idx}
              href={node.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              {renderNodes(node.children)}
            </a>
          );

        default:
          // For unknown node types just render children recursively
          if (node.children) {
            return <>{renderNodes(node.children)}</>;
          }
          return null;
      }
    });
  }

  return <div>{renderNodes(data.children || [])}</div>;
}

// Animated Background Component
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 ">
      {/* Base solid black background */}
      <div className="absolute inset-0 bg-black">
        {/* Gradients: overlays only, not changing the base background */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-white/[0.02] to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-radial from-neutral-300/[0.01] to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );
}

// Enhanced Size Guide Component
function SizeGuide({ sizeGuideData }) {
  const defaultSizeGuide = {
    title: "Size Guide",
    measurements: [
      { size: "XS", chest: "86-91cm", waist: "71-76cm", length: "66cm" },
      { size: "S", chest: "91-96cm", waist: "76-81cm", length: "68cm" },
      { size: "M", chest: "96-101cm", waist: "81-86cm", length: "70cm" },
      { size: "L", chest: "101-106cm", waist: "86-91cm", length: "72cm" },
      { size: "XL", chest: "106-111cm", waist: "91-96cm", length: "74cm" },
      { size: "XXL", chest: "111-116cm", waist: "96-101cm", length: "76cm" },
    ],
  };

  const sizeData = sizeGuideData ? JSON.parse(sizeGuideData) : defaultSizeGuide;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-xl font-extralight tracking-[0.3em] text-white mb-2 uppercase">
          {sizeData.title}
        </h3>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent mx-auto opacity-30"></div>
      </div>

      <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-lg overflow-hidden shadow-2xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-gradient-to-r from-white/[0.02] to-transparent">
              <th className="text-left py-4 px-6 font-extralight tracking-[0.15em] text-neutral-300 text-xs uppercase">
                Size
              </th>
              <th className="text-left py-4 px-6 font-extralight tracking-[0.15em] text-neutral-300 text-xs uppercase">
                Chest
              </th>
              <th className="text-left py-4 px-6 font-extralight tracking-[0.15em] text-neutral-300 text-xs uppercase">
                Waist
              </th>
              <th className="text-left py-4 px-6 font-extralight tracking-[0.15em] text-neutral-300 text-xs uppercase">
                Length
              </th>
            </tr>
          </thead>
          <tbody>
            {sizeData.measurements.map((measurement, index) => (
              <tr
                key={index}
                className="border-b border-white/5 hover:bg-white/[0.01] transition-all duration-500 group"
              >
                <td className="py-4 px-6 font-light text-white group-hover:text-neutral-100 transition-colors">
                  {measurement.size}
                </td>
                <td className="py-4 px-6 text-neutral-400 group-hover:text-neutral-300 transition-colors font-light">
                  {measurement.chest}
                </td>
                <td className="py-4 px-6 text-neutral-400 group-hover:text-neutral-300 transition-colors font-light">
                  {measurement.waist}
                </td>
                <td className="py-4 px-6 text-neutral-400 group-hover:text-neutral-300 transition-colors font-light">
                  {measurement.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-neutral-500 tracking-[0.1em] text-center font-light">
        All measurements are approximate and may vary between styles
      </p>
    </div>
  );
}

export default function ProductPageClient({
  product,
  price,
  relatedProducts,
  washCareInfo,
  shippingInfo,
  sizeGuideData,
}) {
  const [activeTab, setActiveTab] = useState("description");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false); // reset loader when selected image changes
  }, [selectedImageIndex]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const tabs = [
    { id: "description", label: "Description" },
    { id: "size-guide", label: "Size Guide" },
    { id: "wash-care", label: "Wash & Care" },
    { id: "shipping", label: "Shipping" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent mx-auto opacity-40"></div>
            </div>
            <p className="text-neutral-300 leading-[1.8] font-extralight tracking-[0.02em] text-base text-center max-w-2xl mx-auto">
              {product.description ||
                "Embodying the essence of contemporary luxury, this piece transcends ordinary fashion. Meticulously crafted from premium materials with uncompromising attention to detail, it represents the perfect harmony between avant-garde design and timeless sophistication."}
            </p>
          </div>
        );
      case "size-guide":
        return <SizeGuide sizeGuideData={sizeGuideData} />;
      case "wash-care":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-extralight tracking-[0.3em] text-white mb-2 uppercase">
                Care Instructions
              </h3>
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent mx-auto opacity-30"></div>
            </div>
            <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-lg p-8">
              <div className="space-y-3">
                <RenderShopifyRichText richTextJson={washCareInfo} />
              </div>
            </div>
          </div>
        );
      case "shipping":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-extralight tracking-[0.3em] text-white mb-2 uppercase">
                Shipping Information
              </h3>
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent mx-auto opacity-30"></div>
            </div>
            <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-lg p-8">
              <div className="space-y-3">
                {shippingInfo.split("\n").map(
                  (line, index) =>
                    line.trim() && (
                      <div
                        key={index}
                        className="flex items-center space-x-3 group"
                      >
                        <div className="w-1 h-1 bg-white/40 rounded-full group-hover:bg-white/60 transition-colors"></div>
                        <p className="text-sm font-extralight tracking-[0.05em] text-neutral-300 group-hover:text-white transition-colors">
                          {line.trim().replace("•", "").trim()}
                        </p>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <AnimatedBackground />

      <main className="relative z-10 text-white min-h-screen">
        {/* Hero Section */}
        <div
          className={`px-6 md:px-12 lg:px-20 py-24 max-w-8xl mx-auto transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* LEFT - Product Images */}
            <div className="space-y-8">
              {/* Main Image */}
              <div className="relative group">
                <div className="aspect-[4/5] bg-gradient-to-br from-neutral-900/50 to-black/50 backdrop-blur-sm border border-white/5 overflow-hidden rounded-sm shadow-2xl">
                  {product.images.edges.length > 0 ? (
                    <>
                      <Image
                        key={selectedImageIndex}
                        src={
                          product.images.edges[selectedImageIndex]?.node.url ||
                          product.images.edges[0].node.url
                        }
                        alt={
                          product.images.edges[selectedImageIndex]?.node
                            .altText || product.title
                        }
                        fill
                        sizes="(max-width:768px) 100vw, 50vw"
                        className={`object-cover transition-transform duration-1000 ${
                          imageLoaded
                            ? "scale-100 opacity-100"
                            : "scale-105 opacity-0"
                        } group-hover:scale-110`}
                        onLoadingComplete={() => setImageLoaded(true)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-neutral-500 font-extralight tracking-[0.2em] text-sm uppercase">
                        No Image Available
                      </span>
                    </div>
                  )}
                </div>

                {/* Image overlay effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-white/[0.01] via-transparent to-white/[0.01] rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>

              {/* Thumbnail Images */}
              {product.images.edges.length > 1 && (
                <div className="flex gap-4 justify-center">
                  {product.images.edges.map(({ node }, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative aspect-[4/5] w-16 bg-gradient-to-br from-neutral-900/50 to-black/50 backdrop-blur-sm border overflow-hidden rounded-sm transition-all duration-500 ${
                        selectedImageIndex === index
                          ? "border-white/40 scale-110 shadow-lg"
                          : "border-white/10 opacity-60 hover:opacity-100 hover:scale-105"
                      }`}
                    >
                      <img
                        src={node.url}
                        alt={node.altText || product.title}
                        className="w-full h-full object-cover"
                      />
                      {selectedImageIndex === index && (
                        <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT - Product Details */}
            <div className="lg:sticky lg:top-8 space-y-10">
              {/* Product Header */}
              <div className="text-center space-y-6 pb-10 border-b border-white/10">
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-5xl font-extralight tracking-[0.1em] text-white leading-tight">
                    {product.title}
                  </h1>
                  <p className="text-xs text-neutral-400 uppercase tracking-[0.3em] font-extralight">
                    {product.productType}
                  </p>
                </div>

                {price && (
                  <div className="pt-6">
                    <div className="inline-block">
                      <p className="text-3xl font-extralight tracking-[0.05em] text-white">
                        {price.currencyCode}{" "}
                        {parseFloat(price.amount).toFixed(2)}
                      </p>
                      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mt-2"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Size Selection */}
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-sm uppercase tracking-[0.3em] text-neutral-400 font-extralight mb-4">
                    Select Size
                  </h3>
                  <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto"></div>
                </div>

                <div className="flex flex-wrap gap-3 justify-center">
                  {product.variants.edges.map(({ node }) => (
                    <button
                      key={node.id}
                      disabled={!node.availableForSale}
                      onClick={() => setSelectedVariant(node)}
                      className={`
                        relative w-14 h-14 border transition-all duration-500 text-xs font-extralight tracking-wider rounded-sm backdrop-blur-sm
                        ${
                          selectedVariant?.id === node.id
                            ? "border-white bg-white/10 text-white shadow-lg scale-110"
                            : node.availableForSale
                            ? "border-white/20 hover:border-white/60 hover:bg-white/5 hover:scale-105 text-neutral-300 hover:text-white"
                            : "border-white/5 text-white cursor-not-allowed opacity-30"
                        }
                      `}
                    >
                      {node.title}
                      {selectedVariant?.id === node.id && (
                        <div className="absolute -inset-1 bg-gradient-to-r from-white/10 via-transparent to-white/10 rounded-sm blur-sm"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-6">
                <button
                  className={`
                    relative w-full py-4 text-sm uppercase tracking-[0.2em] font-light transition-all duration-500 rounded-sm backdrop-blur-sm overflow-hidden group
                    ${
                      selectedVariant
                        ? "bg-white text-black hover:bg-neutral-100 hover:scale-[1.02] shadow-lg"
                        : "bg-white/10 text-neutral-400 cursor-not-allowed border border-white/10"
                    }
                  `}
                  disabled={!selectedVariant}
                >
                  <span className="relative z-10">
                    {selectedVariant ? "Add to Cart" : "Select Size"}
                  </span>
                  {selectedVariant && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  )}
                </button>

                <button className="relative w-full border border-white/20 py-4 text-sm uppercase tracking-[0.2em] font-extralight hover:border-white/60 hover:bg-white/5 transition-all duration-500 rounded-sm backdrop-blur-sm group overflow-hidden">
                  <span className="relative z-10">Add to Wishlist</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </button>
              </div>

              {/* Product Information Tabs */}
              <div className="pt-10 border-t border-white/10">
                {/* Tab Navigation */}
                <nav className="flex justify-center gap-8 mb-12">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative pb-3 text-xs font-extralight tracking-[0.15em] uppercase transition-all duration-500 ${
                        activeTab === tab.id
                          ? "text-white"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"></div>
                      )}
                    </button>
                  ))}
                </nav>

                {/* Tab Content */}
                <div className="min-h-[300px]">{renderTabContent()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like Section */}
        <div className="px-6 md:px-12 lg:px-20 py-20 border-t border-white/10 backdrop-blur-sm">
          <YouMayAlsoLike products={relatedProducts} />
        </div>
      </main>
    </>
  );
}

"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// export const metadata = {
//   title: "Season Collections - AV GaLche",
//   description:
//     "Explore AV GaLche’s curated seasonal collections featuring timeless designs and sophisticated styles.",
//   keywords: [
//     "AV GaLche collections",
//     "seasonal fashion",
//     "luxury fashion India",
//     "timeless designs",
//     "sophisticated style",
//   ],
//   openGraph: {
//     title: "Season Collections | AV GaLche",
//     description:
//       "Explore AV GaLche’s curated seasonal collections featuring timeless designs and sophisticated styles.",
//     url: "https://www.avgalche.com/season-collection",
//     images: [
//       {
//         url: "https://images.unsplash.com/photo-1628535890509-2a8b79b9b034?q=80&w=687&auto=format&fit=crop",
//         width: 687,
//         height: 1024,
//         alt: "Seasonal Collection",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Season Collections | AV GaLche",
//     description:
//       "Explore AV GaLche’s curated seasonal collections featuring timeless designs and sophisticated styles.",
//     images: [
//       "https://images.unsplash.com/photo-1628535890509-2a8b79b9b034?q=80&w=687&auto=format&fit=crop",
//     ],
//   },
// };

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const seasonData = {
  newdrops: {
    title: "New Drops",
    description:
      "Embrace the warmth with our newly curated essentials. Light, breathable fabrics meet timeless elegance in every piece.",
    images: [
      {
        id: 1,
        url: "/images/green1.jpg",
        alt: "Summer Collection Main",
        type: "large",
      },
      {
        id: 2,
        url: "/images/green2.webp",
        alt: "Summer Style 1",
        type: "small",
      },
      {
        id: 3,
        url: "/images/green3.webp",
        alt: "Summer Style 2",
        type: "small",
      },
      {
        id: 4,
        url: "/images/green4.webp",
        alt: "Summer Style 3",
        type: "small",
      },
      {
        id: 5,
        url: "/images/pink.webp",
        alt: "Summer Collection Secondary",
        type: "large",
      },
      {
        id: 6,
        url: "/images/pink1.webp",
        alt: "Summer Style 4",
        type: "small",
      },
      {
        id: 7,
        url: "/images/pink2.webp",
        alt: "Summer Style 5",
        type: "small",
      },
      {
        id: 8,
        url: "/images/pink3.webp",
        alt: "Summer Style 6",
        type: "small",
      },
      {
        id: 9,
        url: "/images/white.webp",
        alt: "Winter Collection Main",
        type: "large",
      },
      {
        id: 10,
        url: "/images/white1.webp",
        alt: "Winter Style 1",
        type: "small",
      },
      {
        id: 11,
        url: "/images/white2.webp",
        alt: "Winter Style 2",
        type: "small",
      },
      {
        id: 12,
        url: "/images/white3.webp",
        alt: "Winter Style 3",
        type: "small",
      },
      {
        id: 13,
        url: "/images/brown.webp",
        alt: "Winter Collection Secondary",
        type: "large",
      },
      {
        id: 14,
        url: "/images/brown1.webp",
        alt: "Winter Style 4",
        type: "small",
      },
      {
        id: 15,
        url: "/images/brown2.webp",
        alt: "Winter Style 5",
        type: "small",
      },
      {
        id: 16,
        url: "/images/brown3.jpg",
        alt: "Winter Style 6",
        type: "small",
      },
    ],
  },
};

function CollectionSection({ collection }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          headerRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.2 }
        );

        const images = gsap.utils.toArray(
          sectionRef.current.querySelectorAll(".image-item")
        );
        images.forEach((image) => {
          gsap.fromTo(
            image,
            { y: 100, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: image,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        images.forEach((image) => {
          const img = image.querySelector("img");
          const overlay = image.querySelector(".image-overlay");
          image.addEventListener("mouseenter", () => {
            gsap.to(img, { scale: 1.05, duration: 0.6, ease: "power2.out" });
            gsap.to(overlay, { opacity: 0.2, duration: 0.3 });
          });
          image.addEventListener("mouseleave", () => {
            gsap.to(img, { scale: 1, duration: 0.6, ease: "power2.out" });
            gsap.to(overlay, { opacity: 0, duration: 0.3 });
          });
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <>
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: collection.title,
            description: collection.description,
            url: "https://www.avgalche.com/season-collection",
            image: collection.images.map((img) => img.url),
          }),
        }}
      /> */}

      <div ref={sectionRef} className="min-h-screen bg-white">
        {/* Header */}
        <div className="border-b border-black/10">
          <div ref={headerRef} className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.05em] text-black mb-4">
              {collection.title}
            </h1>
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-black/40 to-transparent mb-6" />
            <p className="text-lg text-black/70 max-w-2xl leading-relaxed">
              {collection.description}
            </p>
          </div>
        </div>

        {/* Image Grid */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="space-y-8">
            {/* First Large Image */}
            <div className="image-item group cursor-pointer overflow-hidden flex justify-center">
              <div className="relative aspect-[2/3] overflow-hidden max-w-2xl">
                <img
                  src={collection.images[0].url}
                  alt={collection.images.alt}
                  className="w-full h-full object-cover"
                />
                <div className="image-overlay absolute inset-0 bg-black/0" />
              </div>
            </div>

            {/* First Row of 3 Small Images */}
            <div className="flex mt-10 justify-center">
              <div className="grid grid-cols-3 gap-4 max-w-4xl">
                {collection.images.slice(1, 4).map((image) => (
                  <div
                    key={image.id}
                    className="image-item group cursor-pointer overflow-hidden"
                  >
                    <div className="relative aspect-[2/3] overflow-hidden max-w-xs">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                      <div className="image-overlay absolute inset-0 bg-black/0" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Second Large Image */}
            <div className="image-item group cursor-pointer overflow-hidden flex justify-center">
              <div className="relative aspect-[2/3] overflow-hidden max-w-2xl">
                <img
                  src={collection.images[4].url}
                  alt={collection.images.alt}
                  className="w-full h-full object-cover"
                />
                <div className="image-overlay absolute inset-0 bg-black/0" />
              </div>
            </div>

            {/* Second Row of 3 Small Images */}
            <div className="flex justify-center">
              <div className="grid grid-cols-3 gap-4 max-w-4xl">
                {collection.images.slice(5, 8).map((image) => (
                  <div
                    key={image.id}
                    className="image-item group cursor-pointer overflow-hidden"
                  >
                    <div className="relative aspect-[2/3] overflow-hidden max-w-xs">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                      <div className="image-overlay absolute inset-0 bg-black/0" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Third Large Image (Winter) */}
            <div className="image-item group cursor-pointer overflow-hidden flex justify-center">
              <div className="relative aspect-[2/3] overflow-hidden max-w-2xl">
                <img
                  src={collection.images[8].url}
                  alt={collection.images.alt}
                  className="w-full h-full object-cover"
                />
                <div className="image-overlay absolute inset-0 bg-black/0" />
              </div>
            </div>

            {/* Third Row of 3 Small Images */}
            <div className="flex mt-10 justify-center">
              <div className="grid grid-cols-3 gap-4 max-w-4xl">
                {collection.images.slice(9, 12).map((image) => (
                  <div
                    key={image.id}
                    className="image-item group cursor-pointer overflow-hidden"
                  >
                    <div className="relative aspect-[2/3] overflow-hidden max-w-xs">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                      <div className="image-overlay absolute inset-0 bg-black/0" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fourth Large Image */}
            <div className="image-item group cursor-pointer overflow-hidden flex justify-center">
              <div className="relative aspect-[2/3] overflow-hidden max-w-2xl">
                <img
                  src={collection.images[12].url}
                  alt={collection.images.alt}
                  className="w-full h-full object-cover"
                />
                <div className="image-overlay absolute inset-0 bg-black/0" />
              </div>
            </div>

            {/* Fourth Row of 3 Small Images */}
            <div className="flex justify-center">
              <div className="grid grid-cols-3 gap-4 max-w-4xl">
                {collection.images.slice(13, 16).map((image) => (
                  <div
                    key={image.id}
                    className="image-item group cursor-pointer overflow-hidden"
                  >
                    <div className="relative aspect-[2/3] overflow-hidden max-w-xs">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                      <div className="image-overlay absolute inset-0 bg-black/0" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="border-black/10 py-16">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-3xl md:text-4xl font-extralight tracking-[0.05em] text-black mb-6">
              Discover More
            </h2>
            <p className="text-black/70 mb-8 max-w-2xl mx-auto">
              Explore our complete collection and find your perfect style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-block bg-black rounded-md text-white px-8 py-4 text-sm uppercase tracking-[0.2em] font-light hover:bg-neutral-800 transition-colors"
              >
                Shop Collection
              </Link>
              <Link
                href="/"
                className="inline-block border rounded-md border-black text-black px-8 py-4 text-sm uppercase tracking-[0.2em] font-light hover:bg-black hover:text-white transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function SeasonCollectionsStatic() {
  return <CollectionSection collection={seasonData.newdrops} />;
}

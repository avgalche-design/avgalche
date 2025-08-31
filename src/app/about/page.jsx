import Link from "next/link";

import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <main className="w-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-64 py-16">
        {/* Heading */}
        <div className="w-full   mt-28">
          <h1 className="text-2xl md:text-5xl font-light  leading-tight  md:text-center text-black">
            Discover our passion <br /> for fashion
          </h1>

          {/* Text + Link Row */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 mt-6">
            {/* Left paragraph */}
            <p className="text-[#70706F] text-base md:text-sm leading-relaxed md:text-left w-full md:max-w-md">
              Founded by Gurvansh Singh Bhatia and Aashman Mahajan, AV GaLche is
              redefining Indian luxury. Inspired by real stories and timeless
              classics, every piece blends heritage with refined modernity —
              designed to resonate across generations.
            </p>

            {/* Right link */}
            <Link href="/products">
              <button className="relative text-black cursor-pointer active:bg-neutral-200 md:active:bg-inherit  p-1 text-sm  group">
                <h2>Visit our Collection</h2>
                <span className="absolute left-0 bottom-0 h-[2px] w-1/4 bg-black transition-all duration-500 group-hover:w-full"></span>
                <span className="absolute right-0 bottom-0 h-[2px] w-1/4 bg-black transition-all duration-500 group-hover:w-full"></span>
              </button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
          {/* Left Image */}
          <div className="relative w-full h-[400px]">
            <Image
              src="/images/p3.avif"
              alt="Fashion Women"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Image */}
          <div className="relative w-full h-[400px]">
            <Image
              src="/images/p4.avif"
              alt="Fashion Men and Women"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </main>

      <section className="bg-white text-gray-900 px-6 py-20 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-light text-center mb-16">
            The Heart of AV GaLche
          </h2>

          {/* Content Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Image */}
            <div className="relative w-full h-[450px]  overflow-hidden ">
              <Image
                src="/images/p2.avif"
                alt="AV GaLche Founders"
                fill
                className="object-cover"
              />
            </div>

            {/* Right Text */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-light mb-3">Our Story</h3>
                <p className="text-gray-600 leading-relaxed">
                  AV GaLche began as a shared dream of Gurvansh Singh Bhatia and
                  Aashman Mahajan — not just to create clothing, but to craft a
                  legacy of Indian luxury rooted in authenticity.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-light mb-3">Philosophy</h3>
                <p className="text-gray-600 leading-relaxed">
                  Each piece is{" "}
                  <span className="font-semibold">inspired by reality</span>,
                  transforming real stories into timeless silhouettes. We revive
                  classics through a modern, luxurious lens, steering clear of
                  fleeting trends.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-light mb-3">Our Ambition</h3>
                <p className="text-gray-600 leading-relaxed">
                  AV GaLche stands for heritage reinvented and authenticity
                  celebrated — a vision to redefine Indian luxury on the global
                  stage.
                </p>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="mt-16 text-center">
            <p className="uppercase tracking-widest font-medium text-gray-800 text-sm">
              Heritage Reinvented • Authenticity Celebrated • Indian Luxury
              Elevated
            </p>
          </div>
        </div>
      </section>

      {/* <div className=" min-h-[200vh]">
        <StoryHero />
      </div> */}
    </>
  );
}

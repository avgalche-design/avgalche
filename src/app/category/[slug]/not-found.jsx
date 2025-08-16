import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative bg-white text-black min-h-screen flex items-center justify-center">
      <div className="text-center space-y-8 px-6">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.05em] text-black leading-tight">
            Category Not Found
          </h1>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-black/40 to-transparent mx-auto"></div>
          <p className="text-neutral-600 text-base md:text-lg leading-[1.8] font-extralight tracking-[0.02em] max-w-2xl mx-auto">
            The category you're looking for doesn't exist. Please check the URL
            or browse our available collections.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/products"
            className="inline-block bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Browse All Products
          </Link>
          <div className="block">
            <Link
              href="/"
              className="text-neutral-500 hover:text-black transition-colors font-light"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

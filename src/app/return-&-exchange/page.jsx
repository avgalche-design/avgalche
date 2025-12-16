import Link from "next/link";

export default function ReturnExchangePolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-black/10">
        <div className="max-w-4xl mx-auto px-6 pt-20 py-12">
          <h1 className="text-4xl md:text-5xl font-extralight tracking-[0.05em] text-black mb-4">
            Return & Exchange Policy
          </h1>

          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-black/40 to-transparent"></div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-lg max-w-none text-black/80 leading-relaxed">
          <p className="text-lg mb-8">
            At AV Galche, each piece is crafted with attention to detail and
            quality. To maintain fairness and transparency, please review our
            return and exchange policy carefully before making a purchase.
          </p>

          {/* Return & Exchange Window */}
          <h2 className="text-2xl font-light tracking-wide text-black mt-12 mb-6">
            Return & Exchange Window
          </h2>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>
              Returns and exchanges are accepted within <strong>7 days</strong>{" "}
              from the date of delivery.
            </li>
            <li>
              Requests raised after 7 days will not be eligible for return or
              exchange.
            </li>
          </ul>

          {/* Exchange Policy */}
          <h2 className="text-2xl font-light tracking-wide text-black mt-12 mb-6">
            Exchange Policy
          </h2>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Exchanges are accepted only for size-related issues.</li>
            <li>Customers may opt for:</li>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>The same product in a different size, or</li>
              <li>A different product from our available collection.</li>
            </ul>
            <li>All exchanges are subject to stock availability.</li>
            <li>Only one exchange is allowed per order.</li>
          </ul>

          {/* Return Policy */}
          <h2 className="text-2xl font-light tracking-wide text-black mt-12 mb-6">
            Return Policy
          </h2>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>
              Returns will be accepted only after the product passes our quality
              inspection.
            </li>
            <li>
              Once approved, the refund will be initiated as per the terms
              mentioned below.
            </li>
          </ul>

          {/* Quality Check Conditions */}
          <h2 className="text-2xl font-light tracking-wide text-black mt-12 mb-6">
            Quality Check Conditions
          </h2>
          <p className="mb-4">
            To be eligible for a return or exchange, the product must:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Be unused for extended periods, unwashed, and unaltered</li>
            <li>Be returned with original tags and packaging</li>
            <li>Have no stains, damage, odors, or signs of misuse</li>
            <li>Meet our internal quality standards upon inspection</li>
          </ul>

          <p className="mb-8">
            If the product does not pass the quality check, the return or
            exchange request will be declined, and the product will be shipped
            back to the customer.
          </p>

          {/* Shipping & Refund Deductions */}
          <h2 className="text-2xl font-light tracking-wide text-black mt-12 mb-6">
            Shipping & Refund Deductions
          </h2>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Shipping charges are non-refundable.</li>
            <li>
              Outbound and/or reverse shipping costs (typically ₹200–₹400,
              depending on location and courier) will be deducted from the
              refund amount, if applicable.
            </li>
            <li>
              Any additional logistics costs incurred may also be adjusted
              against the refund.
            </li>
          </ul>

          {/* Refund Processing */}
          <h2 className="text-2xl font-light tracking-wide text-black mt-12 mb-6">
            Refund Processing
          </h2>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>
              Refunds (once approved) will be processed to the original mode of
              payment.
            </li>
            <li>
              Refund initiation will occur within 48–72 hours after approval.
            </li>
          </ul>

          {/* Non-Returnable Items */}
          <h2 className="text-2xl font-light tracking-wide text-black mt-12 mb-6">
            Non-Returnable Items
          </h2>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Products marked as Final Sale</li>
            <li>Discounted or promotional items</li>
            <li>
              Custom or limited-edition pieces (unless received damaged or
              defective)
            </li>
          </ul>

          {/* Damaged or Incorrect Product */}
          <h2 className="text-2xl font-light tracking-wide text-black mt-12 mb-6">
            Damaged or Incorrect Product
          </h2>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>
              If you receive a damaged, defective, or incorrect product, please
              contact us within 24 hours of delivery with clear images and an
              unboxing video.
            </li>
            <li>Claims raised without proper proof may not be accepted.</li>
          </ul>

          {/* Contact */}
          <h2 className="text-2xl font-light tracking-wide text-black mt-12 mb-6">
            Contact Us
          </h2>
          <p className="mb-8">
            For any return or exchange-related queries, please reach out to us
            at:
            <br />
            <strong>📧 support@avgalche.com</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

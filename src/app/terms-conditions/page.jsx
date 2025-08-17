import Link from "next/link";

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-black/10">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Link 
            href="/" 
            className="inline-block mb-8 text-sm uppercase tracking-widest text-black/60 hover:text-black transition-colors"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-extralight tracking-[0.05em] text-black mb-4">
            Terms & Conditions
          </h1>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-black/40 to-transparent"></div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-lg max-w-none text-black/80 leading-relaxed">
          <p className="text-lg mb-8">
            For the purpose of these Terms and Conditions, The term "we", "us", "our" used anywhere on this page shall mean AG Enterprises, whose registered/operational office is New Delhi DELHI 110015 . "you", "your", "user", "visitor" shall mean any natural or legal person who is visiting our website and/or agreed to purchase from us.
          </p>

          <p className="mb-8">
            Your use of the website and/or purchase from us are governed by following Terms and Conditions:
          </p>

          <ul className="list-disc pl-6 mb-8 space-y-4">
            <li>
              The content of the pages of this website is subject to change without notice.
            </li>
            <li>
              Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
            </li>
            <li>
              Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through our website and/or product pages meet your specific requirements.
            </li>
            <li>
              Our website contains material which is owned by or licensed to us. This material includes, but are not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
            </li>
            <li>
              All trademarks reproduced in our website which are not the property of, or licensed to, the operator are acknowledged on the website.
            </li>
            <li>
              Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.
            </li>
            <li>
              From time to time our website may also include links to other websites. These links are provided for your convenience to provide further information.
            </li>
            <li>
              You may not create a link to our website from another website or document without AG Enterprises's prior written consent.
            </li>
            <li>
              Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India.
            </li>
            <li>
              We, shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

'use client'

import Link from 'next/link'

export default function OffersBanner() {
  return (
    <section
      className="py-20"
      style={{ background: 'linear-gradient(135deg, #E8EA00, #17B59A)' }}
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-bebas text-5xl md:text-7xl lg:text-[80px] text-black mb-4">
          STUDENT COMBO AT JUST ₹99
        </h2>
        <p className="font-poppins font-medium text-base md:text-lg text-black/70 mb-8 max-w-xl mx-auto">
          Show your student ID at the counter. Valid daily 12PM–6PM.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/booking"
            className="bg-black text-yellow font-poppins font-semibold uppercase tracking-wider px-8 py-4 rounded hover:scale-105 transition-all duration-200 text-sm"
          >
            Grab the Deal
          </Link>
          <Link
            href="/menu"
            className="bg-white text-black font-poppins font-semibold uppercase tracking-wider px-8 py-4 rounded hover:scale-105 transition-all duration-200 text-sm"
          >
            See All Offers
          </Link>
        </div>
      </div>
    </section>
  )
}

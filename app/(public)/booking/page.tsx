'use client'

import DualConversionHub from '@/components/home/DualConversionHub'

export default function BookingPage() {
  return (
    <div className="pt-20">
      {/* Hero Banner */}
      <section className="bg-espresso text-on-dark py-14 text-center border-b border-latte/15 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-3">
          <span className="font-mono text-xs font-bold text-kinetic-lime uppercase tracking-widest">
            ⚡ RESERVATIONS & INSTANT PRE-ORDERS
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-oat-cream">
            Reserve Your 90ml Space
          </h1>
          <p className="font-sans text-sm sm:text-base text-latte/80 max-w-xl mx-auto">
            Book a power-outlet work desk, reserve a cozy conversation booth, plan a birthday celebration, or order ahead for quick pickup.
          </p>
        </div>
      </section>

      {/* Dual Conversion Hub */}
      <DualConversionHub />
    </div>
  )
}

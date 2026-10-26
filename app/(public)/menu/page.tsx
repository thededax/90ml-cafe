'use client'

import InteractiveMenu from '@/components/home/InteractiveMenu'
import PourScaleSpotlight from '@/components/home/PourScaleSpotlight'

export default function MenuPage() {
  return (
    <div className="pt-20">
      {/* Editorial Menu Hero Banner */}
      <section className="bg-espresso text-on-dark py-16 text-center border-b border-latte/15 relative overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, #E2FC07 0%, transparent 70%)' }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-3">
          <span className="font-mono text-xs font-bold text-kinetic-lime uppercase tracking-widest">
            ⚡ 30ML • 60ML • 90ML CRAFT POURS & BITES
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-oat-cream">
            The Complete 90ml Cafe Menu
          </h1>
          <p className="font-sans text-sm sm:text-base text-latte/80 max-w-xl mx-auto">
            Crafted for pure flavor and good vibes. Filter by hot or iced, customize your drink options, and build your pre-order tray for instant pickup or table service.
          </p>
        </div>
      </section>

      {/* Signature Pour Scale */}
      <PourScaleSpotlight />

      {/* Main Interactive Menu with Sticky Filters */}
      <InteractiveMenu />
    </div>
  )
}

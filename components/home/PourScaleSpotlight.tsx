'use client'

import { motion } from 'framer-motion'
import { useTray } from '@/lib/tray-context'

const pourScales = [
  {
    dose: '30ml',
    title: 'The Solo Kick',
    subtitle: 'Classic Single Origin',
    price: 49,
    description: 'A sharp, concentrated 30ml single shot. Dark roasted cocoa aromatics with a dense amber crema cap. Built for immediate mental clarity.',
    notes: 'Dark Cocoa • Honey Sweet • Dense Crema',
    intensity: 'Concentrated',
    caffeine: 'High Clarity',
    tags: ['Solo Shot', 'Morning Run'],
    accent: 'caramel',
  },
  {
    dose: '60ml',
    title: 'Velvet Doppio',
    subtitle: 'Balanced Double Shot',
    price: 79,
    description: 'Two synchronized ristretto pulls creating a velvet, silky body. Roasted hazelnuts and milk chocolate notes. The daily remote-worker standard.',
    notes: 'Roasted Hazelnut • Milk Chocolate • Silky',
    intensity: 'Velvet Balance',
    caffeine: 'Sustained Flow',
    tags: ['Doppio', 'Work Desk Standard'],
    accent: 'crema',
  },
  {
    dose: '90ml',
    title: 'House Signature Pour',
    subtitle: 'The Trademark 90ml Triple',
    price: 129,
    description: 'The defining heart of 90ml Cafe. Triple-ristretto layered extraction creating unmatched richness, thick crema, and pure craft indulgence.',
    notes: 'Dark Truffle • Hazelnut Crema • Triple Ristretto',
    intensity: 'Mastery & Depth',
    caffeine: 'Peak Experience',
    isHero: true,
    tags: ['⭐ House Signature', 'Barista Pick'],
    accent: 'kinetic-lime',
  },
]

export default function PourScaleSpotlight() {
  const { addItem, setIsTrayOpen } = useTray()

  const handleQuickAdd = (pour: typeof pourScales[0]) => {
    addItem(
      {
        id: `pour-${pour.dose.toLowerCase()}`,
        name: `${pour.dose} ${pour.title}`,
        price: pour.price,
        category: 'The 90ml Pour',
      },
      `${pour.dose} Dose`,
      'hot'
    )
    setIsTrayOpen(true)
  }

  return (
    <section id="the-90ml-pour" className="bg-espresso text-on-dark py-20 lg:py-28 relative border-t border-latte/10 overflow-hidden">
      {/* Ambient background glows matching hero photo */}
      <div
        className="absolute top-1/3 -right-24 w-80 h-80 rounded-full pointer-events-none opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-10 -left-24 w-80 h-80 rounded-full pointer-events-none opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #17b59a 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-roast-elevated border border-latte/20 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold text-kinetic-lime">
            <span>⚡ THE SCIENCE OF 90ML</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-oat-cream tracking-tight">
            The 30ml • 60ml • 90ml Pour Scale
          </h2>
          <p className="font-sans text-sm sm:text-base text-latte/80 leading-relaxed">
            Every pour at 90ml Cafe is weighed, timed, and extracted to exact milliliter ratios. Choose your dose to match your mood, caffeine needs, or hangout pace.
          </p>
        </div>

        {/* 3-Column Interactive Scale Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {pourScales.map((pour, i) => (
            <motion.div
              key={pour.dose}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                pour.isHero
                  ? 'bg-roast-elevated border-2 border-kinetic-lime shadow-[0_0_35px_rgba(226,252,7,0.15)] -translate-y-2'
                  : 'bg-roast-elevated/70 border border-latte/15 hover:border-latte/30'
              }`}
            >
              {/* Highlight ribbon for 90ml */}
              {pour.isHero && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-kinetic-lime text-espresso font-mono font-bold text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                  ⭐ SIGNATURE BRAND POUR
                </div>
              )}

              {/* Card Top */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="font-mono text-4xl sm:text-5xl font-extrabold text-oat-cream tabular-nums">
                    {pour.dose}
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-2xl font-bold text-kinetic-lime tabular-nums">
                      ₹{pour.price}
                    </span>
                    <span className="block font-mono text-[10px] text-latte/50">per pour</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-oat-cream">
                    {pour.title}
                  </h3>
                  <p className="font-sans text-xs font-medium text-latte/70 mt-0.5">
                    {pour.subtitle}
                  </p>
                </div>

                <p className="font-sans text-xs sm:text-sm text-latte/80 leading-relaxed">
                  {pour.description}
                </p>

                {/* Tasting notes pill */}
                <div className="bg-espresso/70 border border-latte/15 rounded-xl p-3 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-latte/60">
                    <span>Profile:</span>
                    <span className="text-kinetic-lime">{pour.intensity}</span>
                  </div>
                  <div className="font-sans text-xs text-oat-cream font-medium">
                    {pour.notes}
                  </div>
                </div>
              </div>

              {/* Card Bottom CTA */}
              <div className="pt-6 mt-6 border-t border-latte/15 space-y-3">
                <button
                  onClick={() => handleQuickAdd(pour)}
                  className={`w-full font-sans font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
                    pour.isHero
                      ? 'bg-kinetic-lime hover:bg-[#d4ec05] text-espresso shadow-md hover:scale-[1.02]'
                      : 'bg-crema hover:bg-crema-dark text-card-white hover:scale-[1.02]'
                  }`}
                >
                  <span>+ Add {pour.dose} to Tray</span>
                  <span className="font-mono font-normal">| ₹{pour.price}</span>
                </button>

                <p className="text-center font-mono text-[10px] text-latte/50">
                  {pour.caffeine} • Freshly ground to order
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

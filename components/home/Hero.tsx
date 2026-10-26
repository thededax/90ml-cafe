'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface HeroProps {
  onSelectMood?: (mood: 'caffeine' | 'iced' | 'bites') => void
}

export default function Hero({ onSelectMood }: HeroProps) {
  const handleMoodClick = (mood: 'caffeine' | 'iced' | 'bites') => {
    if (onSelectMood) {
      onSelectMood(mood)
    }
    const menuEl = document.getElementById('craft-menu')
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen bg-espresso text-on-dark flex flex-col justify-between pt-24 md:pt-28 overflow-hidden">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="90ml Cafe Signature Craft Pour & Mocktail Alchemy"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[78%_center] lg:object-center select-none"
        />

        {/* Directional & radial cinema gradients: dark backdrop on left for text legibility, 100% transparent on right to see background photo clearly */}
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/95 via-espresso/80 via-55% to-transparent lg:from-espresso/95 lg:via-espresso/60 lg:via-45% lg:to-transparent" />

        {/* Top-to-bottom edge fades for seamless header and marquee blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/90 via-transparent via-45% to-espresso/95" />

        {/* Ambient atmospheric bokeh glow */}
        <div
          className="absolute top-1/4 -left-20 w-80 h-80 rounded-full pointer-events-none opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }}
        />
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full my-auto py-10 lg:py-16 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Columns: Brand Typography, Headline & CTAs */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6 text-center lg:text-left">
            {/* Kinetic Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-espresso/85 border border-latte/25 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-kinetic-lime animate-ping" />
              <span className="text-kinetic-lime">⚡ 30ML SOLO</span>
              <span className="text-latte/40">•</span>
              <span className="text-oat-cream">60ML DOPPIO</span>
              <span className="text-latte/40">•</span>
              <span className="text-kinetic-lime">90ML SIGNATURE</span>
            </motion.div>

            {/* Expressive H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="font-display font-extrabold text-[40px] sm:text-[56px] md:text-[66px] lg:text-[74px] text-oat-cream leading-[0.98] tracking-[-0.02em] drop-shadow-md"
            >
              Every Great Story <br />
              <span className="text-gradient-crema">Starts With a </span>
              <span className="text-kinetic-lime underline decoration-amber-500/60 decoration-wavy decoration-2">
                90ml Pour.
              </span>
            </motion.h1>

            {/* Subcopy */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-sans font-normal text-base md:text-lg text-latte/90 max-w-xl mx-auto lg:mx-0 leading-relaxed drop-shadow-sm"
            >
              Welcome to Bhagalpur&apos;s signature third place. Handcrafted espresso pulls, glowing tropical mocktails, high-speed Wi-Fi desks, board games, and loaded bites—poured to exact craft perfection.
            </motion.p>

            {/* Dual Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <a
                href="#craft-menu"
                className="bg-crema hover:bg-crema-dark text-card-white font-sans font-bold text-sm uppercase tracking-wider px-7 py-4 rounded-xl shadow-xl shadow-crema/25 hover:scale-105 transition-all duration-200 flex items-center gap-2 group"
              >
                <span>Explore Menu & Pre-Order</span>
                <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
              </a>

              <a
                href="#order-reserve"
                className="bg-oat-cream/90 hover:bg-card-white text-espresso font-sans font-bold text-sm uppercase tracking-wider px-7 py-4 rounded-xl shadow-lg backdrop-blur-sm hover:scale-105 transition-all duration-200"
              >
                Book a Hangout / Work Table
              </a>
            </motion.div>

            {/* "What's Your 90ml Mood?" Quick Matcher */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="pt-6 border-t border-latte/15 text-center lg:text-left"
            >
              <p className="font-sans text-xs uppercase tracking-[2px] font-semibold text-latte/80 mb-3 flex items-center justify-center lg:justify-start gap-1.5">
                <span className="text-kinetic-lime">⚡</span>
                <span>What&apos;s your 90ml mood today?</span>
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <button
                  onClick={() => handleMoodClick('caffeine')}
                  className="bg-espresso/80 hover:bg-espresso border border-latte/20 hover:border-kinetic-lime text-oat-cream hover:text-kinetic-lime font-sans text-xs font-medium px-4 py-2 rounded-lg transition-all flex items-center gap-2 group hover:scale-105 active:scale-95 backdrop-blur-md shadow-sm"
                >
                  <span>⚡</span>
                  <span>Caffeine Boost</span>
                  <span className="text-[10px] text-latte/40 group-hover:text-kinetic-lime/70 font-mono">
                    (Hot & Cold Pours)
                  </span>
                </button>

                <button
                  onClick={() => handleMoodClick('iced')}
                  className="bg-espresso/80 hover:bg-espresso border border-latte/20 hover:border-teal text-oat-cream hover:text-teal font-sans text-xs font-medium px-4 py-2 rounded-lg transition-all flex items-center gap-2 group hover:scale-105 active:scale-95 backdrop-blur-md shadow-sm"
                >
                  <span>🧊</span>
                  <span>Iced & Refreshing</span>
                  <span className="text-[10px] text-latte/40 group-hover:text-teal/70 font-mono">
                    (Mocktails & Shakes)
                  </span>
                </button>

                <button
                  onClick={() => handleMoodClick('bites')}
                  className="bg-espresso/80 hover:bg-espresso border border-latte/20 hover:border-amber-400 text-oat-cream hover:text-amber-400 font-sans text-xs font-medium px-4 py-2 rounded-lg transition-all flex items-center gap-2 group hover:scale-105 active:scale-95 backdrop-blur-md shadow-sm"
                >
                  <span>🥐</span>
                  <span>Savory Cafe Bites</span>
                  <span className="text-[10px] text-latte/40 group-hover:text-amber-400/70 font-mono">
                    (Nachos, Fries, Combos)
                  </span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Left completely open and clear to showcase the full beauty of the background photo */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-4 min-h-[380px] pointer-events-none" />
        </div>
      </div>

      {/* Bottom Kinetic Marquee Ticker */}
      <div className="w-full bg-roast-elevated/95 backdrop-blur-md border-y border-latte/15 py-3.5 relative overflow-hidden z-10">
        <div className="marquee-wrapper">
          <div className="marquee-content flex items-center gap-8 text-xs font-mono font-bold tracking-widest text-oat-cream uppercase">
            <span>🍹 CRAFT MOCKTAIL ALCHEMY & TROPICAL SUNSET</span>
            <span className="text-kinetic-lime">•</span>
            <span>☕ 90ML SIGNATURE ESPRESSO POURS</span>
            <span className="text-kinetic-lime">•</span>
            <span>🧊 ARTISANAL 16-HR COLD BREWS</span>
            <span className="text-kinetic-lime">•</span>
            <span>💻 HIGH-SPEED WI-FI & PLUG POINT DESKS</span>
            <span className="text-kinetic-lime">•</span>
            <span>🥐 CHEESY NACHOS, BURGERS & FRIES</span>
            <span className="text-kinetic-lime">•</span>
            <span>🎶 ACOUSTIC EVENINGS & BOARD GAMES</span>
            <span className="text-kinetic-lime">•</span>
            <span>⭐ 4.7 RATED ON GOOGLE (5,000+ VIBERS)</span>
            <span className="text-kinetic-lime">•</span>
            {/* Duplicated for seamless infinite CSS scroll */}
            <span>🍹 CRAFT MOCKTAIL ALCHEMY & TROPICAL SUNSET</span>
            <span className="text-kinetic-lime">•</span>
            <span>☕ 90ML SIGNATURE ESPRESSO POURS</span>
            <span className="text-kinetic-lime">•</span>
            <span>🧊 ARTISANAL 16-HR COLD BREWS</span>
            <span className="text-kinetic-lime">•</span>
            <span>💻 HIGH-SPEED WI-FI & PLUG POINT DESKS</span>
            <span className="text-kinetic-lime">•</span>
            <span>🥐 CHEESY NACHOS, BURGERS & FRIES</span>
            <span className="text-kinetic-lime">•</span>
            <span>🎶 ACOUSTIC EVENINGS & BOARD GAMES</span>
            <span className="text-kinetic-lime">•</span>
            <span>⭐ 4.7 RATED ON GOOGLE (5,000+ VIBERS)</span>
            <span className="text-kinetic-lime">•</span>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const headlineVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const charVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

function AnimatedText({ text, className }: { text: string; className: string }) {
  return (
    <motion.div className={className} variants={headlineVariants} initial="hidden" animate="visible">
      {text.split('').map((char, i) => (
        <motion.span key={i} variants={charVariants} className="inline-block">
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  )
}

const pills = [
  { text: 'FRESHLY CRAFTED', top: '10%', right: '2%' },
  { text: '₹89 ONWARDS', top: '45%', right: '-5%' },
  { text: '20+ FLAVOURS', top: '75%', right: '4%' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-black flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full pt-20 pb-28 md:pt-28 md:pb-32">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-poppins font-medium text-[10px] md:text-xs text-teal uppercase tracking-[4px] md:tracking-[5px]"
            >
              Bhagalpur&apos;s #1 Youth Cafe
            </motion.p>

            <div className="space-y-1">
              <AnimatedText
                text="TASTE THE"
                className="font-bebas text-[42px] sm:text-[64px] md:text-[80px] lg:text-[96px] text-white leading-[0.95]"
              />
              <AnimatedText
                text="DRUNKYARD"
                className="font-bebas text-[42px] sm:text-[64px] md:text-[80px] lg:text-[96px] text-yellow leading-[0.95]"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ delay: 1.2 }}
                className="font-bebas text-[36px] sm:text-[52px] md:text-[64px] lg:text-[80px] text-white leading-[0.95]"
              >
                EXPERIENCE
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="font-poppins font-light text-base md:text-lg text-white/70 max-w-md mx-auto lg:mx-0"
            >
              Mocktails. Shakes. Snacks. Crafted for the vibes you deserve.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <Link
                href="/menu"
                className="bg-yellow text-black font-poppins font-semibold uppercase tracking-wider px-6 py-3.5 md:px-8 md:py-4 rounded hover:scale-105 hover:shadow-[0_0_20px_#E8EA0060] transition-all duration-200 text-xs md:text-sm"
              >
                Explore Menu
              </Link>
              <Link
                href="/booking"
                className="border border-teal text-teal font-poppins font-semibold uppercase tracking-wider px-6 py-3.5 md:px-8 md:py-4 rounded hover:bg-teal hover:text-black transition-all duration-200 text-xs md:text-sm"
              >
                Book a Table
              </Link>
            </motion.div>
          </div>

          {/* Right Visual */}
          <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[400px] lg:max-w-none h-[320px] sm:h-[420px] lg:h-[480px] mt-6 lg:mt-0">
            {/* Teal glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(23,181,154,0.2) 0%, transparent 70%)',
                }}
              />
            </div>

            {/* Floating drink image */}
            <div className="relative z-10 animate-float flex justify-center h-full items-center">
              <div className="w-[180px] h-[240px] sm:w-[260px] sm:h-[350px] relative rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(23,181,154,0.25)] border border-white/5 bg-black/40">
                <Image 
                  src="/images/generated/hero-drink.png"
                  alt="Premium Mocktail"
                  fill
                  sizes="(max-width: 768px) 180px, 260px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Floating pills */}
            {pills.map((pill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 + i * 0.2 }}
                className="absolute z-20"
                style={{ top: pill.top, right: pill.right }}
              >
                <span className="inline-block border border-yellow text-yellow bg-black/90 backdrop-blur-sm font-poppins text-[9px] sm:text-[11px] font-medium uppercase tracking-wider px-3 py-1.5 sm:px-4 sm:py-2 rounded-full whitespace-nowrap">
                  {pill.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee Strip */}
      <div className="absolute bottom-0 left-0 right-0 bg-yellow py-2.5 sm:py-3 overflow-hidden">
        <div className="marquee-track whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="text-black font-poppins font-bold text-[11px] sm:text-[13px] tracking-[2px] sm:tracking-[3px] uppercase mx-4">
              MOCKTAILS • SHAKES • JUICES • SNACKS • STUDENT COMBO ₹99 • BIRTHDAY BOOKINGS • OPEN DAILY •&nbsp;
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

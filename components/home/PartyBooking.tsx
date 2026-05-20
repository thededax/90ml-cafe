'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const features = [
  'Couple Decoration Setup',
  'Birthday Table Arrangements',
  'Group Celebration Packages',
  'Custom Drink Combos',
  'Photography-Friendly Setup',
]

export default function PartyBooking() {
  return (
    <section className="bg-black py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-teal/20 to-yellow/10 h-[280px] sm:h-[400px] flex items-center justify-center border border-white/5 shadow-lg">
              <Image
                src="/images/generated/gallery-events.png"
                alt="Celebration setup at 90ML Cafe"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {/* Teal glow overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at center, rgba(23,181,154,0.1) 0%, transparent 70%)',
                }}
              />
            </div>
            {/* Floating badge */}
            <div className="absolute top-4 right-4 bg-yellow text-black font-poppins font-bold text-xs uppercase tracking-wider px-3.5 py-2 rounded-lg shadow-md">
              🎉 Party Booking Open
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5 md:space-y-6"
          >
            <p className="font-poppins font-medium text-[11px] md:text-xs text-teal uppercase tracking-[4px]">
              Celebrations
            </p>
            <h2 className="font-bebas text-3xl sm:text-4xl md:text-[56px] text-yellow leading-[1.1]">
              MAKE IT A NIGHT TO REMEMBER
            </h2>

            <ul className="space-y-2.5 sm:space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <span className="text-teal text-base sm:text-lg">✓</span>
                  <span className="font-poppins text-sm sm:text-[15px] text-white/85">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/booking?type=party"
              className="inline-block bg-yellow text-black font-poppins font-semibold uppercase tracking-wider px-6 py-3.5 md:px-8 md:py-4 rounded hover:scale-105 hover:shadow-[0_0_20px_#E8EA0060] transition-all duration-200 text-xs md:text-sm mt-2"
            >
              Book Your Party
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

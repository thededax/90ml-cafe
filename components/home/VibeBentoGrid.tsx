'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const amenities = [
  {
    span: 'lg:col-span-7',
    badge: '💻 Remote Work & Study Hub',
    badgeColor: 'text-kinetic-lime bg-espresso/80 border-kinetic-lime/30',
    title: 'High-Speed Wi-Fi & Dedicated Power Desks',
    description: 'Designed for laptop nomads, coding sprints, college research, and deep work. Ample ergonomic seating, quiet daylight alcoves, and power outlets at every work spot.',
    image: '/images/generated/about-cafe.png',
    stat: '100+ Mbps Fiber Wi-Fi • Plug Points at Desks',
  },
  {
    span: 'lg:col-span-5',
    badge: '🎲 Social Hangouts',
    badgeColor: 'text-teal bg-espresso/80 border-teal/30',
    title: 'Board Games, Books & Cozy Booths',
    description: 'Unplug and reconnect. From Catan, Uno, and Chess to curated zines and indie novels—your weekend hangout sanctuary.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80',
    stat: '15+ Board Games • Zero Rush Culture',
  },
  {
    span: 'lg:col-span-5',
    badge: '🎶 Cultural Community',
    badgeColor: 'text-caramel bg-espresso/80 border-caramel/30',
    title: 'Acoustic Jam Sessions & Open Mic Nights',
    description: 'Weekend indie musicians, poetry slams, and birthday celebration setups with ambient warm lighting and custom cafe playlists.',
    image: '/images/generated/gallery-events.png',
    stat: 'Weekend Vibes • Photography Friendly',
  },
  {
    span: 'lg:col-span-7',
    badge: '🥐 Artisanal Pairings',
    badgeColor: 'text-crema bg-espresso/80 border-crema/30',
    title: 'Freshly Pressed Sandwiches & Loaded Bites',
    description: 'From sizzling Peri-Peri fries and cheesy loaded nachos to authentic Maggi bowls and triple chocolate brownies paired with your pour.',
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&q=80',
    stat: 'Made to Order • Vegetarian Friendly',
  },
]

export default function VibeBentoGrid() {
  return (
    <section id="work-and-vibe" className="bg-espresso text-on-dark py-20 lg:py-28 relative border-t border-latte/10 overflow-hidden">
      {/* Ambient background glows */}
      <div
        className="absolute top-1/4 -left-28 w-80 h-80 rounded-full pointer-events-none opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 -right-28 w-80 h-80 rounded-full pointer-events-none opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #17B59A 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-roast-elevated border border-latte/20 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-kinetic-lime">
            <span>✨ BHAGALPUR&apos;S THIRD PLACE</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-oat-cream tracking-tight">
            Work by Day. Vibe by Night.
          </h2>
          <p className="font-sans text-sm sm:text-base text-latte/80 leading-relaxed">
            More than just coffee: a vibrant, welcoming space where students study, remote workers build projects, and friends create memories over 90ml pours.
          </p>
        </div>

        {/* 12-Column Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {amenities.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.5 }}
              className={`${item.span} bg-roast-elevated border border-latte/15 rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-latte/30 transition-all duration-300 shadow-lg`}
            >
              {/* Image Banner */}
              <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-espresso">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-roast-elevated via-roast-elevated/30 to-transparent" />

                {/* Floating Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`font-mono text-[11px] font-bold uppercase px-3 py-1.5 rounded-full border backdrop-blur-md ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                </div>
              </div>

              {/* Text Information */}
              <div className="p-6 sm:p-8 space-y-3">
                <h3 className="font-display text-2xl font-bold text-oat-cream group-hover:text-kinetic-lime transition-colors">
                  {item.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-latte/75 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-4 border-t border-latte/10 flex items-center justify-between text-xs">
                  <span className="font-mono text-kinetic-lime font-semibold flex items-center gap-1.5">
                    <span>⚡</span> {item.stat}
                  </span>
                  <Link
                    href="#order-reserve"
                    className="font-sans font-semibold text-oat-cream hover:text-kinetic-lime transition-colors flex items-center gap-1"
                  >
                    <span>Reserve Spot</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Instagram Follow Strip */}
        <div className="mt-12 text-center">
          <a
            href="https://www.instagram.com/90mldrunkyardcafe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-roast-elevated border border-latte/20 hover:border-kinetic-lime px-5 py-3 rounded-full text-xs font-sans font-semibold text-oat-cream hover:text-kinetic-lime transition-all hover:scale-105"
          >
            <span>📸 Tag us on Instagram</span>
            <span className="font-mono text-kinetic-lime">@90mldrunkyardcafe</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

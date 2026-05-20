'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const whyItems = [
  {
    icon: (
      <svg className="w-8 h-8 mx-auto text-teal" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
    ),
    title: 'No Real Vibe Spot',
    description: 'Bhagalpur had no premium cafe designed for the youth. We filled that gap.',
  },
  {
    icon: (
      <svg className="w-8 h-8 mx-auto text-teal" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M5 5h14l-7 7-7-7z" />
      </svg>
    ),
    title: 'Crafted Drinks',
    description: 'We wanted to bring big-city mocktail culture to a small-town audience.',
  },
  {
    icon: (
      <svg className="w-8 h-8 mx-auto text-teal" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
      </svg>
    ),
    title: 'Instagram-Worthy',
    description: 'Every corner of 90ML is designed for memories and content creation.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] sm:h-[60vh] bg-black flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-teal/5 to-transparent" />
        <h1 className="font-bebas text-5xl sm:text-6xl md:text-[80px] text-white relative z-10">
          OUR STORY
        </h1>
      </section>

      {/* Cafe Story */}
      <section className="bg-black py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden relative h-[280px] sm:h-[400px] flex items-center justify-center shadow-[0_0_40px_rgba(23,181,154,0.15)] border border-white/5"
            >
              <Image 
                src="/images/generated/about-cafe.png"
                alt="Inside 90ML Drunkyard Cafe"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4 md:space-y-6"
            >
              <h2 className="font-bebas text-3xl sm:text-4xl md:text-[52px] text-yellow leading-[1.1]">
                BORN IN BHAGALPUR. BUILT FOR THE YOUTH.
              </h2>
              <p className="font-poppins font-light text-sm sm:text-[17px] text-white/75 leading-relaxed">
                90ML Drunkyard Cafe was born from a simple idea: Bhagalpur deserved a real vibe spot. Not just another chai stall or fast food joint, but a place where young people could hang out, celebrate, and create memories.
              </p>
              <p className="font-poppins font-light text-sm sm:text-[17px] text-white/75 leading-relaxed">
                We started with a passion for crafting unique mocktails and creating an atmosphere that&apos;s equal parts bold and welcoming. Today, we&apos;re proud to be the city&apos;s go-to destination for celebrations, date nights, study breaks, and everything in between.
              </p>
            </motion.div>
          </div>

          {/* Pull Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center my-12 md:my-20 max-w-3xl mx-auto"
          >
            <p className="font-poppins italic text-lg md:text-2xl text-teal leading-relaxed px-4">
              &ldquo;We didn&apos;t just open a cafe. We created Bhagalpur&apos;s first real vibe spot.&rdquo;
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision + Mission */}
      <section className="bg-black py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0A0A0A] border-l-4 border-yellow rounded-lg p-6 md:p-8"
            >
              <h3 className="font-bebas text-3xl md:text-4xl text-yellow mb-3 md:mb-4">Our Vision</h3>
              <p className="font-poppins font-light text-xs md:text-sm text-white/70 leading-relaxed">
                To become Bihar&apos;s most loved youth cafe brand — a symbol of bold creativity, premium experiences, and unforgettable moments for every young person who walks through our doors.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#0A0A0A] border-l-4 border-teal rounded-lg p-6 md:p-8"
            >
              <h3 className="font-bebas text-3xl md:text-4xl text-teal mb-3 md:mb-4">Our Mission</h3>
              <p className="font-poppins font-light text-xs md:text-sm text-white/70 leading-relaxed">
                To serve crafted mocktails and snacks in an atmosphere that inspires. We make every visit special — from student combos at ₹99 to premium birthday celebrations — because everyone deserves the Drunkyard experience.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why We Started */}
      <section className="bg-black py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-bebas text-4xl sm:text-5xl md:text-7xl text-white text-center mb-10 md:mb-16">
            WHY WE STARTED
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {whyItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center space-y-3 md:space-y-4"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-teal/10 mx-auto">
                  {item.icon}
                </div>
                <h3 className="font-bebas text-2xl md:text-3xl text-yellow">{item.title}</h3>
                <p className="font-poppins font-light text-xs md:text-sm text-white/60 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit CTA */}
      <section className="bg-yellow py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-bebas text-4xl sm:text-5xl md:text-[64px] text-black mb-6 md:mb-8">
            COME VISIT TONIGHT
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/booking"
              className="bg-black text-yellow font-poppins font-semibold uppercase tracking-wider px-6 py-3.5 md:px-8 md:py-4 rounded hover:scale-105 transition-all duration-200 text-xs md:text-sm"
            >
              Book a Table
            </Link>
            <a
              href="https://www.google.com/maps/place/90ml+Drunkyard+Cafe/@25.2585131,86.9885693,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black font-poppins font-semibold uppercase tracking-wider px-6 py-3.5 md:px-8 md:py-4 rounded hover:scale-105 transition-all duration-200 text-xs md:text-sm"
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

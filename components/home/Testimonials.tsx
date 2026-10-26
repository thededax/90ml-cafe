'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const reviews = [
  {
    stars: 5,
    tag: 'Remote Work & Coffee',
    quote: "The 90ml Signature Pour is genuinely third-wave quality in Bhagalpur! High-speed Wi-Fi and power outlets right at the desk make it my daily remote work sanctuary.",
    name: "Rahul Kumar",
    role: "Software Developer & Regular",
    location: "Bhagalpur, Bihar",
  },
  {
    stars: 5,
    tag: 'Weekend Vibe & Mocktails',
    quote: "The Blue Lagoon and Drunkyard Special mocktails are unreal. Amazing ambient lighting, great playlist, and the staff treats you like family. 10/10 experience!",
    name: "Amit Singh",
    role: "College Student",
    location: "Khanjarpur, Bhagalpur",
  },
  {
    stars: 5,
    tag: 'Student Combo Favorite',
    quote: "Such a blessing for students near SM College! Thick Oreo shake + hot peri-peri fries under ₹100. Best place to study with friends or just chill after class.",
    name: "Priya Sharma",
    role: "SM College Student",
    location: "Bhagalpur, Bihar",
  },
  {
    stars: 5,
    tag: 'Date Night & Food',
    quote: "Booked a corner booth for an anniversary date and the setup was so aesthetic. The loaded nachos and caramel cold brew made it an unforgettable evening.",
    name: "Sneha Gupta & Vikash",
    role: "Local Food Enthusiasts",
    location: "Bhagalpur, Bihar",
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  const getVisibleReviews = () => {
    const visible = []
    for (let i = 0; i < 3; i++) {
      visible.push(reviews[(current + i) % reviews.length])
    }
    return visible
  }

  return (
    <section id="reviews" className="bg-espresso text-on-dark py-20 lg:py-28 relative border-t border-latte/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-roast-elevated border border-latte/20 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-kinetic-lime">
            <span>⭐ GOOGLE RATED 4.7/5.0</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-oat-cream tracking-tight">
            Loved by Bhagalpur&apos;s Vibers
          </h2>
          <p className="font-sans text-sm sm:text-base text-latte/80 leading-relaxed">
            From morning espresso runs to late night group hangouts, see what our regulars say about the 90ml experience.
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {getVisibleReviews().map((review, i) => (
              <motion.div
                key={`${review.name}-${current}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-roast-elevated border border-latte/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative group hover:border-latte/30 transition-all shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {/* Stars */}
                    <div className="flex gap-1 text-kinetic-lime text-base">
                      {Array.from({ length: review.stars }).map((_, s) => (
                        <span key={s}>★</span>
                      ))}
                    </div>
                    <span className="font-mono text-[10px] text-latte/50 uppercase">
                      {review.tag}
                    </span>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-oat-cream/90 leading-relaxed italic mb-6">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-latte/10 flex items-center justify-between">
                  <div>
                    <h4 className="font-sans font-bold text-sm text-oat-cream">
                      {review.name}
                    </h4>
                    <p className="font-sans text-[11px] text-latte/60">
                      {review.role} • {review.location}
                    </p>
                  </div>
                  <span className="text-xl opacity-20 group-hover:opacity-60 transition-opacity">
                    ☕
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

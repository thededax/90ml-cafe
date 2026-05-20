'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const reviews = [
  {
    stars: 5,
    quote: "Best cafe in Bhagalpur, hands down! The Blue Lagoon mocktail is absolutely insane. We come here every weekend and the vibe never gets old.",
    name: "Rahul Kumar",
    location: "Bhagalpur, Bihar",
  },
  {
    stars: 5,
    quote: "Took my girlfriend here for her birthday and the decoration setup was perfect. The Drunkyard Special is a must-try. 10/10 experience!",
    name: "Amit Singh",
    location: "Bhagalpur, Bihar",
  },
  {
    stars: 5,
    quote: "Finally a cafe in Bhagalpur that actually feels premium! The student combo is such a steal at ₹99. Me and my friends are regulars now.",
    name: "Priya Sharma",
    location: "Bhagalpur, Bihar",
  },
  {
    stars: 4,
    quote: "Amazing mocktails and the interior is so Instagram-worthy. The Oreo Shake is to die for. Only wish they had more seating during peak hours.",
    name: "Sneha Gupta",
    location: "Bhagalpur, Bihar",
  },
  {
    stars: 5,
    quote: "The couple combo is perfect for date night. Great ambiance, friendly staff, and the nachos are absolutely loaded. Best snack spot in town!",
    name: "Vikash Raj",
    location: "Bhagalpur, Bihar",
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length)
    }, 4000)
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
    <section className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-bebas text-5xl md:text-7xl text-yellow text-center mb-16">
          WHAT THE VIBERS SAY
        </h2>

        {/* Desktop: 3 cards */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {getVisibleReviews().map((review, i) => (
              <motion.div
                key={`${review.name}-${current}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white/[0.04] backdrop-blur-[20px] border border-yellow/[0.12] rounded-lg p-8 relative"
              >
                {/* Decorative quote mark */}
                <span className="absolute top-4 right-6 font-bebas text-6xl text-yellow/30 leading-none">
                  &ldquo;
                </span>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.stars }).map((_, s) => (
                    <span key={s} className="text-yellow text-lg">★</span>
                  ))}
                </div>

                <p className="font-poppins font-light italic text-base text-white/80 leading-[1.8] mb-6">
                  &ldquo;{review.quote}&rdquo;
                </p>

                <div>
                  <p className="font-poppins font-semibold text-white">{review.name}</p>
                  <p className="font-poppins text-xs text-white/40">{review.location}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Mobile: 1 card with swipe */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white/[0.04] backdrop-blur-[20px] border border-yellow/[0.12] rounded-lg p-8 relative"
            >
              <span className="absolute top-4 right-6 font-bebas text-6xl text-yellow/30 leading-none">
                &ldquo;
              </span>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: reviews[current].stars }).map((_, s) => (
                  <span key={s} className="text-yellow text-lg">★</span>
                ))}
              </div>
              <p className="font-poppins font-light italic text-base text-white/80 leading-[1.8] mb-6">
                &ldquo;{reviews[current].quote}&rdquo;
              </p>
              <div>
                <p className="font-poppins font-semibold text-white">{reviews[current].name}</p>
                <p className="font-poppins text-xs text-white/40">{reviews[current].location}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                i === current ? 'bg-yellow w-8' : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const categories = [
  {
    image: '/images/generated/cat-mocktails.png',
    name: 'Mocktails',
    description: 'Bold, refreshing, Instagram-worthy drinks crafted without alcohol.',
    badge: '8+ Flavours',
  },
  {
    image: '/images/generated/cat-shakes.png',
    name: 'Shakes',
    description: 'Thick, creamy milkshakes loaded with your favorite toppings.',
    badge: '6+ Flavours',
  },
  {
    image: 'https://images.unsplash.com/photo-1622597467836-f38240662c8b?auto=format&fit=crop&q=80',
    name: 'Juices',
    description: 'Freshly squeezed, natural juices to keep your vibe healthy.',
    badge: '5+ Options',
  },
  {
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&q=80',
    name: 'Snacks',
    description: 'Crunchy, cheesy, spicy bites to complete your cafe experience.',
    badge: '6+ Items',
  },
]

export default function CategoryCards() {
  return (
    <section className="bg-black py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10 md:mb-16">
          <p className="font-poppins font-medium text-[10px] md:text-xs text-teal uppercase tracking-[4px] md:tracking-[5px] mb-2 md:mb-4">
            What We Serve
          </p>
          <h2 className="font-bebas text-4xl sm:text-5xl md:text-7xl text-white">
            CRAFTED FOR YOUR VIBE
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-[#0A0A0A] border border-white/[0.06] rounded-xl overflow-hidden hover:border-yellow/40 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(232,234,0,0.1)] transition-all duration-300 group flex flex-col"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
              </div>
              <div className="p-6 md:p-8 pt-4 flex-1 flex flex-col">
                <h3 className="font-bebas text-2xl md:text-3xl text-yellow mb-2 md:mb-3">{cat.name}</h3>
                <p className="font-poppins text-xs md:text-sm font-light text-white/60 mb-4 leading-relaxed flex-1">
                  {cat.description}
                </p>
                <div>
                  <span className="inline-block bg-teal/10 text-teal font-poppins text-[10px] md:text-[11px] font-medium px-3 py-1 rounded-full">
                    {cat.badge}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

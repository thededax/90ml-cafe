'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import menuData from '@/data/menu.json'

const categories = ['All', 'Mocktails', 'Shakes', 'Juices', 'Snacks', 'Combos']

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredItems = activeCategory === 'All'
    ? menuData
    : menuData.filter(item => item.category === activeCategory)

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[50vh] bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-bebas text-6xl md:text-8xl lg:text-[96px] text-yellow">
            OUR MENU
          </h1>
          <p className="font-poppins font-light text-lg text-white/60 mt-4">
            Freshly crafted. Perfectly priced.
          </p>
        </div>
      </section>

      {/* Sticky Category Tabs */}
      <div className="sticky top-[72px] z-30 bg-black/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-poppins font-medium text-sm uppercase tracking-wider px-5 py-2.5 rounded whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-yellow text-black'
                    : 'text-white hover:text-yellow'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <section className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#0A0A0A] border border-white/[0.06] rounded-lg overflow-hidden group hover:border-yellow/40 hover:-translate-y-2 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-[200px] overflow-hidden bg-gradient-to-br from-teal/10 to-yellow/5">
                    <div className="w-full h-full flex items-center justify-center group-hover:scale-[1.08] transition-transform duration-500">
                      <span className="text-6xl">
                        {item.category === 'Mocktails' ? '🍹' : item.category === 'Shakes' ? '🥤' : item.category === 'Juices' ? '🧃' : item.category === 'Snacks' ? '🍟' : '🎁'}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="absolute top-3 right-3 flex gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`font-poppins text-[10px] font-bold uppercase px-2 py-1 rounded ${
                            tag === 'bestseller' ? 'bg-yellow text-black' :
                            tag === 'new' ? 'bg-teal text-black' :
                            tag === 'spicy' ? 'bg-red-600 text-white' : 'bg-white/20 text-white'
                          }`}
                        >
                          {tag === 'bestseller' ? '🔥 BESTSELLER' : tag === 'new' ? '🌟 NEW' : tag === 'spicy' ? '🌶 SPICY' : tag.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-bebas text-[28px] text-white mb-1">{item.name}</h3>
                    <p className="font-poppins text-[13px] text-white/55 leading-relaxed mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-poppins font-bold text-[22px] text-yellow">
                        ₹{item.price}
                      </span>
                      <Link
                        href={`https://wa.me/917277143557?text=${encodeURIComponent(`Hi! I'd like to order ${item.name} (₹${item.price}) from 90ML Drunkyard Cafe.`)}`}
                        target="_blank"
                        className="border border-yellow text-yellow font-poppins text-[11px] font-semibold uppercase tracking-wider px-4 py-2 rounded hover:bg-yellow hover:text-black transition-all duration-200"
                      >
                        Add to Order
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA Strip */}
      <section className="bg-yellow py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-poppins font-semibold text-black text-center md:text-left">
            Can&apos;t find what you want? Message us directly!
          </p>
          <a
            href="https://wa.me/917277143557?text=Hi! I'd like to know more about the menu at 90ML Drunkyard Cafe."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white font-poppins font-semibold uppercase tracking-wider px-6 py-3 rounded hover:scale-105 transition-all duration-200 text-sm flex items-center gap-2"
          >
            💬 WhatsApp Us
          </a>
        </div>
      </section>
    </>
  )
}

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import menuData from '@/data/menu.json'

const bestsellers = menuData.filter(item => item.tags.includes('bestseller')).slice(0, 6)

export default function Bestsellers() {
  return (
    <section className="bg-black py-12 md:py-24 relative overflow-hidden">
      {/* Ghost watermark */}
      <div className="absolute top-0 left-6 font-bebas text-[100px] md:text-[180px] text-white/[0.04] leading-none pointer-events-none select-none">
        DRINKS
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="font-bebas text-4xl sm:text-5xl md:text-7xl text-yellow mb-8 md:mb-16">
          OUR BESTSELLERS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestsellers.map((drink, i) => (
            <motion.div
              key={drink.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-[#0A0A0A] border border-white/[0.06] rounded-lg overflow-hidden group hover:border-yellow/40 hover:-translate-y-2 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-[220px] overflow-hidden bg-gradient-to-br from-teal/10 to-yellow/5">
                <div className="w-full h-full relative group-hover:scale-110 transition-transform duration-500">
                  <Image
                    src={drink.image}
                    alt={drink.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-60" />
                </div>
                {/* Bestseller badge */}
                <div className="absolute top-3 right-3 bg-yellow text-black font-poppins text-[10px] md:text-[11px] font-bold px-3 py-1 rounded">
                  🔥 BESTSELLER
                </div>
                {/* Yellow top border on hover */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-yellow scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>

              {/* Content */}
              <div className="p-5 md:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-poppins text-[10px] md:text-[11px] text-teal uppercase tracking-[2px] bg-teal/10 px-2 py-0.5 rounded-full">
                    {drink.category}
                  </span>
                </div>
                <h3 className="font-bebas text-[24px] md:text-[28px] text-white mb-1 md:mb-2">{drink.name}</h3>
                <p className="font-poppins text-[12px] md:text-[13px] text-white/55 leading-relaxed mb-4 line-clamp-2">
                  {drink.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-poppins font-bold text-xl md:text-[22px] text-yellow">
                    ₹{drink.price}
                  </span>
                  <Link
                    href={`https://wa.me/917277143557?text=${encodeURIComponent(`Hi! I'd like to order ${drink.name} (₹${drink.price})`)}`}
                    target="_blank"
                    className="border border-yellow text-yellow font-poppins text-[10px] md:text-[11px] font-semibold uppercase tracking-wider px-3.5 py-1.5 md:px-4 md:py-2 rounded hover:bg-yellow hover:text-black transition-all duration-200"
                  >
                    Order on WhatsApp
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

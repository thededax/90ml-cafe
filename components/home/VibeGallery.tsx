'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const vibeImages = [
  {
    id: 1,
    src: '/images/generated/cat-mocktails.png',
    alt: 'Premium mocktails at 90ML Cafe',
    aspect: 'tall',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=600&q=80',
    alt: 'Aesthetic mocktail drink',
    aspect: 'wide',
  },
  {
    id: 3,
    src: '/images/generated/about-cafe.png',
    alt: 'Cozy interior seating at 90ML',
    aspect: 'square',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    alt: 'Cafe design and aesthetic vibes',
    aspect: 'tall',
  },
  {
    id: 5,
    src: '/images/generated/gallery-events.png',
    alt: 'Celebration setup at 90ML',
    aspect: 'wide',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
    alt: 'Aesthetic table setting',
    aspect: 'square',
  },
  {
    id: 7,
    src: '/images/generated/hero-drink.png',
    alt: 'Signature crafted drink at 90ML',
    aspect: 'tall',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
    alt: 'Friends enjoying drinks at cafe',
    aspect: 'wide',
  },
]

export default function VibeGallery() {
  return (
    <section className="bg-black py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-bebas text-4xl sm:text-5xl md:text-7xl text-white mb-2 md:mb-4">
            THE DRUNKYARD VIBE
          </h2>
          <p className="font-poppins font-light text-base md:text-lg text-teal">
            Made for Instagram. Built for memories.
          </p>
        </div>

        <div className="columns-2 md:columns-3 gap-3 space-y-3">
          {vibeImages.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="break-inside-avoid rounded-xl overflow-hidden image-hover-overlay cursor-pointer group relative border border-white/5 shadow-md bg-[#0A0A0A]"
            >
              <div
                className={`relative w-full group-hover:scale-[1.04] transition-transform duration-500 overflow-hidden ${
                  img.aspect === 'tall' ? 'h-[240px] sm:h-[320px]' : img.aspect === 'wide' ? 'h-[150px] sm:h-[200px]' : 'h-[190px] sm:h-[260px]'
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-opacity duration-300"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <Link
            href="https://www.instagram.com/90mldrunkyardcafe"
            target="_blank"
            className="inline-flex items-center gap-2 border border-teal text-teal font-poppins font-semibold uppercase tracking-wider px-6 py-3 md:px-8 md:py-4 rounded hover:bg-teal hover:text-black transition-all duration-200 text-xs md:text-sm"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            Follow @90MLDRUNKYARD
          </Link>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const filterTabs = ['All', 'Drinks', 'Food', 'Cafe Interior', 'Events']

const galleryImages = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  category: ['Drinks', 'Food', 'Cafe Interior', 'Events'][i % 4],
  aspect: i % 3 === 0 ? 'tall' : i % 3 === 1 ? 'wide' : 'square',
  src: [
    '/images/generated/cat-mocktails.png', 
    'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&q=80', 
    '/images/generated/about-cafe.png', 
    '/images/generated/gallery-events.png'
  ][i % 4],
}))

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = activeFilter === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeFilter)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const nextImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filtered.length)
    }
  }, [lightboxIndex, filtered.length])

  const prevImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length)
    }
  }, [lightboxIndex, filtered.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, nextImage, prevImage])

  return (
    <>
      {/* Hero */}
      <section className="relative h-[35vh] sm:h-[45vh] bg-espresso text-on-dark flex items-center justify-center border-b border-latte/15">
        <div className="text-center relative z-10 space-y-2">
          <span className="font-mono text-xs font-bold text-kinetic-lime uppercase tracking-widest">
            ⚡ INSTAGRAM VIBES & MEMORIES
          </span>
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl text-oat-cream">
            The 90ml Vibe Gallery
          </h1>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="sticky top-[76px] z-30 bg-espresso/95 backdrop-blur-xl border-b border-latte/15">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`font-sans font-semibold text-xs uppercase tracking-wider px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-200 ${
                  activeFilter === tab
                    ? 'bg-kinetic-lime text-espresso shadow-md font-bold'
                    : 'bg-roast-elevated text-oat-cream hover:bg-latte/20 border border-latte/15'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <section className="bg-espresso py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="columns-2 md:columns-3 gap-3 space-y-3">
            <AnimatePresence>
              {filtered.map((img, i) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="break-inside-avoid rounded-xl overflow-hidden cursor-pointer group relative"
                  onClick={() => openLightbox(i)}
                >
                  <div
                    className={`relative w-full overflow-hidden bg-black flex items-center justify-center group-hover:scale-[1.04] transition-transform duration-500 ${
                      img.aspect === 'tall' ? 'h-[320px]' : img.aspect === 'wide' ? 'h-[200px]' : 'h-[260px]'
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={`Gallery Image ${img.category}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" style={{ boxShadow: 'inset 0 0 0 3px #E8EA00' }}>
                    <span className="text-yellow font-poppins text-sm uppercase tracking-wider">View</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="bg-black pb-24">
        <div className="text-center">
          <Link
            href="https://www.instagram.com/90mldrunkyardcafe"
            target="_blank"
            className="inline-flex items-center gap-2 border border-teal text-teal font-poppins font-semibold uppercase tracking-wider px-8 py-4 rounded hover:bg-teal hover:text-black transition-all duration-200 text-sm"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            Follow @90MLDRUNKYARD on Instagram
          </Link>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white text-3xl hover:text-yellow transition-colors z-10"
            >
              ×
            </button>

            {/* Prev arrow */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage() }}
              className="absolute left-6 text-yellow text-4xl hover:scale-110 transition-transform z-10"
            >
              ‹
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-[90vw] max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden w-[800px] max-w-[90vw] h-[600px] max-h-[80vh] flex items-center justify-center bg-black">
                <Image
                  src={filtered[lightboxIndex]?.src}
                  alt={`Lightbox Image`}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>

            {/* Next arrow */}
            <button
              onClick={(e) => { e.stopPropagation(); nextImage() }}
              className="absolute right-6 text-yellow text-4xl hover:scale-110 transition-transform z-10"
            >
              ›
            </button>

            {/* Counter */}
            <div className="absolute bottom-6 text-white/50 font-poppins text-sm">
              {lightboxIndex + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

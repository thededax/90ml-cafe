'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useTray } from '@/lib/tray-context'

const navLinks = [
  { href: '/#the-90ml-pour', label: 'The 90ml Pour' },
  { href: '/#craft-menu', label: 'Craft Menu' },
  { href: '/#work-and-vibe', label: 'Work & Vibe' },
  { href: '/#reviews', label: 'Reviews' },
  { href: '/#order-reserve', label: 'Order / Reserve' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { totalItems, setIsTrayOpen } = useTray()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-espresso/95 backdrop-blur-xl border-b border-latte/10 shadow-lg'
            : 'bg-gradient-to-b from-espresso/90 via-espresso/60 to-transparent'
        }`}
        style={{ height: '76px' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">
          {/* Logo with 90ml Dose Tag */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="relative h-10 w-32 sm:h-11 sm:w-36">
              <Image
                src="/logo.svg"
                alt="90ML Cafe"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 bg-roast-elevated border border-latte/20 px-2 py-0.5 rounded-full text-[10px] font-mono text-kinetic-lime uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-kinetic-lime animate-pulse" />
              90ml Specialty
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="nav-link font-sans font-medium text-xs uppercase tracking-[1.5px] text-oat-cream hover:text-kinetic-lime transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {/* Direct Call Button (Desktop) */}
            <a
              href="tel:+917277143557"
              className="hidden md:inline-flex items-center gap-1.5 text-latte/80 hover:text-oat-cream font-sans text-xs font-semibold px-3 py-2 rounded-lg transition-colors border border-latte/15 hover:border-latte/30"
              title="Call Cafe Barista"
            >
              <span>📞</span>
              <span className="font-mono tabular-nums">+91 72771 43557</span>
            </a>

            {/* Reactive Order Tray Button */}
            <button
              onClick={() => setIsTrayOpen(true)}
              className="relative bg-roast-elevated border border-latte/25 hover:border-kinetic-lime text-oat-cream hover:text-kinetic-lime font-sans font-semibold text-xs uppercase tracking-wider px-3.5 py-2.5 rounded-lg flex items-center gap-2 transition-all hover:scale-105 shadow-sm"
              aria-label="View order tray"
            >
              <span className="text-base">☕</span>
              <span className="hidden sm:inline">Tray</span>
              <span className="bg-crema text-card-white font-mono text-[11px] font-bold px-1.5 py-0.2 rounded-full tabular-nums">
                {totalItems}
              </span>
            </button>

            {/* Primary Action Button */}
            <Link
              href="/#order-reserve"
              className="hidden sm:inline-flex bg-crema hover:bg-crema-dark text-card-white font-sans font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg hover:scale-105 transition-all shadow-md"
            >
              Reserve / Order
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-oat-cream hover:text-kinetic-lime focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-full bg-current transition-transform duration-300 ${
                    isOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-current transition-opacity duration-200 ${
                    isOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-current transition-transform duration-300 ${
                    isOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-espresso/98 border-b border-latte/15 backdrop-blur-2xl overflow-hidden px-6 py-6 shadow-2xl"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-sans text-sm uppercase tracking-wider font-semibold text-oat-cream hover:text-kinetic-lime py-1 border-b border-latte/10"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2 flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setIsOpen(false)
                      setIsTrayOpen(true)
                    }}
                    className="w-full bg-roast-elevated border border-latte/20 text-oat-cream font-sans font-semibold text-xs uppercase tracking-wider py-3 rounded-lg flex items-center justify-center gap-2"
                  >
                    <span>☕ View Order Tray</span>
                    <span className="bg-crema text-card-white font-mono px-2 py-0.5 rounded-full text-xs tabular-nums">
                      {totalItems} items
                    </span>
                  </button>
                  <Link
                    href="/#order-reserve"
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-crema hover:bg-crema-dark text-card-white font-sans font-bold text-xs uppercase tracking-wider py-3 rounded-lg text-center shadow-md"
                  >
                    Book Table / Quick Pre-Order
                  </Link>
                  <a
                    href="tel:+917277143557"
                    className="w-full border border-teal text-teal font-sans font-semibold text-xs uppercase tracking-wider py-3 rounded-lg text-center"
                  >
                    📞 Call: +91 72771 43557
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}

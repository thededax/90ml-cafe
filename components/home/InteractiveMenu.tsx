'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import menuData from '@/data/menu.json'
import { useTray } from '@/lib/tray-context'

interface MenuItemType {
  id: string
  name: string
  category: string
  description: string
  price: number
  image: string
  tags: string[]
  temperature: string
  tastingNotes?: string
  options?: string[]
}

const categories = [
  'All',
  'Coffee & Chai',
  'Mocktails',
  'Shakes',
  'Juices',
  'Snacks',
  'Combos',
]

const tempFilters = [
  { id: 'all', label: 'All Types' },
  { id: 'hot', label: '🔥 Hot' },
  { id: 'iced', label: '🧊 Iced' },
  { id: 'bestseller', label: '⭐ Bestsellers' },
]

interface InteractiveMenuProps {
  initialFilter?: {
    category?: string
    temperature?: string
  }
}

export default function InteractiveMenu({ initialFilter }: InteractiveMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedTemp, setSelectedTemp] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [addedFeedback, setAddedFeedback] = useState<Record<string, boolean>>({})

  const { items: trayItems, addItem, updateQuantity, setIsTrayOpen } = useTray()

  // Apply initial filter if passed from mood matcher
  useEffect(() => {
    if (initialFilter?.category) setSelectedCategory(initialFilter.category)
    if (initialFilter?.temperature) setSelectedTemp(initialFilter.temperature)
  }, [initialFilter])

  // Filter items
  const filteredItems = useMemo(() => {
    return (menuData as MenuItemType[]).filter((item) => {
      // Category match
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false
      }

      // Temperature / Bestseller match
      if (selectedTemp === 'hot' && item.temperature !== 'hot') return false
      if (selectedTemp === 'iced' && item.temperature !== 'iced') return false
      if (selectedTemp === 'bestseller' && !item.tags.includes('bestseller')) return false

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchName = item.name.toLowerCase().includes(query)
        const matchDesc = item.description.toLowerCase().includes(query)
        const matchNotes = item.tastingNotes?.toLowerCase().includes(query)
        if (!matchName && !matchDesc && !matchNotes) return false
      }

      return true
    })
  }, [selectedCategory, selectedTemp, searchQuery])

  const handleOptionSelect = (itemId: string, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [itemId]: option }))
  }

  const handleAddToCart = (item: MenuItemType) => {
    const chosenOption = selectedOptions[item.id] || item.options?.[0]
    const chosenTemp = (item.temperature as 'hot' | 'iced' | 'all') || 'all'

    addItem(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        category: item.category,
        image: item.image,
      },
      chosenOption,
      chosenTemp
    )

    // Trigger visual checkmark for 1.2s
    setAddedFeedback((prev) => ({ ...prev, [item.id]: true }))
    setTimeout(() => {
      setAddedFeedback((prev) => ({ ...prev, [item.id]: false }))
    }, 1200)
  }

  // Count item in tray
  const getItemQuantityInTray = (itemId: string) => {
    return trayItems
      .filter((i) => i.id === itemId)
      .reduce((sum, i) => sum + i.quantity, 0)
  }

  return (
    <section id="craft-menu" className="bg-oat-cream text-espresso py-20 lg:py-28 relative">
      {/* Top soft transition trim from dark espresso */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-espresso/10 to-transparent pointer-events-none" />

      {/* Bottom soft transition trim to espresso */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-espresso/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-latte/60 border border-crema/20 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-crema tracking-wider">
            <span>☕ SPECIALTY ROASTS • MOCKTAILS • BITES</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-espresso tracking-tight">
            The 90ml Craft Menu
          </h2>
          <p className="font-sans text-sm sm:text-base text-espresso/75 leading-relaxed">
            Every pour, shake, and snack is made fresh on order. Filter by temperature, customize your shot dose, and add directly to your order tray.
          </p>
        </div>

        {/* Sticky Filter Bar (Desktop & Mobile) */}
        <div className="sticky top-[76px] z-30 bg-oat-cream/95 backdrop-blur-md py-4 border-y border-border-cafe mb-10 space-y-3">
          {/* Top row: Category tabs & Search input */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Category scrollable tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`font-sans font-semibold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-crema text-card-white shadow-md scale-[1.02]'
                      : 'bg-card-white/80 text-espresso/80 hover:bg-card-white hover:text-espresso border border-border-cafe'
                  }`}
                >
                  {cat === 'All' ? '✨ All Menu' : cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64 flex-shrink-0">
              <input
                type="text"
                placeholder="Search coffee, mocktail, fries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card-white border border-border-cafe rounded-xl pl-9 pr-8 py-2 text-xs text-espresso placeholder-espresso/45 focus:outline-none focus:border-crema shadow-sm"
              />
              <span className="absolute left-3 top-2.5 text-xs text-espresso/40">🔍</span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-xs text-espresso/40 hover:text-espresso"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Bottom row: Temperature / Bestseller Filter Pills */}
          <div className="flex items-center justify-between gap-2 pt-1 border-t border-border-cafe/60 text-xs">
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="font-mono text-[11px] text-espresso/60 font-semibold uppercase hidden sm:inline">
                Filter by:
              </span>
              {tempFilters.map((temp) => (
                <button
                  key={temp.id}
                  onClick={() => setSelectedTemp(temp.id)}
                  className={`font-sans text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                    selectedTemp === temp.id
                      ? 'bg-espresso text-card-white shadow-sm'
                      : 'bg-card-white/70 text-espresso/70 hover:bg-card-white border border-border-cafe/60'
                  }`}
                >
                  {temp.label}
                </button>
              ))}
            </div>

            <span className="font-mono text-xs text-espresso/70 flex-shrink-0">
              Showing <strong className="text-crema">{filteredItems.length}</strong> items
            </span>
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-card-white/60 rounded-3xl border border-border-cafe space-y-3">
            <span className="text-4xl">☕</span>
            <h3 className="font-display text-xl font-bold text-espresso">No matching items found</h3>
            <p className="font-sans text-xs text-espresso/60 max-w-xs mx-auto">
              Try adjusting your temperature filter or clearing the search box.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All')
                setSelectedTemp('all')
                setSearchQuery('')
              }}
              className="bg-crema text-card-white font-sans text-xs font-semibold px-5 py-2 rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => {
                const quantityInTray = getItemQuantityInTray(item.id)
                const isAdded = addedFeedback[item.id]

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="bg-card-white border border-border-cafe rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    {/* Item Image & Temperature Badge */}
                    <div>
                      <div className="relative h-52 w-full overflow-hidden bg-latte/20">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            // Fallback if image fails
                            const target = e.target as HTMLImageElement
                            target.src = '/images/generated/cat-mocktails.png'
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                          {/* Temperature Badge */}
                          {item.temperature && item.temperature !== 'all' ? (
                            <span
                              className={`font-mono text-[10px] font-bold uppercase px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md ${
                                item.temperature === 'hot'
                                  ? 'bg-espresso/90 text-caramel border border-crema/30'
                                  : 'bg-espresso/90 text-teal border border-teal/30'
                              }`}
                            >
                              {item.temperature === 'hot' ? '🔥 Hot' : '🧊 Iced'}
                            </span>
                          ) : (
                            <span className="font-mono text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-espresso/90 text-oat-cream border border-border-cafe">
                              🍽️ Fresh Bite
                            </span>
                          )}

                          {/* Bestseller / New Tags */}
                          <div className="flex gap-1.5">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                                  tag === 'bestseller'
                                    ? 'bg-kinetic-lime text-espresso'
                                    : tag === 'signature'
                                    ? 'bg-crema text-card-white'
                                    : tag === 'spicy'
                                    ? 'bg-red-600 text-white'
                                    : 'bg-card-white/90 text-espresso'
                                }`}
                              >
                                {tag === 'bestseller'
                                  ? '⭐ BESTSELLER'
                                  : tag === 'signature'
                                  ? '⚡ 90ML SIGNATURE'
                                  : tag === 'spicy'
                                  ? '🌶 SPICY'
                                  : tag.toUpperCase()}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Category watermark pill */}
                        <div className="absolute bottom-3 left-3">
                          <span className="font-sans text-[11px] font-semibold text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-display text-xl font-bold text-espresso group-hover:text-crema transition-colors">
                            {item.name}
                          </h3>
                          <div className="font-mono text-xl font-extrabold text-crema tabular-nums flex-shrink-0">
                            ₹{item.price}
                          </div>
                        </div>

                        <p className="font-sans text-xs text-espresso/70 leading-relaxed line-clamp-2">
                          {item.description}
                        </p>

                        {/* Tasting Notes */}
                        {item.tastingNotes && (
                          <div className="bg-latte/30 border border-border-cafe rounded-lg px-2.5 py-1.5 text-[11px] font-mono text-espresso/80 flex items-center gap-1.5">
                            <span className="text-crema">✦</span>
                            <span className="truncate">{item.tastingNotes}</span>
                          </div>
                        )}

                        {/* Inline Customization Option Pills */}
                        {item.options && item.options.length > 0 && (
                          <div className="space-y-1 pt-1">
                            <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-espresso/50">
                              Options / Dose:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {item.options.map((opt) => {
                                const isSelected =
                                  (selectedOptions[item.id] || item.options![0]) === opt
                                return (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => handleOptionSelect(item.id, opt)}
                                    className={`font-sans text-[11px] font-medium px-2.5 py-1 rounded-md transition-all ${
                                      isSelected
                                        ? 'bg-espresso text-card-white shadow-xs'
                                        : 'bg-latte/30 text-espresso/75 hover:bg-latte/60'
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Footer: Add to Tray / Quantity */}
                    <div className="p-5 pt-0 mt-3 border-t border-border-cafe/60 pt-4 flex items-center justify-between gap-3">
                      {quantityInTray > 0 ? (
                        <div className="flex items-center gap-2 bg-latte/40 border border-border-cafe rounded-xl px-2 py-1">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                -1,
                                selectedOptions[item.id] || item.options?.[0]
                              )
                            }
                            className="w-7 h-7 rounded-lg bg-card-white text-espresso font-bold flex items-center justify-center hover:bg-espresso hover:text-card-white transition-colors"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="font-mono text-xs font-bold text-espresso px-1 tabular-nums">
                            {quantityInTray} in Tray
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                1,
                                selectedOptions[item.id] || item.options?.[0]
                              )
                            }
                            className="w-7 h-7 rounded-lg bg-card-white text-espresso font-bold flex items-center justify-center hover:bg-espresso hover:text-card-white transition-colors"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <span className="font-mono text-xs text-espresso/50">
                          Freshly prepared
                        </span>
                      )}

                      <button
                        onClick={() => handleAddToCart(item)}
                        className={`font-sans font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-1.5 shadow-sm ${
                          isAdded
                            ? 'bg-[#25D366] text-white scale-105'
                            : 'bg-crema hover:bg-crema-dark text-card-white hover:scale-105 active:scale-95'
                        }`}
                      >
                        <span>{isAdded ? '✓ Added' : '+ Add to Tray'}</span>
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Bottom Menu Banner with WhatsApp Quick Order */}
        <div className="mt-16 bg-espresso rounded-3xl p-6 sm:p-10 border border-latte/15 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="font-mono text-xs font-bold text-kinetic-lime uppercase tracking-widest">
              ⚡ FAST BARISTA COUNTER
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-oat-cream">
              Want a customized roast or large group catering?
            </h3>
            <p className="font-sans text-xs sm:text-sm text-latte/75 max-w-xl">
              Message our head barista on WhatsApp with your exact roast level, milk alternative, or celebration party setup.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsTrayOpen(true)}
              className="bg-crema hover:bg-crema-dark text-card-white font-sans font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all hover:scale-105"
            >
              View Order Tray ({trayItems.reduce((s, i) => s + i.quantity, 0)})
            </button>
            <a
              href="https://wa.me/917277143557?text=Hi%2090ml%20Cafe!%20I%20have%20a%20special%20order%20query."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba59] text-white font-sans font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all hover:scale-105 flex items-center gap-2"
            >
              <span>💬 WhatsApp Barista</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

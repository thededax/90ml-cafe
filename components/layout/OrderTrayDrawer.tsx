'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTray } from '@/lib/tray-context'

export default function OrderTrayDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearTray,
    totalItems,
    totalAmount,
    isTrayOpen,
    setIsTrayOpen,
    generateWhatsAppLink,
  } = useTray()

  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [orderType, setOrderType] = useState('Takeaway / Pickup')
  const [notes, setNotes] = useState('')

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsTrayOpen(false)
    }
    if (isTrayOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isTrayOpen, setIsTrayOpen])

  const handleWhatsAppCheckout = () => {
    const url = generateWhatsAppLink({
      name: customerName || undefined,
      phone: customerPhone || undefined,
      orderType,
      instructions: notes || undefined,
    })
    window.open(url, '_blank')
  }

  return (
    <AnimatePresence>
      {isTrayOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsTrayOpen(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-espresso border-l border-latte/15 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-latte/10 bg-roast-elevated flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-kinetic-lime" />
                    <h2 className="font-display text-2xl font-bold text-oat-cream tracking-tight">
                      Your Order Tray
                    </h2>
                  </div>
                  <p className="font-sans text-xs text-latte/70 mt-1">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'} selected • 90ml Cafe Bhagalpur
                  </p>
                </div>
                <button
                  onClick={() => setIsTrayOpen(false)}
                  className="w-9 h-9 rounded-full bg-card-white/10 hover:bg-card-white/20 text-oat-cream flex items-center justify-center transition-colors"
                  aria-label="Close tray"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-roast-elevated border border-latte/15 mx-auto flex items-center justify-center text-3xl">
                      ☕
                    </div>
                    <h3 className="font-display text-xl text-oat-cream font-semibold">
                      Your tray is empty
                    </h3>
                    <p className="font-sans text-xs text-latte/70 max-w-xs mx-auto leading-relaxed">
                      Explore our 30ml classic solo, 60ml velvet doppio, 90ml signature craft pours, mocktails, and fresh cafe bites.
                    </p>
                    <button
                      onClick={() => {
                        setIsTrayOpen(false)
                        const el = document.getElementById('craft-menu')
                        if (el) el.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className="inline-block bg-crema text-card-white hover:bg-crema-dark font-sans text-xs font-semibold uppercase tracking-wider px-6 py-2.5 rounded-md transition-colors shadow-sm"
                    >
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between pb-2 border-b border-latte/10 text-xs text-latte/60">
                      <span>Selected Items</span>
                      <button
                        onClick={clearTray}
                        className="text-crema hover:underline font-medium"
                      >
                        Clear Tray
                      </button>
                    </div>

                    {items.map((item) => (
                      <div
                        key={`${item.id}-${item.option || 'standard'}`}
                        className="bg-roast-elevated border border-latte/10 rounded-xl p-4 flex gap-3 items-center justify-between transition-colors hover:border-latte/25"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-sans text-sm font-semibold text-oat-cream truncate">
                              {item.name}
                            </h4>
                            {item.temperature && item.temperature !== 'all' && (
                              <span
                                className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded ${
                                  item.temperature === 'hot'
                                    ? 'bg-crema/20 text-caramel'
                                    : 'bg-teal/20 text-teal'
                                }`}
                              >
                                {item.temperature === 'hot' ? '🔥 Hot' : '🧊 Iced'}
                              </span>
                            )}
                          </div>
                          {item.option && (
                            <p className="font-sans text-[11px] text-latte/60 mt-0.5">
                              Option: {item.option}
                            </p>
                          )}
                          <div className="font-mono text-sm font-semibold text-kinetic-lime mt-1 tabular-nums">
                            ₹{item.price * item.quantity}
                            {item.quantity > 1 && (
                              <span className="text-[11px] text-latte/50 font-normal ml-1.5">
                                (₹{item.price} each)
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-espresso border border-latte/15 rounded-lg px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1, item.option)}
                            className="w-6 h-6 rounded flex items-center justify-center text-oat-cream hover:bg-card-white/10 text-xs font-bold"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="font-mono text-xs font-bold text-oat-cream w-4 text-center tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1, item.option)}
                            className="w-6 h-6 rounded flex items-center justify-center text-oat-cream hover:bg-card-white/10 text-xs font-bold"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.id, item.option)}
                          className="text-latte/40 hover:text-red-400 p-1.5 transition-colors"
                          aria-label="Remove item"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}

                    {/* Order Details Accordion */}
                    <div className="pt-2 space-y-3">
                      <div className="space-y-1">
                        <label className="font-sans text-xs font-medium text-latte/80">
                          Seating / Order Type
                        </label>
                        <select
                          value={orderType}
                          onChange={(e) => setOrderType(e.target.value)}
                          className="w-full bg-roast-elevated border border-latte/20 rounded-lg px-3 py-2 text-xs text-oat-cream focus:outline-none focus:border-kinetic-lime"
                        >
                          <option value="Takeaway / Counter Pickup">Takeaway / Counter Pickup</option>
                          <option value="Dine-In Table (Provide Table # below)">Dine-In Table</option>
                          <option value="Work Desk (With Plug Point)">Work Desk Session</option>
                          <option value="Advance Scheduled Pickup">Advance Scheduled Pickup</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Your Name (optional)"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="bg-roast-elevated border border-latte/20 rounded-lg px-3 py-2 text-xs text-oat-cream placeholder-latte/40 focus:outline-none focus:border-kinetic-lime"
                        />
                        <input
                          type="tel"
                          placeholder="Phone / Table #"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="bg-roast-elevated border border-latte/20 rounded-lg px-3 py-2 text-xs text-oat-cream placeholder-latte/40 focus:outline-none focus:border-kinetic-lime"
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="Barista notes (e.g. less ice, extra shot)..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full bg-roast-elevated border border-latte/20 rounded-lg px-3 py-2 text-xs text-oat-cream placeholder-latte/40 focus:outline-none focus:border-kinetic-lime"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Footer Summary & Checkout */}
              {items.length > 0 && (
                <div className="p-6 border-t border-latte/10 bg-roast-elevated space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-latte/70 font-sans">
                      <span>Items Subtotal</span>
                      <span className="font-mono text-oat-cream tabular-nums">₹{totalAmount}</span>
                    </div>
                    <div className="flex justify-between text-xs text-latte/70 font-sans">
                      <span>Service & Packaging</span>
                      <span className="font-mono text-kinetic-lime tabular-nums">FREE</span>
                    </div>
                    <div className="flex justify-between text-base font-bold font-sans text-oat-cream pt-2 border-t border-latte/10">
                      <span>Estimated Total</span>
                      <span className="font-mono text-xl text-kinetic-lime tabular-nums">
                        ₹{totalAmount}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={handleWhatsAppCheckout}
                      className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-sans font-bold text-sm uppercase tracking-wider py-3.5 px-4 rounded-xl flex items-center justify-center gap-2.5 transition-transform hover:scale-[1.02] shadow-lg shadow-[#25D366]/20"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      <span>Send Order on WhatsApp</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsTrayOpen(false)
                        const el = document.getElementById('order-reserve')
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth' })
                        } else {
                          window.location.href = '/booking'
                        }
                      }}
                      className="w-full bg-crema hover:bg-crema-dark text-card-white font-sans font-semibold text-xs uppercase tracking-wider py-3 px-4 rounded-xl text-center transition-colors shadow-sm"
                    >
                      Book Table & Pre-Order Online →
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

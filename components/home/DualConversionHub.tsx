'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTray } from '@/lib/tray-context'

type ActiveTab = 'preorder' | 'table' | 'party'

const timeSlots = [
  '11:00 AM',
  '12:30 PM',
  '2:00 PM',
  '3:30 PM',
  '5:00 PM',
  '6:30 PM',
  '8:00 PM',
  '9:30 PM',
]

const seatingVibes = [
  { id: 'work', label: '💻 Work Desk + Plug Point', desc: 'Quiet spot with power outlet & high-speed Wi-Fi' },
  { id: 'cozy', label: '🛋️ Cozy Corner Booth (2–4)', desc: 'Soft lighting, plush seating, conversation nook' },
  { id: 'group', label: '👥 Group Hangout Table (4–8)', desc: 'Spacious table for squads, board games & food platters' },
]

const partyTypes = ['Birthday Celebration', 'Anniversary', 'Couple Date Night', 'Squad Hangout', 'Other']
const decorationsList = ['Balloon Setup', 'Couple Candle Setup', 'Birthday Banner', 'Flower Bouquet', 'Customized Table']
const budgetRanges = ['Under ₹500', '₹500–1,000', '₹1,000–2,000', 'Above ₹2,000']

export default function DualConversionHub() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('preorder')
  const [submitting, setSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const {
    items: trayItems,
    totalItems,
    totalAmount,
    removeItem,
    updateQuantity,
    generateWhatsAppLink,
  } = useTray()

  // Form states - Preorder
  const [preorderName, setPreorderName] = useState('')
  const [preorderPhone, setPreorderPhone] = useState('')
  const [preorderType, setPreorderType] = useState('Takeaway / Counter Pickup (15m)')
  const [preorderDate, setPreorderDate] = useState(new Date().toISOString().split('T')[0])
  const [preorderTime, setPreorderTime] = useState('ASAP (15–20 mins)')
  const [preorderNotes, setPreorderNotes] = useState('')

  // Form states - Table Reservation
  const [tableName, setTableName] = useState('')
  const [tablePhone, setTablePhone] = useState('')
  const [tableDate, setTableDate] = useState(new Date().toISOString().split('T')[0])
  const [tableTime, setTableTime] = useState('5:00 PM')
  const [tableGuests, setTableGuests] = useState(2)
  const [tableSeatingVibe, setTableSeatingVibe] = useState('💻 Work Desk + Plug Point')
  const [tableNotes, setTableNotes] = useState('')

  // Form states - Party
  const [partyName, setPartyName] = useState('')
  const [partyPhone, setPartyPhone] = useState('')
  const [partyType, setPartyType] = useState('Birthday Celebration')
  const [partyDate, setPartyDate] = useState(new Date().toISOString().split('T')[0])
  const [partyTime, setPartyTime] = useState('6:30 PM')
  const [partyGuests, setPartyGuests] = useState(4)
  const [partyDecorations, setPartyDecorations] = useState<string[]>([])
  const [partyBudget, setPartyBudget] = useState('₹1,000–2,000')
  const [partyNotes, setPartyNotes] = useState('')

  const validatePhone = (phone: string) => /^[6-9]\d{9}$/.test(phone.trim())

  const handlePreorderSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!preorderName.trim()) newErrors.preorderName = 'Please enter your name'
    if (!preorderPhone.trim() || !validatePhone(preorderPhone)) {
      newErrors.preorderPhone = 'Enter a valid 10-digit Indian phone number'
    }
    if (trayItems.length === 0) {
      newErrors.tray = 'Your tray is empty! Please add at least one item from the menu.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setSubmitting(true)

    try {
      // 1. Post to API for recording
      await fetch('/api/booking/preorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: preorderName,
          phone: preorderPhone,
          date: preorderDate,
          time: preorderTime,
          guests: 1,
          instructions: `${preorderType} | ${preorderNotes}`,
          items: trayItems,
          total: totalAmount,
        }),
      }).catch(() => null) // Resilient

      // 2. Open WhatsApp with formatted itemized order
      const waUrl = generateWhatsAppLink({
        name: preorderName,
        phone: preorderPhone,
        orderType: `${preorderType} (Time: ${preorderTime})`,
        instructions: preorderNotes,
      })

      window.open(waUrl, '_blank')
      setSuccessMessage('Pre-order received! Opening WhatsApp to verify preparation with our barista.')
    } catch {
      alert('Could not record order. Please message directly on WhatsApp.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleTableSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!tableName.trim()) newErrors.tableName = 'Please enter your name'
    if (!tablePhone.trim() || !validatePhone(tablePhone)) {
      newErrors.tablePhone = 'Enter a valid 10-digit Indian phone number'
    }
    if (!tableDate) newErrors.tableDate = 'Please select a date'
    if (!tableTime) newErrors.tableTime = 'Please select a time'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setSubmitting(true)

    try {
      const res = await fetch('/api/booking/table', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: tableName,
          phone: tablePhone,
          date: tableDate,
          time: tableTime,
          guests: tableGuests,
          specialRequest: `Vibe: ${tableSeatingVibe} | ${tableNotes}`,
        }),
      })

      if (res.ok) {
        setSuccessMessage(`Table Reserved for ${tableName} on ${tableDate} at ${tableTime}! See you at 90ml Cafe.`)
      } else {
        throw new Error('Booking failed')
      }
    } catch {
      alert('Reservation could not be submitted automatically. Please reach out via WhatsApp.')
    } finally {
      setSubmitting(false)
    }
  }

  const handlePartySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!partyName.trim()) newErrors.partyName = 'Please enter your name'
    if (!partyPhone.trim() || !validatePhone(partyPhone)) {
      newErrors.partyPhone = 'Enter a valid 10-digit Indian phone number'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setSubmitting(true)

    try {
      const res = await fetch('/api/booking/party', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: partyName,
          phone: partyPhone,
          partyType,
          date: partyDate,
          time: partyTime,
          guests: partyGuests,
          decorations: partyDecorations,
          budget: partyBudget,
          message: partyNotes,
        }),
      })

      if (res.ok) {
        setSuccessMessage(`Party Booking recorded for ${partyName}! Our team will call you to confirm decorations.`)
      } else {
        throw new Error('Party booking failed')
      }
    } catch {
      alert('Failed to submit party booking. Please contact us on WhatsApp.')
    } finally {
      setSubmitting(false)
    }
  }

  const toggleDecoration = (item: string) => {
    setPartyDecorations((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    )
  }

  return (
    <section id="order-reserve" className="bg-espresso text-on-dark py-20 lg:py-28 relative border-t border-latte/15 overflow-hidden">
      {/* Ambient background glows */}
      <div
        className="absolute top-1/3 -right-24 w-96 h-96 rounded-full pointer-events-none opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-10 -left-24 w-96 h-96 rounded-full pointer-events-none opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #17b59a 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-roast-elevated border border-latte/20 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-kinetic-lime">
            <span>⚡ CONVERSION & RESERVATION HUB</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-oat-cream tracking-tight">
            Order Ahead or Save Your Spot
          </h2>
          <p className="font-sans text-sm sm:text-base text-latte/80 leading-relaxed">
            Skip the counter wait with 1-click pre-ordering, or book your favorite work desk and celebration booth in advance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left 7 Columns: Dual-Mode Tabs & Form */}
          <div className="lg:col-span-7 bg-roast-elevated border border-latte/15 rounded-3xl p-6 sm:p-8 shadow-2xl">
            {/* Tab Navigation */}
            <div className="flex p-1 bg-espresso rounded-2xl border border-latte/10 mb-8">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('preorder')
                  setSuccessMessage('')
                }}
                className={`flex-1 font-sans text-xs sm:text-sm font-semibold py-3 px-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  activeTab === 'preorder'
                    ? 'bg-crema text-card-white shadow-md'
                    : 'text-latte/70 hover:text-oat-cream'
                }`}
              >
                <span>☕</span>
                <span className="hidden sm:inline">Skip-the-Line</span>
                <span>Pre-Order</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('table')
                  setSuccessMessage('')
                }}
                className={`flex-1 font-sans text-xs sm:text-sm font-semibold py-3 px-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  activeTab === 'table'
                    ? 'bg-crema text-card-white shadow-md'
                    : 'text-latte/70 hover:text-oat-cream'
                }`}
              >
                <span>🛋️</span>
                <span>Book Table</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('party')
                  setSuccessMessage('')
                }}
                className={`flex-1 font-sans text-xs sm:text-sm font-semibold py-3 px-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  activeTab === 'party'
                    ? 'bg-crema text-card-white shadow-md'
                    : 'text-latte/70 hover:text-oat-cream'
                }`}
              >
                <span>🎉</span>
                <span>Celebration</span>
              </button>
            </div>

            {/* Success Notification */}
            <AnimatePresence>
              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-teal/20 border border-teal text-oat-cream p-4 rounded-2xl mb-6 text-sm flex items-start gap-3"
                >
                  <span className="text-xl">✓</span>
                  <div>
                    <h4 className="font-sans font-bold text-teal">Success!</h4>
                    <p className="text-xs text-oat-cream/90 mt-0.5">{successMessage}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* TAB 1: PRE-ORDER FORM */}
            {activeTab === 'preorder' && (
              <form onSubmit={handlePreorderSubmit} className="space-y-6">
                {/* Live Order Tray Preview */}
                <div className="bg-espresso rounded-2xl p-4 sm:p-5 border border-latte/15 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-latte/70 font-semibold uppercase">
                      Current Order Tray:
                    </span>
                    <span className="text-kinetic-lime font-bold">
                      {totalItems} items • ₹{totalAmount}
                    </span>
                  </div>

                  {trayItems.length === 0 ? (
                    <div className="py-6 text-center space-y-2">
                      <p className="font-sans text-xs text-latte/60">
                        Your tray is currently empty.
                      </p>
                      <a
                        href="#craft-menu"
                        className="inline-block font-sans text-xs font-semibold text-kinetic-lime hover:underline"
                      >
                        Browse Menu & Add Drinks / Bites →
                      </a>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {trayItems.map((item) => (
                        <div
                          key={`${item.id}-${item.option || 'def'}`}
                          className="flex items-center justify-between gap-3 text-xs bg-roast-elevated p-2.5 rounded-xl border border-latte/10"
                        >
                          <div className="min-w-0">
                            <span className="font-sans font-semibold text-oat-cream truncate block">
                              {item.name}
                            </span>
                            {item.option && (
                              <span className="font-sans text-[11px] text-latte/50">
                                {item.option}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 bg-espresso px-2 py-0.5 rounded border border-latte/15 font-mono text-xs">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, -1, item.option)}
                                className="text-latte/70 hover:text-white px-1"
                              >
                                −
                              </button>
                              <span className="font-bold text-kinetic-lime tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, 1, item.option)}
                                className="text-latte/70 hover:text-white px-1"
                              >
                                +
                              </button>
                            </div>
                            <span className="font-mono font-bold text-oat-cream tabular-nums w-12 text-right">
                              ₹{item.price * item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id, item.option)}
                              className="text-latte/40 hover:text-red-400"
                              title="Remove"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {errors.tray && (
                    <p className="font-sans text-xs text-red-400">{errors.tray}</p>
                  )}
                </div>

                {/* Pickup / Seating Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-sans text-xs font-semibold text-oat-cream">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={preorderName}
                      onChange={(e) => setPreorderName(e.target.value)}
                      className="w-full bg-espresso border border-latte/20 rounded-xl px-4 py-3 text-xs text-oat-cream focus:outline-none focus:border-kinetic-lime"
                    />
                    {errors.preorderName && (
                      <p className="text-xs text-red-400">{errors.preorderName}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-sans text-xs font-semibold text-oat-cream">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={preorderPhone}
                      onChange={(e) => setPreorderPhone(e.target.value)}
                      className="w-full bg-espresso border border-latte/20 rounded-xl px-4 py-3 text-xs text-oat-cream focus:outline-none focus:border-kinetic-lime font-mono"
                    />
                    {errors.preorderPhone && (
                      <p className="text-xs text-red-400">{errors.preorderPhone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-sans text-xs font-semibold text-oat-cream">
                      Order / Seating Mode
                    </label>
                    <select
                      value={preorderType}
                      onChange={(e) => setPreorderType(e.target.value)}
                      className="w-full bg-espresso border border-latte/20 rounded-xl px-4 py-3 text-xs text-oat-cream focus:outline-none focus:border-kinetic-lime"
                    >
                      <option value="Takeaway / Counter Pickup (15m)">Takeaway / Counter Pickup</option>
                      <option value="Dine-In Table (Enter table # in notes)">Dine-In Table Order</option>
                      <option value="Work Desk Session">Work Desk Pickup</option>
                      <option value="Scheduled Evening Pickup">Scheduled Evening Pickup</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-sans text-xs font-semibold text-oat-cream">
                      Preparation Time
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. In 15 mins / 6:00 PM"
                      value={preorderTime}
                      onChange={(e) => setPreorderTime(e.target.value)}
                      className="w-full bg-espresso border border-latte/20 rounded-xl px-4 py-3 text-xs text-oat-cream focus:outline-none focus:border-kinetic-lime"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-sans text-xs font-semibold text-oat-cream">
                    Barista Customization / Table Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Less sugar, extra ice, oat milk substitute, dining at Table 3..."
                    value={preorderNotes}
                    onChange={(e) => setPreorderNotes(e.target.value)}
                    className="w-full bg-espresso border border-latte/20 rounded-xl px-4 py-2.5 text-xs text-oat-cream focus:outline-none focus:border-kinetic-lime"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-sans font-bold text-sm uppercase tracking-wider py-4 px-6 rounded-xl flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] shadow-xl shadow-[#25D366]/20 disabled:opacity-50"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>
                    {submitting ? 'Dispatching...' : `Submit & Send via WhatsApp (₹${totalAmount})`}
                  </span>
                </button>
              </form>
            )}

            {/* TAB 2: TABLE RESERVATION FORM */}
            {activeTab === 'table' && (
              <form onSubmit={handleTableSubmit} className="space-y-6">
                {/* Seating Vibe Selector */}
                <div className="space-y-2">
                  <label className="font-sans text-xs font-semibold text-oat-cream">
                    Choose Your Seating Vibe *
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {seatingVibes.map((vibe) => (
                      <button
                        key={vibe.id}
                        type="button"
                        onClick={() => setTableSeatingVibe(vibe.label)}
                        className={`text-left p-3.5 rounded-xl border transition-all ${
                          tableSeatingVibe === vibe.label
                            ? 'bg-espresso border-kinetic-lime text-oat-cream shadow-sm'
                            : 'bg-espresso/50 border-latte/15 text-latte/70 hover:border-latte/30'
                        }`}
                      >
                        <div className="font-sans text-xs font-bold text-oat-cream">
                          {vibe.label}
                        </div>
                        <div className="font-sans text-[11px] text-latte/60 mt-0.5">
                          {vibe.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-sans text-xs font-semibold text-oat-cream">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Singh"
                      value={tableName}
                      onChange={(e) => setTableName(e.target.value)}
                      className="w-full bg-espresso border border-latte/20 rounded-xl px-4 py-3 text-xs text-oat-cream focus:outline-none focus:border-kinetic-lime"
                    />
                    {errors.tableName && (
                      <p className="text-xs text-red-400">{errors.tableName}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-sans text-xs font-semibold text-oat-cream">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={tablePhone}
                      onChange={(e) => setTablePhone(e.target.value)}
                      className="w-full bg-espresso border border-latte/20 rounded-xl px-4 py-3 text-xs text-oat-cream focus:outline-none focus:border-kinetic-lime font-mono"
                    />
                    {errors.tablePhone && (
                      <p className="text-xs text-red-400">{errors.tablePhone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-sans text-xs font-semibold text-oat-cream">
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={tableDate}
                      onChange={(e) => setTableDate(e.target.value)}
                      className="w-full bg-espresso border border-latte/20 rounded-xl px-4 py-3 text-xs text-oat-cream focus:outline-none focus:border-kinetic-lime font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-sans text-xs font-semibold text-oat-cream">
                      Time Slot *
                    </label>
                    <select
                      value={tableTime}
                      onChange={(e) => setTableTime(e.target.value)}
                      className="w-full bg-espresso border border-latte/20 rounded-xl px-4 py-3 text-xs text-oat-cream focus:outline-none focus:border-kinetic-lime"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-sans text-xs font-semibold text-oat-cream">
                      Guests
                    </label>
                    <select
                      value={tableGuests}
                      onChange={(e) => setTableGuests(Number(e.target.value))}
                      className="w-full bg-espresso border border-latte/20 rounded-xl px-4 py-3 text-xs text-oat-cream focus:outline-none focus:border-kinetic-lime font-mono"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'Person' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-sans text-xs font-semibold text-oat-cream">
                    Special Requests (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Near window, extra charging extension, birthday greeting..."
                    value={tableNotes}
                    onChange={(e) => setTableNotes(e.target.value)}
                    className="w-full bg-espresso border border-latte/20 rounded-xl px-4 py-3 text-xs text-oat-cream focus:outline-none focus:border-kinetic-lime"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-crema hover:bg-crema-dark text-card-white font-sans font-bold text-sm uppercase tracking-wider py-4 px-6 rounded-xl transition-all hover:scale-[1.02] shadow-xl disabled:opacity-50"
                >
                  {submitting ? 'Confirming Reservation...' : 'Confirm Table Reservation'}
                </button>
              </form>
            )}

            {/* TAB 3: PARTY & CELEBRATION BOOKING */}
            {activeTab === 'party' && (
              <form onSubmit={handlePartySubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-sans text-xs font-semibold text-oat-cream">
                      Organizer Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Amit Kumar"
                      value={partyName}
                      onChange={(e) => setPartyName(e.target.value)}
                      className="w-full bg-espresso border border-latte/20 rounded-xl px-4 py-3 text-xs text-oat-cream focus:outline-none focus:border-kinetic-lime"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-sans text-xs font-semibold text-oat-cream">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={partyPhone}
                      onChange={(e) => setPartyPhone(e.target.value)}
                      className="w-full bg-espresso border border-latte/20 rounded-xl px-4 py-3 text-xs text-oat-cream focus:outline-none focus:border-kinetic-lime font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-sans text-xs font-semibold text-oat-cream">
                      Celebration Type
                    </label>
                    <select
                      value={partyType}
                      onChange={(e) => setPartyType(e.target.value)}
                      className="w-full bg-espresso border border-latte/20 rounded-xl px-4 py-3 text-xs text-oat-cream focus:outline-none focus:border-kinetic-lime"
                    >
                      {partyTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-sans text-xs font-semibold text-oat-cream">
                      Estimated Budget
                    </label>
                    <select
                      value={partyBudget}
                      onChange={(e) => setPartyBudget(e.target.value)}
                      className="w-full bg-espresso border border-latte/20 rounded-xl px-4 py-3 text-xs text-oat-cream focus:outline-none focus:border-kinetic-lime font-mono"
                    >
                      {budgetRanges.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Decorations Checklist */}
                <div className="space-y-2">
                  <label className="font-sans text-xs font-semibold text-oat-cream">
                    Decoration & Setup Needs
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {decorationsList.map((dec) => {
                      const isSelected = partyDecorations.includes(dec)
                      return (
                        <button
                          key={dec}
                          type="button"
                          onClick={() => toggleDecoration(dec)}
                          className={`font-sans text-xs px-3 py-1.5 rounded-lg border transition-all ${
                            isSelected
                              ? 'bg-kinetic-lime text-espresso font-bold border-kinetic-lime shadow-sm'
                              : 'bg-espresso border-latte/15 text-latte/70 hover:border-latte/30'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}
                          {dec}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-sans text-xs font-semibold text-oat-cream">
                    Special Details or Cake Requests
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us about special music, photography, customized mocktail names..."
                    value={partyNotes}
                    onChange={(e) => setPartyNotes(e.target.value)}
                    className="w-full bg-espresso border border-latte/20 rounded-xl px-4 py-2.5 text-xs text-oat-cream focus:outline-none focus:border-kinetic-lime"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-kinetic-lime hover:bg-[#d4ec05] text-espresso font-sans font-bold text-sm uppercase tracking-wider py-4 px-6 rounded-xl transition-all hover:scale-[1.02] shadow-xl disabled:opacity-50"
                >
                  {submitting ? 'Sending Request...' : 'Book Celebration Package'}
                </button>
              </form>
            )}
          </div>

          {/* Right 5 Columns: Cafe Info, Hours, Direct Links & Live Map */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Info Card */}
            <div className="bg-roast-elevated border border-latte/15 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-espresso border border-latte/20 flex items-center justify-center text-2xl">
                  📍
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-oat-cream">
                    90ml Cafe Bhagalpur
                  </h3>
                  <p className="font-sans text-xs text-kinetic-lime font-mono">
                    Maa Tara Corner • Drunkyard Experience
                  </p>
                </div>
              </div>

              <div className="space-y-3 font-sans text-xs text-latte/80 border-t border-latte/10 pt-4">
                <div className="flex items-start gap-2.5">
                  <span className="text-base">🗺️</span>
                  <div>
                    <strong className="text-oat-cream block">Address:</strong>
                    S.M College Rd, Chhoti Khanjarpur, Khanjarpur, Bhagalpur, Bihar 812001
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="text-base">🕐</span>
                  <div>
                    <strong className="text-oat-cream">Hours:</strong> Open Daily 11:00 AM – 11:00 PM
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="text-base">📞</span>
                  <div>
                    <strong className="text-oat-cream">Direct Call:</strong>{' '}
                    <a href="tel:+917277143557" className="text-kinetic-lime hover:underline font-mono">
                      +91 72771 43557
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="text-base">💬</span>
                  <div>
                    <strong className="text-oat-cream">WhatsApp:</strong>{' '}
                    <a
                      href="https://wa.me/917277143557"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal hover:underline font-mono"
                    >
                      Chat with Barista
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://www.google.com/maps/place/90ml+Drunkyard+Cafe/@25.2585131,86.9885693,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-espresso border border-latte/20 hover:border-kinetic-lime text-oat-cream hover:text-kinetic-lime font-sans font-semibold text-xs uppercase tracking-wider py-3 px-4 rounded-xl text-center transition-colors"
                >
                  📍 Open in Google Maps
                </a>
                <a
                  href="tel:+917277143557"
                  className="flex-1 bg-crema hover:bg-crema-dark text-card-white font-sans font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl text-center transition-colors"
                >
                  📞 Call Now
                </a>
              </div>
            </div>

            {/* Embedded Live Map */}
            <div className="rounded-3xl overflow-hidden border border-latte/20 shadow-xl bg-espresso aspect-[16/10]">
              <iframe
                src="https://maps.google.com/maps?q=90ml+Drunkyard+Cafe+Bhagalpur&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '260px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="90ML Cafe Bhagalpur Location Map"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

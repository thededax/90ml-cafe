'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import menuData from '@/data/menu.json'

type BookingTab = 'table' | 'preorder' | 'party'

const tabs: { id: BookingTab; label: string }[] = [
  { id: 'table', label: 'Table Booking' },
  { id: 'preorder', label: 'Menu Pre-Order' },
  { id: 'party', label: 'Party Booking' },
]

const renderTabIcon = (id: BookingTab) => {
  switch (id) {
    case 'table':
      return (
        <svg className="w-5 h-5 mx-auto mb-1 text-current" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    case 'preorder':
      return (
        <svg className="w-5 h-5 mx-auto mb-1 text-current" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    case 'party':
      return (
        <svg className="w-5 h-5 mx-auto mb-1 text-current" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.286L13 21l-2.286-6.857L5 12l5.714-2.286L13 3z" />
        </svg>
      )
  }
}

const renderCategoryIcon = (category: string) => {
  switch (category) {
    case 'Mocktails':
      return (
        <svg className="w-6 h-6 text-teal mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 2H6M6 2l6 9v9m-4 2h8m-9-16h10L12 11 7 5z" />
        </svg>
      )
    case 'Shakes':
      return (
        <svg className="w-6 h-6 text-teal mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v2a2 2 0 01-2 2h-2M5 8h12v12a2 2 0 01-2 2H7a2 2 0 01-2-2V8zM12 2v6" />
        </svg>
      )
    case 'Juices':
      return (
        <svg className="w-6 h-6 text-teal mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 21l-1.5-3m-9 3L9 18M6 3h12v12a3 3 0 01-3 3H9a3 3 0 01-3-3V3z" />
        </svg>
      )
    case 'Snacks':
      return (
        <svg className="w-6 h-6 text-teal mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 22a10 10 0 100-20 10 10 0 000 20zM8 12h8M12 8v8" />
        </svg>
      )
    default:
      return (
        <svg className="w-6 h-6 text-teal mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 5V3a1 1 0 00-1-1H9a1 1 0 00-1 1v2" />
        </svg>
      )
  }
}

const timeSlots = ['11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM', '7:00 PM', '9:00 PM']
const partyTypes = ['Birthday', 'Anniversary', 'Couple Date', 'Group Hangout', 'Other']
const budgetRanges = ['Under ₹500', '₹500–1000', '₹1000–2000', 'Above ₹2000']
const decorations = ['Balloon Decoration', 'Couple Setup', 'Birthday Banner', 'Flower Decoration', 'Customised Setup']
const menuCategories = ['All', 'Mocktails', 'Shakes', 'Juices', 'Snacks', 'Combos']

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
}

function BookingContent() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<BookingTab>('table')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Table form
  const [tableName, setTableName] = useState('')
  const [tablePhone, setTablePhone] = useState('')
  const [tableDate, setTableDate] = useState('')
  const [tableTime, setTableTime] = useState('')
  const [tableGuests, setTableGuests] = useState(2)
  const [tableRequest, setTableRequest] = useState('')

  // Pre-order form
  const [preorderName, setPreorderName] = useState('')
  const [preorderPhone, setPreorderPhone] = useState('')
  const [preorderDate, setPreorderDate] = useState('')
  const [preorderTime, setPreorderTime] = useState('')
  const [preorderGuests, setPreorderGuests] = useState(2)
  const [preorderInstructions, setPreorderInstructions] = useState('')
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [menuFilter, setMenuFilter] = useState('All')

  // Party form
  const [partyName, setPartyName] = useState('')
  const [partyPhone, setPartyPhone] = useState('')
  const [partyType, setPartyType] = useState('')
  const [partyDate, setPartyDate] = useState('')
  const [partyTime, setPartyTime] = useState('')
  const [partyGuests, setPartyGuests] = useState(2)
  const [partyDecorations, setPartyDecorations] = useState<string[]>([])
  const [partyBudget, setPartyBudget] = useState('')
  const [partyMessage, setPartyMessage] = useState('')

  useEffect(() => {
    const type = searchParams.get('type')
    if (type === 'party') setActiveTab('party')
    else if (type === 'preorder') setActiveTab('preorder')
  }, [searchParams])

  const today = new Date().toISOString().split('T')[0]

  const validatePhone = (phone: string) => /^[6-9]\d{9}$/.test(phone)

  const addToOrder = (item: typeof menuData[0]) => {
    const existing = orderItems.find(o => o.id === item.id)
    if (existing) {
      setOrderItems(orderItems.map(o => o.id === item.id ? { ...o, quantity: o.quantity + 1 } : o))
    } else {
      setOrderItems([...orderItems, { id: item.id, name: item.name, price: item.price, quantity: 1 }])
    }
  }

  const updateQuantity = (id: string, delta: number) => {
    setOrderItems(orderItems.map(o => {
      if (o.id === id) {
        const newQty = o.quantity + delta
        return newQty <= 0 ? null : { ...o, quantity: newQty }
      }
      return o
    }).filter(Boolean) as OrderItem[])
  }

  const orderTotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const filteredMenu = menuFilter === 'All' ? menuData : menuData.filter(item => item.category === menuFilter)

  const handleSubmit = async (type: BookingTab) => {
    const newErrors: Record<string, string> = {}

    if (type === 'table') {
      if (!tableName) newErrors.tableName = 'Name is required'
      if (!tablePhone || !validatePhone(tablePhone)) newErrors.tablePhone = 'Valid 10-digit phone required'
      if (!tableDate) newErrors.tableDate = 'Date is required'
      if (!tableTime) newErrors.tableTime = 'Time is required'
    } else if (type === 'preorder') {
      if (!preorderName) newErrors.preorderName = 'Name is required'
      if (!preorderPhone || !validatePhone(preorderPhone)) newErrors.preorderPhone = 'Valid 10-digit phone required'
      if (!preorderDate) newErrors.preorderDate = 'Date is required'
      if (!preorderTime) newErrors.preorderTime = 'Time is required'
      if (orderItems.length === 0) newErrors.orderItems = 'Please add at least one item'
    } else {
      if (!partyName) newErrors.partyName = 'Name is required'
      if (!partyPhone || !validatePhone(partyPhone)) newErrors.partyPhone = 'Valid 10-digit phone required'
      if (!partyType) newErrors.partyType = 'Party type is required'
      if (!partyDate) newErrors.partyDate = 'Date is required'
      if (!partyTime) newErrors.partyTime = 'Time is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setSubmitting(true)

    try {
      const endpoint = `/api/booking/${type}`
      let body: Record<string, unknown> = {}

      if (type === 'table') {
        body = { name: tableName, phone: tablePhone, date: tableDate, time: tableTime, guests: tableGuests, specialRequest: tableRequest }
      } else if (type === 'preorder') {
        body = { name: preorderName, phone: preorderPhone, date: preorderDate, time: preorderTime, guests: preorderGuests, instructions: preorderInstructions, items: orderItems, total: orderTotal }
      } else {
        body = { name: partyName, phone: partyPhone, partyType, date: partyDate, time: partyTime, guests: partyGuests, decorations: partyDecorations, budget: partyBudget, message: partyMessage }
      }

      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })

      if (res.ok) {
        setSuccess(true)
      } else {
        throw new Error('Booking failed')
      }
    } catch {
      alert('Something went wrong. Please try again or contact us on WhatsApp.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <section className="min-h-screen bg-black flex items-center justify-center px-6 pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#0A0A0A] border border-yellow/20 rounded-xl p-10 text-center max-w-lg w-full"
        >
          <h2 className="font-bebas text-5xl text-yellow mb-4">BOOKING CONFIRMED! 🎉</h2>
          <p className="font-poppins text-white/70 mb-8">
            We&apos;ll see you soon. For any changes, WhatsApp us directly.
          </p>
          <a
            href={`https://wa.me/917277143557?text=${encodeURIComponent('Hi! I just made a booking at 90ML Drunkyard Cafe.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#25D366] text-white font-poppins font-semibold uppercase tracking-wider px-8 py-4 rounded hover:scale-105 transition-all duration-200 text-sm"
          >
            💬 WhatsApp Us
          </a>
        </motion.div>
      </section>
    )
  }

  const inputClass = 'w-full bg-[#0A0A0A] border border-white/10 rounded px-4 py-3 font-poppins text-sm text-white placeholder:text-white/30 focus:border-yellow/60 focus:outline-none transition-colors'
  const labelClass = 'block font-poppins text-sm text-white/70 mb-2'
  const errorClass = 'text-red-500 font-poppins text-xs mt-1'

  return (
    <>
      {/* Header */}
      <section className="bg-black pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-bebas text-5xl md:text-[80px] text-yellow mb-4">BOOK YOUR EXPERIENCE</h1>
          <p className="font-poppins font-light text-lg text-white/60">
            Table booking, pre-orders, and party planning — all in one place.
          </p>
        </div>
      </section>

      {/* Tab Selector */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="grid grid-cols-3 gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setErrors({}) }}
              className={`font-poppins font-semibold text-xs sm:text-sm uppercase tracking-wider py-4 px-2 sm:px-4 rounded transition-all duration-200 flex flex-col items-center justify-center ${
                activeTab === tab.id
                  ? 'bg-yellow text-black'
                  : 'bg-black border border-yellow text-yellow hover:bg-yellow/10'
              }`}
            >
              {renderTabIcon(tab.id)}
              <span className="mt-1 text-center">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Forms */}
      <section className="bg-black pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatePresence mode="wait">
            {/* TABLE BOOKING */}
            {activeTab === 'table' && (
              <motion.div key="table" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input type="text" className={inputClass} placeholder="Your name" value={tableName} onChange={e => setTableName(e.target.value)} />
                    {errors.tableName && <p className={errorClass}>{errors.tableName}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Phone Number *</label>
                    <input type="tel" className={inputClass} placeholder="10-digit number" value={tablePhone} onChange={e => setTablePhone(e.target.value)} maxLength={10} />
                    {errors.tablePhone && <p className={errorClass}>{errors.tablePhone}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Date of Visit *</label>
                    <input type="date" className={inputClass} min={today} value={tableDate} onChange={e => setTableDate(e.target.value)} />
                    {errors.tableDate && <p className={errorClass}>{errors.tableDate}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Time Slot *</label>
                    <select className={inputClass} value={tableTime} onChange={e => setTableTime(e.target.value)}>
                      <option value="">Select time</option>
                      {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.tableTime && <p className={errorClass}>{errors.tableTime}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Number of Guests</label>
                    <input type="number" className={inputClass} min={1} max={20} value={tableGuests} onChange={e => setTableGuests(Number(e.target.value))} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Special Request</label>
                  <textarea className={inputClass} rows={3} placeholder="Any special requests..." value={tableRequest} onChange={e => setTableRequest(e.target.value)} />
                </div>
                <button onClick={() => handleSubmit('table')} disabled={submitting} className="w-full bg-yellow text-black font-poppins font-bold uppercase tracking-wider py-4 rounded hover:scale-[1.02] hover:shadow-[0_0_20px_#E8EA0060] transition-all duration-200 disabled:opacity-50">
                  {submitting ? 'Confirming...' : 'Confirm Table Booking'}
                </button>
              </motion.div>
            )}

            {/* PRE-ORDER */}
            {activeTab === 'preorder' && (
              <motion.div key="preorder" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input type="text" className={inputClass} placeholder="Your name" value={preorderName} onChange={e => setPreorderName(e.target.value)} />
                    {errors.preorderName && <p className={errorClass}>{errors.preorderName}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Phone Number *</label>
                    <input type="tel" className={inputClass} placeholder="10-digit number" value={preorderPhone} onChange={e => setPreorderPhone(e.target.value)} maxLength={10} />
                    {errors.preorderPhone && <p className={errorClass}>{errors.preorderPhone}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Date *</label>
                    <input type="date" className={inputClass} min={today} value={preorderDate} onChange={e => setPreorderDate(e.target.value)} />
                    {errors.preorderDate && <p className={errorClass}>{errors.preorderDate}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Time *</label>
                    <select className={inputClass} value={preorderTime} onChange={e => setPreorderTime(e.target.value)}>
                      <option value="">Select time</option>
                      {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.preorderTime && <p className={errorClass}>{errors.preorderTime}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Number of Guests</label>
                    <input type="number" className={inputClass} min={1} max={20} value={preorderGuests} onChange={e => setPreorderGuests(Number(e.target.value))} />
                  </div>
                </div>

                {/* Menu Item Selector */}
                <div>
                  <label className={labelClass}>Select Items *</label>
                  {errors.orderItems && <p className={errorClass}>{errors.orderItems}</p>}
                  <div className="flex gap-2 overflow-x-auto mb-4 pb-1">
                    {menuCategories.map(cat => (
                      <button key={cat} onClick={() => setMenuFilter(cat)} className={`font-poppins text-xs uppercase tracking-wider px-3 py-1.5 rounded whitespace-nowrap transition-all ${menuFilter === cat ? 'bg-yellow text-black' : 'text-white/60 hover:text-yellow'}`}>
                        {cat}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-2">
                    {filteredMenu.map(item => {
                      const inOrder = orderItems.find(o => o.id === item.id)
                      return (
                        <div key={item.id} className={`bg-[#0A0A0A] border rounded-lg p-3.5 cursor-pointer transition-all flex flex-col items-center text-center justify-center ${inOrder ? 'border-yellow/60' : 'border-white/[0.06] hover:border-yellow/30'}`} onClick={() => addToOrder(item)}>
                          <div className="mb-2">{renderCategoryIcon(item.category)}</div>
                          <p className="font-poppins text-xs text-white truncate w-full">{item.name}</p>
                          <p className="font-poppins font-bold text-sm text-yellow mt-1">₹{item.price}</p>
                          {inOrder && <span className="text-teal font-poppins text-[10px] mt-1">×{inOrder.quantity} added</span>}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Order Summary */}
                {orderItems.length > 0 && (
                  <div className="bg-[#0A0A0A] border border-yellow/20 rounded-lg p-6">
                    <h3 className="font-bebas text-2xl text-yellow mb-4">Order Summary</h3>
                    <div className="space-y-3">
                      {orderItems.map(item => (
                        <div key={item.id} className="flex items-center justify-between">
                          <span className="font-poppins text-sm text-white">{item.name}</span>
                          <div className="flex items-center gap-3">
                            <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 rounded bg-white/10 text-white flex items-center justify-center hover:bg-white/20">−</button>
                            <span className="font-poppins text-sm text-white w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 rounded bg-white/10 text-white flex items-center justify-center hover:bg-white/20">+</button>
                            <span className="font-poppins font-bold text-sm text-yellow w-16 text-right">₹{item.price * item.quantity}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-white/10 mt-4 pt-4 flex justify-between">
                      <span className="font-poppins font-semibold text-white">Total</span>
                      <span className="font-poppins font-bold text-xl text-yellow">₹{orderTotal}</span>
                    </div>
                  </div>
                )}

                <div>
                  <label className={labelClass}>Special Instructions</label>
                  <textarea className={inputClass} rows={3} placeholder="Any special instructions..." value={preorderInstructions} onChange={e => setPreorderInstructions(e.target.value)} />
                </div>
                <button onClick={() => handleSubmit('preorder')} disabled={submitting} className="w-full bg-yellow text-black font-poppins font-bold uppercase tracking-wider py-4 rounded hover:scale-[1.02] hover:shadow-[0_0_20px_#E8EA0060] transition-all duration-200 disabled:opacity-50">
                  {submitting ? 'Confirming...' : 'Confirm Pre-Order'}
                </button>
              </motion.div>
            )}

            {/* PARTY BOOKING */}
            {activeTab === 'party' && (
              <motion.div key="party" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input type="text" className={inputClass} placeholder="Your name" value={partyName} onChange={e => setPartyName(e.target.value)} />
                    {errors.partyName && <p className={errorClass}>{errors.partyName}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Phone Number *</label>
                    <input type="tel" className={inputClass} placeholder="10-digit number" value={partyPhone} onChange={e => setPartyPhone(e.target.value)} maxLength={10} />
                    {errors.partyPhone && <p className={errorClass}>{errors.partyPhone}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Party Type *</label>
                    <select className={inputClass} value={partyType} onChange={e => setPartyType(e.target.value)}>
                      <option value="">Select type</option>
                      {partyTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.partyType && <p className={errorClass}>{errors.partyType}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Date of Party *</label>
                    <input type="date" className={inputClass} min={today} value={partyDate} onChange={e => setPartyDate(e.target.value)} />
                    {errors.partyDate && <p className={errorClass}>{errors.partyDate}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Preferred Time *</label>
                    <select className={inputClass} value={partyTime} onChange={e => setPartyTime(e.target.value)}>
                      <option value="">Select time</option>
                      {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.partyTime && <p className={errorClass}>{errors.partyTime}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Number of Guests</label>
                    <input type="number" className={inputClass} min={1} max={50} value={partyGuests} onChange={e => setPartyGuests(Number(e.target.value))} />
                  </div>
                </div>

                {/* Decorations */}
                <div>
                  <label className={labelClass}>Decoration Preferences</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {decorations.map(dec => (
                      <label key={dec} className={`flex items-center gap-2 bg-[#0A0A0A] border rounded-lg p-3 cursor-pointer transition-all ${partyDecorations.includes(dec) ? 'border-yellow/60' : 'border-white/[0.06] hover:border-yellow/30'}`}>
                        <input type="checkbox" checked={partyDecorations.includes(dec)} onChange={() => setPartyDecorations(prev => prev.includes(dec) ? prev.filter(d => d !== dec) : [...prev, dec])} className="accent-yellow" />
                        <span className="font-poppins text-sm text-white/80">{dec}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Budget Range</label>
                  <select className={inputClass} value={partyBudget} onChange={e => setPartyBudget(e.target.value)}>
                    <option value="">Select budget</option>
                    {budgetRanges.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Message / Special Request</label>
                  <textarea className={inputClass} rows={3} placeholder="Tell us about your plans..." value={partyMessage} onChange={e => setPartyMessage(e.target.value)} />
                </div>

                <button onClick={() => handleSubmit('party')} disabled={submitting} className="w-full bg-yellow text-black font-poppins font-bold uppercase tracking-wider py-4 rounded hover:scale-[1.02] hover:shadow-[0_0_20px_#E8EA0060] transition-all duration-200 disabled:opacity-50">
                  {submitting ? 'Confirming...' : 'Confirm Party Booking'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <h1 className="font-bebas text-3xl text-yellow animate-pulse">LOADING BOOKING PORTAL...</h1>
      </div>
    }>
      <BookingContent />
    </Suspense>
  )
}

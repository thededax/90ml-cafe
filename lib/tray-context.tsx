'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface TrayItem {
  id: string
  name: string
  price: number
  quantity: number
  option?: string
  temperature?: 'hot' | 'iced' | 'all'
  category?: string
  image?: string
}

interface TrayContextType {
  items: TrayItem[]
  addItem: (
    item: { id: string; name: string; price: number; category?: string; image?: string },
    option?: string,
    temperature?: 'hot' | 'iced' | 'all'
  ) => void
  removeItem: (id: string, option?: string) => void
  updateQuantity: (id: string, delta: number, option?: string) => void
  clearTray: () => void
  totalItems: number
  totalAmount: number
  isTrayOpen: boolean
  setIsTrayOpen: (open: boolean) => void
  generateWhatsAppLink: (details?: {
    name?: string
    phone?: string
    orderType?: string
    instructions?: string
  }) => string
}

const TrayContext = createContext<TrayContextType | undefined>(undefined)

const STORAGE_KEY = '90ml_cafe_order_tray'

export function TrayProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<TrayItem[]>([])
  const [isTrayOpen, setIsTrayOpen] = useState(false)

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setItems(JSON.parse(saved))
      }
    } catch {
      // Ignore storage errors
    }
  }, [])

  // Persist to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Ignore storage errors
    }
  }, [items])

  const addItem = (
    item: { id: string; name: string; price: number; category?: string; image?: string },
    option?: string,
    temperature?: 'hot' | 'iced' | 'all'
  ) => {
    setItems((prev) => {
      const matchIndex = prev.findIndex(
        (i) => i.id === item.id && (i.option || '') === (option || '')
      )
      if (matchIndex > -1) {
        const copy = [...prev]
        copy[matchIndex].quantity += 1
        return copy
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          option: option || undefined,
          temperature: temperature || undefined,
          category: item.category,
          image: item.image,
        },
      ]
    })
  }

  const removeItem = (id: string, option?: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.id === id && (i.option || '') === (option || '')))
    )
  }

  const updateQuantity = (id: string, delta: number, option?: string) => {
    setItems((prev) => {
      return prev
        .map((i) => {
          if (i.id === id && (i.option || '') === (option || '')) {
            const newQty = i.quantity + delta
            return newQty > 0 ? { ...i, quantity: newQty } : null
          }
          return i
        })
        .filter(Boolean) as TrayItem[]
    })
  }

  const clearTray = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const generateWhatsAppLink = (details?: {
    name?: string
    phone?: string
    orderType?: string
    instructions?: string
  }) => {
    const lines = [
      '⚡ *NEW ORDER FROM 90ML CAFE*',
      '━━━━━━━━━━━━━━━━━━━━',
    ]

    if (details?.name) lines.push(`👤 *Customer:* ${details.name}`)
    if (details?.phone) lines.push(`📞 *Phone:* ${details.phone}`)
    if (details?.orderType) lines.push(`📍 *Order / Seating:* ${details.orderType}`)
    lines.push('')
    lines.push('☕ *ITEMIZED ORDER TRAY:*')

    items.forEach((item) => {
      const optStr = item.option ? ` (${item.option})` : ''
      const tempStr = item.temperature && item.temperature !== 'all' ? ` [${item.temperature.toUpperCase()}]` : ''
      lines.push(
        `• ${item.name}${optStr}${tempStr} × ${item.quantity} = ₹${item.price * item.quantity}`
      )
    })

    lines.push('━━━━━━━━━━━━━━━━━━━━')
    lines.push(`💰 *TOTAL BILL: ₹${totalAmount}*`)

    if (details?.instructions) {
      lines.push(`📝 *Barista Notes:* ${details.instructions}`)
    }

    lines.push('')
    lines.push('Please confirm our order preparation time. Thank you!')

    const message = encodeURIComponent(lines.join('\n'))
    return `https://wa.me/917277143557?text=${message}`
  }

  return (
    <TrayContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearTray,
        totalItems,
        totalAmount,
        isTrayOpen,
        setIsTrayOpen,
        generateWhatsAppLink,
      }}
    >
      {children}
    </TrayContext.Provider>
  )
}

export function useTray() {
  const context = useContext(TrayContext)
  if (!context) {
    throw new Error('useTray must be used within a TrayProvider')
  }
  return context
}

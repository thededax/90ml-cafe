'use client'

import { useState, useEffect, useCallback } from 'react'

interface Booking {
  bookingId: string
  timestamp: string
  name: string
  phone: string
  date: string
  time: string
  guests: string
  status: string
  type: string
  [key: string]: string
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)

  const fetchBookings = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/bookings')
      if (res.ok) {
        const data = await res.json()
        setBookings(data.all || [])
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  useEffect(() => {
    if (!autoRefresh) return
    const interval = setInterval(fetchBookings, 30000)
    return () => clearInterval(interval)
  }, [autoRefresh, fetchBookings])

  const todayStr = new Date().toISOString().split('T')[0]
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

  const todayBookings = bookings.filter(b => b.timestamp >= todayStr)
  const weekBookings = bookings.filter(b => b.timestamp >= weekAgo)
  const pendingBookings = bookings.filter(b => b.status === 'New')
  const confirmedBookings = bookings.filter(b => b.status === 'Confirmed')

  const stats = [
    { label: 'Today', value: todayBookings.length, icon: '📊' },
    { label: 'This Week', value: weekBookings.length, icon: '📅' },
    { label: 'Pending', value: pendingBookings.length, icon: '⏳' },
    { label: 'Confirmed', value: confirmedBookings.length, icon: '✅' },
  ]

  const updateStatus = async (bookingId: string, status: string) => {
    // Optimistic update
    setBookings(prev => prev.map(b => b.bookingId === bookingId ? { ...b, status } : b))

    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) {
        fetchBookings() // Revert on failure
      }
    } catch {
      fetchBookings()
    }
  }

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      New: 'bg-yellow/20 text-yellow',
      Confirmed: 'bg-teal/20 text-teal',
      Cancelled: 'bg-red-500/20 text-red-400',
      Completed: 'bg-white/10 text-white/60',
    }
    return (
      <span className={`font-poppins text-[11px] font-bold px-3 py-1 rounded-full ${styles[status] || styles.New}`}>
        {status}
      </span>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-bebas text-4xl text-yellow">Dashboard</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`font-poppins text-xs uppercase tracking-wider px-3 py-1.5 rounded border transition-all ${
              autoRefresh ? 'border-teal text-teal' : 'border-white/20 text-white/40'
            }`}
          >
            {autoRefresh ? '🟢 Live' : '⚪ Paused'}
          </button>
          <button
            onClick={fetchBookings}
            className="font-poppins text-xs uppercase tracking-wider px-3 py-1.5 rounded border border-white/20 text-white/60 hover:text-white transition-colors"
          >
            ↻ Refresh
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#0A0A0A] border border-white/5 rounded-xl p-6"
          >
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="font-bebas text-5xl text-yellow">{stat.value}</div>
            <div className="font-poppins text-xs text-white/50 uppercase tracking-[2px] mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-[#0A0A0A] border border-white/5 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h2 className="font-bebas text-2xl text-white">Recent Bookings</h2>
        </div>

        {loading ? (
          <div className="p-12 text-center text-white/40 font-poppins text-sm">Loading...</div>
        ) : bookings.length === 0 ? (
          <div className="p-12 text-center text-white/40 font-poppins text-sm">
            No bookings yet. They&apos;ll appear here once customers start booking.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#0D0D0D]">
                  {['Booking ID', 'Type', 'Name', 'Phone', 'Date', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="font-poppins text-xs text-white/40 uppercase tracking-[2px] text-left px-4 py-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 10).map((booking, i) => (
                  <tr key={booking.bookingId} className={i % 2 === 0 ? 'bg-black' : 'bg-[#080808]'}>
                    <td className="px-4 py-3 font-mono text-teal text-sm">{booking.bookingId}</td>
                    <td className="px-4 py-3 font-poppins text-sm text-white/70">{booking.type}</td>
                    <td className="px-4 py-3 font-poppins text-sm text-white">{booking.name}</td>
                    <td className="px-4 py-3">
                      <a href={`tel:${booking.phone}`} className="font-poppins text-sm text-white/70 hover:text-yellow transition-colors">
                        {booking.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3 font-poppins text-sm text-white/70">{booking.date}</td>
                    <td className="px-4 py-3">{statusBadge(booking.status)}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {booking.status === 'New' && (
                          <>
                            <button onClick={() => updateStatus(booking.bookingId, 'Confirmed')} className="font-poppins text-[10px] font-bold uppercase px-2 py-1 rounded bg-teal/20 text-teal hover:bg-teal/40 transition-colors">
                              Confirm
                            </button>
                            <button onClick={() => updateStatus(booking.bookingId, 'Cancelled')} className="font-poppins text-[10px] font-bold uppercase px-2 py-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-colors">
                              Cancel
                            </button>
                          </>
                        )}
                        {booking.status === 'Confirmed' && (
                          <button onClick={() => updateStatus(booking.bookingId, 'Completed')} className="font-poppins text-[10px] font-bold uppercase px-2 py-1 rounded bg-white/10 text-white/60 hover:bg-white/20 transition-colors">
                            Complete
                          </button>
                        )}
                        <a
                          href={`https://wa.me/91${booking.phone}?text=${encodeURIComponent(`Hi ${booking.name}, your booking at 90ML Drunkyard Cafe on ${booking.date} at ${booking.time} is CONFIRMED! We look forward to seeing you. 🍹`)}`}
                          target="_blank"
                          className="font-poppins text-[10px] font-bold uppercase px-2 py-1 rounded bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/40 transition-colors"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

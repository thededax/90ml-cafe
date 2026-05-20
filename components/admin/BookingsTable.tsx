'use client'

import { useState, useEffect, useCallback } from 'react'

interface Booking {
  bookingId: string; timestamp: string; name: string; phone: string
  date: string; time: string; guests: string; status: string; type: string
  specialRequest?: string; items?: string; total?: string; instructions?: string
  partyType?: string; decorations?: string; budget?: string; message?: string
}

interface BookingsTableProps {
  bookingType: 'Table' | 'Pre-Order' | 'Party'
  dataKey: 'tableBookings' | 'preorders' | 'partyBookings'
}

export default function BookingsTablePage({ bookingType, dataKey }: BookingsTableProps) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 20

  const fetchBookings = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/bookings')
      if (res.ok) {
        const data = await res.json()
        setBookings(data[dataKey] || [])
      }
    } catch (error) {
      console.error('Failed to fetch:', error)
    } finally {
      setLoading(false)
    }
  }, [dataKey])

  useEffect(() => { fetchBookings() }, [fetchBookings])

  useEffect(() => {
    if (!autoRefresh) return
    const interval = setInterval(fetchBookings, 30000)
    return () => clearInterval(interval)
  }, [autoRefresh, fetchBookings])

  const updateStatus = async (bookingId: string, status: string) => {
    setBookings(prev => prev.map(b => b.bookingId === bookingId ? { ...b, status } : b))
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) fetchBookings()
    } catch { fetchBookings() }
  }

  const filtered = bookings
    .filter(b => {
      if (statusFilter !== 'All' && b.status !== statusFilter) return false
      if (search) {
        const s = search.toLowerCase()
        return b.name?.toLowerCase().includes(s) || b.phone?.includes(s) || b.bookingId?.toLowerCase().includes(s)
      }
      return true
    })

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage)

  const exportCSV = () => {
    const headers = ['Booking ID', 'Timestamp', 'Name', 'Phone', 'Date', 'Time', 'Guests', 'Status']
    const rows = filtered.map(b => [b.bookingId, b.timestamp, b.name, b.phone, b.date, b.time, b.guests, b.status])
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `${bookingType}-bookings.csv`; a.click()
  }

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      New: 'bg-yellow/20 text-yellow', Confirmed: 'bg-teal/20 text-teal',
      Cancelled: 'bg-red-500/20 text-red-400', Completed: 'bg-white/10 text-white/60',
    }
    return <span className={`font-poppins text-[11px] font-bold px-3 py-1 rounded-full ${styles[status] || styles.New}`}>{status}</span>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 className="font-bebas text-4xl text-yellow">{bookingType} Bookings</h1>
        <div className="flex items-center gap-3">
          <button onClick={() => setAutoRefresh(!autoRefresh)} className={`font-poppins text-xs uppercase tracking-wider px-3 py-1.5 rounded border transition-all ${autoRefresh ? 'border-teal text-teal' : 'border-white/20 text-white/40'}`}>
            {autoRefresh ? '🟢 Live' : '⚪ Paused'}
          </button>
          <button onClick={exportCSV} className="font-poppins text-xs uppercase tracking-wider px-3 py-1.5 rounded border border-white/20 text-white/60 hover:text-white transition-colors">
            📥 Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <input type="text" placeholder="Search by name, phone, or ID..." value={search} onChange={e => setSearch(e.target.value)}
          className="bg-[#0A0A0A] border border-white/10 rounded px-4 py-2 font-poppins text-sm text-white placeholder:text-white/30 focus:border-yellow/60 focus:outline-none flex-1 min-w-[200px]" />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="bg-[#0A0A0A] border border-white/10 rounded px-4 py-2 font-poppins text-sm text-white focus:border-yellow/60 focus:outline-none">
          <option value="All">All Status</option>
          <option value="New">New</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#0A0A0A] border border-white/5 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-white/40 font-poppins text-sm">Loading...</div>
        ) : paginated.length === 0 ? (
          <div className="p-12 text-center text-white/40 font-poppins text-sm">No bookings found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#0D0D0D]">
                  {['Booking ID', 'Name', 'Phone', 'Date', 'Time', 'Guests', 'Status', 'Actions'].map(h => (
                    <th key={h} className="font-poppins text-xs text-white/40 uppercase tracking-[2px] text-left px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((b, i) => (
                  <tr key={b.bookingId} className={i % 2 === 0 ? 'bg-black' : 'bg-[#080808]'}>
                    <td className="px-4 py-3 font-mono text-teal text-sm">{b.bookingId}</td>
                    <td className="px-4 py-3 font-poppins text-sm text-white">{b.name}</td>
                    <td className="px-4 py-3"><a href={`tel:${b.phone}`} className="font-poppins text-sm text-white/70 hover:text-yellow">{b.phone}</a></td>
                    <td className="px-4 py-3 font-poppins text-sm text-white/70">{b.date}</td>
                    <td className="px-4 py-3 font-poppins text-sm text-white/70">{b.time}</td>
                    <td className="px-4 py-3 font-poppins text-sm text-white/70">{b.guests}</td>
                    <td className="px-4 py-3">{statusBadge(b.status)}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {b.status === 'New' && (
                          <>
                            <button onClick={() => updateStatus(b.bookingId, 'Confirmed')} className="font-poppins text-[10px] font-bold uppercase px-2 py-1 rounded bg-teal/20 text-teal hover:bg-teal/40">Confirm</button>
                            <button onClick={() => updateStatus(b.bookingId, 'Cancelled')} className="font-poppins text-[10px] font-bold uppercase px-2 py-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500/40">Cancel</button>
                          </>
                        )}
                        {b.status === 'Confirmed' && (
                          <button onClick={() => updateStatus(b.bookingId, 'Completed')} className="font-poppins text-[10px] font-bold uppercase px-2 py-1 rounded bg-white/10 text-white/60 hover:bg-white/20">Complete</button>
                        )}
                        <a href={`https://wa.me/91${b.phone}?text=${encodeURIComponent(`Hi ${b.name}, your booking at 90ML Drunkyard Cafe on ${b.date} is CONFIRMED! 🍹`)}`} target="_blank"
                          className="font-poppins text-[10px] font-bold uppercase px-2 py-1 rounded bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/40">WhatsApp</a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-white/5">
            <span className="font-poppins text-xs text-white/40">
              Page {currentPage} of {totalPages} ({filtered.length} bookings)
            </span>
            <div className="flex gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                className="font-poppins text-xs px-3 py-1 rounded border border-white/10 text-white/60 hover:text-white disabled:opacity-30">← Prev</button>
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                className="font-poppins text-xs px-3 py-1 rounded border border-white/10 text-white/60 hover:text-white disabled:opacity-30">Next →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

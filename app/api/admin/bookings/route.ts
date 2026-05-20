import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = getSupabase()

    const [tableRes, preorderRes, partyRes] = await Promise.all([
      supabase.from('table_bookings').select('*'),
      supabase.from('preorders').select('*'),
      supabase.from('party_bookings').select('*'),
    ])

    if (tableRes.error) throw tableRes.error
    if (preorderRes.error) throw preorderRes.error
    if (partyRes.error) throw partyRes.error

    const tableBookings = (tableRes.data || []).map((row: any) => ({
      bookingId: row.booking_id, timestamp: row.timestamp, name: row.name, phone: row.phone,
      date: row.date, time: row.time, guests: row.guests, specialRequest: row.special_request,
      status: row.status || 'New', type: 'Table', id: row.id,
    }))

    const preorders = (preorderRes.data || []).map((row: any) => ({
      bookingId: row.booking_id, timestamp: row.timestamp, name: row.name, phone: row.phone,
      date: row.date, time: row.time, items: row.items, total: row.total,
      guests: row.guests, instructions: row.instructions, status: row.status || 'New', type: 'Pre-Order', id: row.id,
    }))

    const partyBookings = (partyRes.data || []).map((row: any) => ({
      bookingId: row.booking_id, timestamp: row.timestamp, name: row.name, phone: row.phone,
      partyType: row.party_type, date: row.date, time: row.time, guests: row.guests,
      decorations: row.decorations, budget: row.budget,
      message: row.message, status: row.status || 'New', type: 'Party', id: row.id,
    }))

    return NextResponse.json({
      tableBookings,
      preorders,
      partyBookings,
      all: [...tableBookings, ...preorders, ...partyBookings].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ),
    })
  } catch (error) {
    console.error('Admin bookings fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}

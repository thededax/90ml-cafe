import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

function generateBookingId(prefix: string) {
  return `${prefix}-${Math.floor(10000 + Math.random() * 90000)}`
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, partyType, date, time, guests, decorations, budget, message } = body

    const bookingId = generateBookingId('PB')
    const timestamp = new Date().toISOString()
    const decorationsList = (decorations || []).join(', ')

    const supabase = getSupabase()

    const { error } = await supabase
      .from('party_bookings')
      .insert([
        {
          booking_id: bookingId,
          timestamp,
          name,
          phone,
          party_type: partyType,
          date,
          time,
          guests: String(guests),
          decorations: decorationsList,
          budget: budget || '',
          message: message || '',
          status: 'New'
        }
      ])

    if (error) throw error

    return NextResponse.json({ success: true, bookingId })
  } catch (error) {
    console.error('Party booking error:', error)
    return NextResponse.json({ error: 'Party booking failed' }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

function generateBookingId(prefix: string) {
  return `${prefix}-${Math.floor(10000 + Math.random() * 90000)}`
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, date, time, guests, specialRequest } = body

    const bookingId = generateBookingId('TB')
    const timestamp = new Date().toISOString()

    const { error } = await supabase
      .from('table_bookings')
      .insert([
        {
          booking_id: bookingId,
          timestamp,
          name,
          phone,
          date,
          time,
          guests: String(guests),
          special_request: specialRequest || '',
          status: 'New'
        }
      ])

    if (error) throw error

    return NextResponse.json({ success: true, bookingId })
  } catch (error) {
    console.error('Table booking error:', error)
    return NextResponse.json({ error: 'Booking failed' }, { status: 500 })
  }
}

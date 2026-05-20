import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

function generateBookingId(prefix: string) {
  return `${prefix}-${Math.floor(10000 + Math.random() * 90000)}`
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, date, time, items, total, guests, instructions } = body

    const bookingId = generateBookingId('PO')
    const timestamp = new Date().toISOString()
    const itemsSummary = items
      .map((item: { name: string; quantity: number; price: number }) => `${item.name} x${item.quantity}`)
      .join(', ')

    const supabase = getSupabase()

    const { error } = await supabase
      .from('preorders')
      .insert([
        {
          booking_id: bookingId,
          timestamp,
          name,
          phone,
          date,
          time,
          items: itemsSummary,
          total: String(total),
          guests: String(guests),
          instructions: instructions || '',
          status: 'New'
        }
      ])

    if (error) throw error

    return NextResponse.json({ success: true, bookingId })
  } catch (error) {
    console.error('Pre-order error:', error)
    return NextResponse.json({ error: 'Pre-order failed' }, { status: 500 })
  }
}

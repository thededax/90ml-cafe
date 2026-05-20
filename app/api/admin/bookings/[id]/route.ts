import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { status } = await request.json()
    const bookingId = params.id

    // Determine which table to update based on booking ID prefix
    let tableName = ''

    if (bookingId.startsWith('TB-')) {
      tableName = 'table_bookings'
    } else if (bookingId.startsWith('PO-')) {
      tableName = 'preorders'
    } else if (bookingId.startsWith('PB-')) {
      tableName = 'party_bookings'
    } else {
      return NextResponse.json({ error: 'Invalid booking ID format' }, { status: 400 })
    }

    const supabase = getSupabase()

    const { error } = await supabase
      .from(tableName)
      .update({ status })
      .eq('booking_id', bookingId)

    if (error) throw error

    return NextResponse.json({ success: true, bookingId, status })
  } catch (error) {
    console.error('Status update error:', error)
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}

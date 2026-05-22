const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://mdbsxkdvxsfletimwgrq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kYnN4a2R2eHNmbGV0aW13Z3JxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODk1NjE3OCwiZXhwIjoyMDk0NTMyMTc4fQ.r-rJoJ71Qk1LXAoq5UZry30VR5-Oj9dlkZ8eb-5ujnY';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  const { data: preorders, error: error1 } = await supabase.from('preorders').select('*').limit(1);
  if (error1) {
    console.error('Error connecting to preorders:', error1);
  } else {
    console.log('Successfully connected to preorders!', preorders);
  }

  const { data: party, error: error2 } = await supabase.from('party_bookings').select('*').limit(1);
  if (error2) {
    console.error('Error connecting to party_bookings:', error2);
  } else {
    console.log('Successfully connected to party_bookings!', party);
  }
}

testConnection();

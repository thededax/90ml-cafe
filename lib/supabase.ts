import { createClient } from '@supabase/supabase-js';

export const getSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // We use the service_role key to bypass Row Level Security since this client
  // is ONLY used in backend API routes.
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn("Supabase credentials missing! Check your .env.local file.");
    // Return a dummy client so the application doesn't crash at build-time if invoked
    return createClient('https://placeholder.supabase.co', 'placeholder');
  }

  return createClient(supabaseUrl, supabaseServiceKey);
};

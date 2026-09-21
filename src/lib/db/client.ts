import { createBrowserClient } from '@supabase/ssr'

// Browser client - safe for static export
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'http://localhost:54321',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'demo-anon-key'
  )
}

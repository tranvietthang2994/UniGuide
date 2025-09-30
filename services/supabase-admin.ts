import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client using the Service Role key.
 * Required for performing privileged operations (e.g., inserting into RLS-protected tables).
 */
export function getSupabaseAdmin(): SupabaseClient {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://vtesitzsuisfgpchlsuz.supabase.co";
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0ZXNpdHpzdWlzZmdwY2hsc3V6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE3MTA3OSwiZXhwIjoyMDczNzQ3MDc5fQ.Vp95sXMEaGv_a-9olaFylM2bzbwEJ_v9wccXVEvlST0";

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
}

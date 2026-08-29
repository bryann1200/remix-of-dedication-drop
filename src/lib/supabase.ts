import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Read-only connection to an EXISTING Supabase project.
 * Fill these in (or set the VITE_ env vars) with your project URL + anon key.
 */
const SUPABASE_URL =
  import.meta.env['VITE_SUPABASE_URL'] ?? "https://ucysyhuwaugekqkrrztv.supabase.co";
const SUPABASE_ANON_KEY =
  import.meta.env['VITE_SUPABASE_PUBLISHABLE_KEY'] ??
  import.meta.env['VITE_SUPABASE_ANON_KEY'] ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjeXN5aHV3YXVnZWtxa3JyenR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5NzgzNDYsImV4cCI6MjEwMzU1NDM0Nn0.3IGVbM-q8M7oeMNoDIcgNvrRUv3Xku875a_1gMUebwE";


export const AUDIO_BUCKET = "dedication-audio";

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null;

export function audioUrl(path: string | null): string | null {
  if (!path || !supabase) return null;
  if (/^https?:\/\//.test(path)) return path;
  return supabase.storage.from(AUDIO_BUCKET).getPublicUrl(path).data.publicUrl;
}

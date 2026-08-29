import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Read-only connection to an EXISTING Supabase project.
 * Fill these in (or set the VITE_ env vars) with your project URL + anon key.
 */
const SUPABASE_URL = import.meta.env['VITE_SUPABASE_URL'] ?? "";
const SUPABASE_ANON_KEY =
  import.meta.env['VITE_SUPABASE_PUBLISHABLE_KEY'] ??
  import.meta.env['VITE_SUPABASE_ANON_KEY'] ??
  "";

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

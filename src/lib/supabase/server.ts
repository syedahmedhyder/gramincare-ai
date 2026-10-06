import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { isSupabaseConfigured, getSupabaseUrl, getSupabasePublishableKey } from "./client";
export { createClient as createServerSupabaseClient } from "@/utils/supabase/server";

export const getSupabaseServerClient = (): SupabaseClient | null => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  const supabaseUrl = getSupabaseUrl();
  // Privileged server-side key (NEVER exposed to frontend, never prefixed with NEXT_PUBLIC_)
  const supabaseServiceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    getSupabasePublishableKey();

  if (!supabaseUrl || !supabaseServiceKey) {
    return null;
  }

  try {
    return createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  } catch (err) {
    console.warn("Failed to create Supabase server client:", err);
    return null;
  }
};

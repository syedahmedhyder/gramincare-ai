import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";

export const getSupabaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || "";
};

export const getSupabasePublishableKey = (): string => {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    ""
  );
};

export const isSupabaseConfigured = (): boolean => {
  const url = getSupabaseUrl();
  const key = getSupabasePublishableKey();
  return Boolean(
    url &&
    key &&
    url.startsWith("http") &&
    !url.includes("your-project-id") &&
    !url.includes("your-supabase-url") &&
    !key.includes("your-supabase-anon-public-key") &&
    !key.includes("your-supabase-publishable-key")
  );
};

let clientInstance: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient | null => {
  if (!isSupabaseConfigured()) return null;
  if (!clientInstance) {
    try {
      clientInstance = createBrowserClient(
        getSupabaseUrl(),
        getSupabasePublishableKey()
      );
    } catch (e) {
      console.warn("Failed to initialize Supabase client instance:", e);
      return null;
    }
  }
  return clientInstance;
};

export const supabase = isSupabaseConfigured() ? getSupabaseClient() : null;

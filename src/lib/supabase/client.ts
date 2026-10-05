import { createClient, SupabaseClient } from "@supabase/supabase-js";

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
    const url = getSupabaseUrl();
    const key = getSupabasePublishableKey();
    clientInstance = createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return clientInstance;
};

export const supabase = isSupabaseConfigured()
  ? createClient(getSupabaseUrl(), getSupabasePublishableKey(), {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

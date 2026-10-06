import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  // Always prepare a default fallback response
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Defensive Check: If Supabase credentials are not configured or invalid,
  // gracefully pass the request through. This strictly prevents 500 MIDDLEWARE_INVOCATION_FAILED
  // on Vercel or any environment where credentials might be pending or unconfigured.
  if (
    !supabaseUrl ||
    !supabaseKey ||
    !supabaseUrl.startsWith("http") ||
    supabaseUrl.includes("your-project-id")
  ) {
    return supabaseResponse;
  }

  try {
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    // Refresh auth session token safely without throwing or breaking public routes
    await supabase.auth.getUser();

    return supabaseResponse;
  } catch (error) {
    // If Supabase client initialization or token refresh fails for any reason,
    // NEVER fail the request with 500. Log warning and continue to requested page.
    console.warn("Middleware Supabase session update bypassed:", error);
    return supabaseResponse;
  }
}

// Export createClient alias for backwards-compatibility
export const createClient = updateSession;

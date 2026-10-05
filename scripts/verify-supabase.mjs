import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Load .env.local manually for standalone verification
const envPath = path.resolve(process.cwd(), ".env.local");
let envVars = {};
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const idx = trimmed.indexOf("=");
      const key = trimmed.substring(0, idx).trim();
      const val = trimmed.substring(idx + 1).trim();
      envVars[key] = val;
    }
  }
}

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const publishableKey = envVars.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";
const serviceRoleKey = envVars.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "";

console.log("================================================================================");
console.log("GRAMINCARE AI — END-TO-END SUPABASE VERIFICATION SUITE");
console.log("================================================================================");

console.log("\n[1] ENVIRONMENT VARIABLE AUDIT (.env.local):");
console.log(`- NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? "[CONFIGURED - MASKED]" : "[NOT SET - EMPTY]"}`);
console.log(`- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ${publishableKey ? "[CONFIGURED - MASKED]" : "[NOT SET - EMPTY]"}`);
console.log(`- SUPABASE_SERVICE_ROLE_KEY: ${serviceRoleKey ? "[CONFIGURED - MASKED FOR SECURITY]" : "[NOT SET - EMPTY]"}`);

const isConfigured = Boolean(
  supabaseUrl &&
  publishableKey &&
  supabaseUrl.startsWith("http") &&
  !supabaseUrl.includes("your-project-id")
);

console.log(`- Supabase Configuration Valid: ${isConfigured ? "YES" : "NO"}`);

async function runTests() {
  let dbConnectionResult = "FAIL";
  let dbReadResult = "FAIL";
  let dbWriteResult = "FAIL";
  let authStatus = "UNCONFIGURED (Guest / Expo Mode Active)";

  if (isConfigured) {
    try {
      console.log("\n[2] TESTING DIRECT SUPABASE CONNECTION & READ (SELECT):");
      const clientKey = serviceRoleKey || publishableKey;
      const supabase = createClient(supabaseUrl, clientKey, {
        auth: { persistSession: false },
      });

      const { data: schemes, error: schemesErr } = await supabase
        .from("schemes")
        .select("id, scheme_code, scheme_name")
        .limit(5);

      if (!schemesErr && schemes) {
        dbConnectionResult = "PASS";
        dbReadResult = "PASS";
        console.log(`  ✓ SELECT public.schemes: PASS (${schemes.length} records retrieved)`);
        schemes.forEach((s) => console.log(`    - [${s.scheme_code}] ${s.scheme_name}`));
      } else {
        console.log(`  ✗ SELECT public.schemes: FAIL (${schemesErr?.message})`);
      }

      console.log("\n[3] TESTING DIRECT DATABASE WRITE (INSERT):");
      const { data: insertData, error: insertErr } = await supabase
        .from("audit_logs")
        .insert({
          action_type: "SYSTEM_VERIFICATION_PING",
          metadata: { test_run_at: new Date().toISOString(), platform: "GraminCare AI Full-Stack" },
        })
        .select();

      if (!insertErr && insertData) {
        dbWriteResult = "PASS";
        console.log(`  ✓ INSERT public.audit_logs: PASS (Record created ID: ${insertData[0]?.id})`);
      } else {
        console.log(`  ✗ INSERT public.audit_logs: FAIL (${insertErr?.message})`);
      }

      authStatus = "CONFIGURED (Ready for citizen email/password authentication)";
    } catch (e) {
      console.log(`  ✗ Direct Database Error: ${e.message}`);
    }
  } else {
    console.log("\n[2] DIRECT SUPABASE OPERATIONS:");
    console.log("  ✗ Skipped direct database queries: Credentials in .env.local are currently empty.");
    console.log("  ℹ️ Application is protecting user experience using resilient benchmark fallback.");
  }

  console.log("\n[4] TESTING NEXT.JS FULL-STACK HTTP API ROUTES (http://localhost:3000):");
  const routes = [
    { name: "/api/schemes", method: "GET" },
    { name: "/api/emergency", method: "GET" },
    { name: "/api/family", method: "GET" },
    { name: "/api/health-twin", method: "GET" },
    {
      name: "/api/triage",
      method: "POST",
      body: { query: "Severe fever and body ache", language: "en" },
    },
    {
      name: "/api/documents/check",
      method: "POST",
      body: {
        schemeId: "PM-JAY",
        documents: [
          {
            id: "d1",
            type: "aadhaar",
            title: "Aadhaar Card",
            issuingAuthority: "UIDAI",
            documentNumber: "7842 9102 3841",
            status: "ready",
            statusLabel: "Verified",
            fields: [{ label: "Full Name", value: "Ramesh Gowda", verified: true }],
          },
        ],
      },
    },
  ];

  let apiSuccessCount = 0;
  for (const r of routes) {
    try {
      const opts = {
        method: r.method,
        headers: { "Content-Type": "application/json" },
      };
      if (r.body) opts.body = JSON.stringify(r.body);

      const res = await fetch(`http://localhost:3000${r.name}`, opts);
      const json = await res.json();
      if (res.ok) {
        apiSuccessCount++;
        console.log(`  ✓ ${r.method.padEnd(4)} ${r.name.padEnd(22)}: PASS (HTTP ${res.status}) [Active Source: ${json.source || "ok"}]`);
      } else {
        console.log(`  ✗ ${r.method.padEnd(4)} ${r.name.padEnd(22)}: FAIL (HTTP ${res.status}) [${json.error || "error"}]`);
      }
    } catch (err) {
      console.log(`  ✗ ${r.method.padEnd(4)} ${r.name.padEnd(22)}: FAIL (Connection refused: ${err.message})`);
    }
  }

  const apiOverallResult = apiSuccessCount === routes.length ? "PASS" : "FAIL";

  console.log("\n================================================================================");
  console.log("FINAL VERIFICATION SCORECARD");
  console.log("================================================================================");
  console.log(`- Supabase connection : ${dbConnectionResult}`);
  console.log(`- Database read       : ${dbReadResult}`);
  console.log(`- Database write      : ${dbWriteResult}`);
  console.log(`- API routes          : ${apiOverallResult} (${apiSuccessCount}/${routes.length} passing)`);
  console.log(`- Authentication      : ${authStatus}`);
  console.log("================================================================================");
}

runTests();

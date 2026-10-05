import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { evaluateDocumentReadiness } from "@/lib/document-engine";
import { DEMO_SCHEMES } from "@/lib/demo-data";
import { DocumentItem } from "@/lib/types";

function isValidUUID(id?: string | null): boolean {
  if (!id) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
}

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("document_checks")
        .select(`
          *,
          schemes(scheme_name, scheme_code),
          family_members(full_name)
        `)
        .order("checked_at", { ascending: false })
        .limit(10);

      if (!error && data && data.length > 0) {
        return NextResponse.json({
          source: "database",
          checks: data,
        });
      }
    }

    return NextResponse.json({
      source: "demo",
      checks: [],
      notice: "Document check verification engine ready. Submit verification payload to POST /api/documents/check.",
    });
  } catch (err: any) {
    return NextResponse.json({
      source: "demo",
      checks: [],
      error: err?.message,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { documents, schemeId, simulatedFixApplied, memberId } = body;

    if (!documents || !Array.isArray(documents)) {
      return NextResponse.json(
        { error: "Invalid payload: documents array is required" },
        { status: 400 }
      );
    }

    // Find target scheme (from demo catalog or default)
    const scheme = DEMO_SCHEMES.find((s) => s.id === schemeId) || DEMO_SCHEMES[0];

    // Compute readiness score & mismatch detection
    const report = evaluateDocumentReadiness(
      documents as DocumentItem[],
      scheme,
      Boolean(simulatedFixApplied)
    );

    let persistenceStatus = "demo";

    // Attempt Supabase database audit persistence if both memberId and schemeId resolve to valid UUIDs
    const supabase = getSupabaseServerClient();
    if (supabase && isValidUUID(memberId)) {
      try {
        let targetSchemeUuid = isValidUUID(schemeId) ? schemeId : null;

        // If schemeId is a code like 'PM-JAY' or 'scheme-pmjay', lookup matching DB UUID
        if (!targetSchemeUuid) {
          const { data: dbScheme } = await supabase
            .from("schemes")
            .select("id")
            .limit(1)
            .maybeSingle();
          if (dbScheme) {
            targetSchemeUuid = dbScheme.id;
          }
        }

        if (targetSchemeUuid) {
          const { error: insertErr } = await supabase.from("document_checks").insert({
            member_id: memberId,
            scheme_id: targetSchemeUuid,
            readiness_score: report.readinessScore,
            overall_status: report.overallStatus,
            can_submit: report.canSubmit,
            mismatch_summary: report.mismatchSummary,
            fix_guidance_steps: report.fixActionPlan,
            document_evaluations: report.documents,
          });

          if (!insertErr) {
            persistenceStatus = "database";
          }
        }
      } catch (dbErr) {
        console.warn("Could not persist document check to Supabase, continuing:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      source: persistenceStatus,
      report,
      disclaimer:
        "Document Readiness Score is an advisory pre-screening risk assessment and does not constitute statutory government verification.",
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Internal server error during document check evaluation",
        details: err?.message,
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { performClinicalTriage } from "@/lib/clinical-triage";

function isValidUUID(id?: string | null): boolean {
  if (!id) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
}

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("triage_sessions")
        .select(`
          *,
          triage_results(*)
        `)
        .order("initiated_at", { ascending: false })
        .limit(10);

      if (!error && data && data.length > 0) {
        return NextResponse.json({
          source: "database",
          sessions: data,
        });
      }
    }

    return NextResponse.json({
      source: "demo",
      sessions: [],
      notice: "Triage audit log ready. Perform symptom triage via POST /api/triage to persist sessions.",
    });
  } catch (err: any) {
    return NextResponse.json({
      source: "demo",
      sessions: [],
      error: err?.message,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, language = "en", memberId, userId } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Symptom description query is required" },
        { status: 400 }
      );
    }

    // Evaluate symptoms using WHO/ICMR clinical decision support rules
    const result = performClinicalTriage(query);

    let persistence = "demo";
    const supabase = getSupabaseServerClient();

    if (supabase) {
      try {
        const { data: sessionData, error: sessionErr } = await supabase
          .from("triage_sessions")
          .insert({
            user_id: isValidUUID(userId) ? userId : null,
            member_id: isValidUUID(memberId) ? memberId : null,
            reported_symptoms: query,
            language_code: language,
          })
          .select("id")
          .single();

        if (!sessionErr && sessionData) {
          const urgencyLevel =
            result.severity === "red"
              ? "Urgent Care"
              : result.severity === "yellow"
              ? "Consider PHC Visit"
              : "Home Care";

          await supabase.from("triage_results").insert({
            session_id: sessionData.id,
            urgency_level: urgencyLevel,
            severity_code: result.severity,
            is_red_flag: result.isRedFlag,
            clinical_summary: result.clinicalSummaryEn,
            recommended_action: result.actionPlanEn,
            generic_otc_suggestions: result.recommendedOtcs,
          });

          persistence = "database";
        }
      } catch (dbErr) {
        console.warn("Could not record triage session to database:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      source: persistence,
      result,
      disclaimer:
        "GraminCare AI Health Triage provides decision support and health literacy guidance. It is NOT a medical diagnosis or prescription. Always consult a physician in emergencies.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Triage processing error", details: err?.message },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { DEMO_SCHEMES } from "@/lib/demo-data";

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();

    if (supabase) {
      const { data, error } = await supabase
        .from("schemes")
        .select(`
          *,
          scheme_requirements(*)
        `)
        .eq("is_active", true);

      if (!error && data && data.length > 0) {
        return NextResponse.json({
          source: "database",
          schemes: data.map((s) => ({
            id: s.id,
            code: s.scheme_code,
            name: s.scheme_name,
            department: s.department,
            stateScope: s.state_scope,
            coverageAmount: s.coverage_amount,
            description: s.description,
            directBenefit: s.direct_benefit,
            eligibilityCriteria: [
              "Aadhaar biometric authentication",
              "BPL / Food security card linkage",
            ],
            requiredDocs:
              s.scheme_requirements && s.scheme_requirements.length > 0
                ? s.scheme_requirements.map((r: any) =>
                    r.document_type === "aadhaar"
                      ? "Aadhaar Card"
                      : r.document_type === "ration"
                      ? "Ration Card"
                      : r.document_type === "income"
                      ? "Income Certificate"
                      : r.document_type
                  )
                : ["Aadhaar Card", "Ration Card", "Income Certificate"],
          })),
        });
      }
    }

    // Curated Fallback
    return NextResponse.json({
      source: "demo",
      schemes: DEMO_SCHEMES,
      notice: "Showing benchmark government schemes catalog.",
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        source: "demo",
        schemes: DEMO_SCHEMES,
        warning: "Database query failed, fell back to curated benchmark data",
        error: err?.message,
      },
      { status: 200 }
    );
  }
}

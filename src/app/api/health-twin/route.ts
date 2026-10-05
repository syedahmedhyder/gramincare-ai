import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { DEMO_HEALTH_TWINS } from "@/lib/demo-data";

function isValidUUID(id?: string | null): boolean {
  if (!id) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const memberId = searchParams.get("memberId") || "mem-ramesh";

    const supabase = getSupabaseServerClient();
    if (supabase) {
      let query = supabase
        .from("health_twin_records")
        .select(`
          *,
          family_members(full_name, age, gender)
        `)
        .order("recorded_at", { ascending: false });

      if (isValidUUID(memberId)) {
        query = query.eq("member_id", memberId);
      }

      const { data, error } = await query.limit(1).maybeSingle();

      if (!error && data) {
        return NextResponse.json({
          source: "database",
          twin: {
            memberId: data.member_id,
            memberName: data.family_members?.full_name || "Patient Profile",
            age: data.family_members?.age || 45,
            gender: data.family_members?.gender || "Male",
            bloodGroup: "O+",
            vitals: {
              bpSystolic: data.bp_systolic,
              bpDiastolic: data.bp_diastolic,
              pulseRate: data.pulse_rate,
              bloodSugar: data.blood_sugar_random || 120,
              spo2: data.spo2_percentage || 98,
              temperatureF: Number(data.temperature_f) || 98.4,
              bmi: Number(data.bmi) || 24.0,
            },
            chronicRiskScores: {
              cardiovascular:
                data.bp_systolic > 140
                  ? "High"
                  : data.bp_systolic > 130
                  ? "Moderate"
                  : "Low",
              respiratory: "Low",
              diabetes: data.blood_sugar_random > 140 ? "Moderate" : "Low",
            },
            clinicalAlerts: data.clinical_alerts || [],
            immunizations: data.immunizations || [],
          },
        });
      }
    }

    // Default to curated demo health twin
    const twin = DEMO_HEALTH_TWINS[memberId] || DEMO_HEALTH_TWINS["mem-ramesh"];
    return NextResponse.json({
      source: "demo",
      twin,
    });
  } catch (err: any) {
    return NextResponse.json({
      source: "demo",
      twin: DEMO_HEALTH_TWINS["mem-ramesh"],
      error: err?.message,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      memberId,
      bpSystolic = 120,
      bpDiastolic = 80,
      pulseRate = 72,
      bloodSugar,
      spo2,
      temperatureF,
      bmi,
      clinicalAlerts = [],
      immunizations = [],
    } = body;

    const supabase = getSupabaseServerClient();
    if (supabase && isValidUUID(memberId)) {
      const { data, error } = await supabase
        .from("health_twin_records")
        .insert({
          member_id: memberId,
          bp_systolic: Number(bpSystolic),
          bp_diastolic: Number(bpDiastolic),
          pulse_rate: Number(pulseRate),
          blood_sugar_random: bloodSugar ? Number(bloodSugar) : null,
          spo2_percentage: spo2 ? Number(spo2) : null,
          temperature_f: temperatureF ? Number(temperatureF) : null,
          bmi: bmi ? Number(bmi) : null,
          clinical_alerts: clinicalAlerts,
          immunizations: immunizations,
        })
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({
        success: true,
        source: "database",
        record: data,
      });
    }

    return NextResponse.json({
      success: true,
      source: "demo",
      notice: "Telemetry recorded in-session. To persist to PostgreSQL, provide valid member UUID and configure Supabase.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to persist health twin telemetry", details: err?.message },
      { status: 500 }
    );
  }
}

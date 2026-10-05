import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { DEMO_FACILITIES } from "@/lib/demo-data";

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();

    if (supabase) {
      const { data, error } = await supabase
        .from("emergency_facilities")
        .select(`
          *,
          facility_status(*)
        `);

      if (!error && data && data.length > 0) {
        return NextResponse.json({
          source: "database",
          facilities: data.map((f) => {
            const status = f.facility_status?.[0] || {};
            return {
              id: f.id,
              name: f.facility_name,
              type: f.facility_type,
              distanceKm: Number(f.distance_km_benchmark),
              travelTimeMin: f.travel_time_mins_benchmark,
              phone: f.phone_number,
              location: f.location_address,
              doctorOnDuty: status.doctor_on_duty_name || "Medical Officer on Duty",
              emergencyBeds: status.available_emergency_beds ?? 6,
              oxygenCylinders: status.oxygen_cylinders_count ?? 4,
              antivenomStock: status.antivenom_vials_count ?? 12,
              bloodUnitsStock: status.blood_units_count ?? 0,
              is24x7: f.is_24x7,
              isBenchmarkData: f.is_benchmark_data,
            };
          }),
          disclaimer:
            "GraminCare AI Rural Emergency Telemetry Network. Telemetry data synced with Supabase PostgreSQL.",
        });
      }
    }

    // Default to curated demo facilities
    return NextResponse.json({
      source: "demo",
      facilities: DEMO_FACILITIES,
      isBenchmarkData: true,
      disclaimer:
        "Curated Indian rural healthcare telemetry benchmark model. Live hospital telemetry requires state HMIS API bridge.",
    });
  } catch (err: any) {
    return NextResponse.json({
      source: "demo",
      facilities: DEMO_FACILITIES,
      isBenchmarkData: true,
      error: err?.message,
    });
  }
}

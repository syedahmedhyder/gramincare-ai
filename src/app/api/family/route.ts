import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { DEMO_FAMILIES } from "@/lib/demo-data";

function isValidUUID(id?: string | null): boolean {
  if (!id) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
}

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();

    if (supabase) {
      const { data, error } = await supabase
        .from("family_members")
        .select(`
          *,
          user_documents(*)
        `)
        .order("created_at", { ascending: true });

      if (!error && data && data.length > 0) {
        return NextResponse.json({
          source: "database",
          family: {
            id: "db-family",
            familyName: "Household Records",
            village: data[0].village,
            district: data[0].district,
            state: data[0].state,
            headOfHousehold:
              data.find((m) => m.is_head_of_household)?.full_name || data[0].full_name,
            rationCategory: "BPL",
            members: data.map((m) => ({
              id: m.id,
              name: m.full_name,
              relation: m.relation,
              age: m.age,
              gender: m.gender,
              village: m.village,
              district: m.district,
              state: m.state,
              aadhaarNumber: m.aadhaar_masked || "XXXX-XXXX-XXXX",
              rationCardNumber: m.ration_card_number || "KA-BPL-PENDING",
              annualIncome: Number(m.annual_income) || 0,
              healthConditions: [],
              documents: m.user_documents || [],
            })),
          },
        });
      }
    }

    // Default to curated family dataset
    return NextResponse.json({
      source: "demo",
      family: DEMO_FAMILIES[0],
      notice: "Showing benchmark rural household data. Supabase table 'family_members' will be populated upon saving new records.",
    });
  } catch (err: any) {
    return NextResponse.json({
      source: "demo",
      family: DEMO_FAMILIES[0],
      error: err?.message,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      relation = "Self",
      age = 30,
      gender = "Male",
      village,
      district,
      state,
      annualIncome,
      aadhaarMasked,
      rationCardNumber,
      isHeadOfHousehold,
      userId,
    } = body;

    if (!fullName) {
      return NextResponse.json(
        { error: "Required field missing: fullName" },
        { status: 400 }
      );
    }

    // Normalize relation & gender to match PostgreSQL CHECK constraints
    const validRelations = ["Self", "Spouse", "Child", "Parent", "Other"];
    const normalizedRelation = validRelations.includes(relation) ? relation : "Other";
    const validGenders = ["Male", "Female", "Other"];
    const normalizedGender = validGenders.includes(gender) ? gender : "Other";
    const normalizedAge = Math.max(0, Math.min(125, parseInt(String(age), 10) || 30));

    const supabase = getSupabaseServerClient();
    if (supabase) {
      const insertPayload: any = {
        full_name: fullName,
        relation: normalizedRelation,
        age: normalizedAge,
        gender: normalizedGender,
        village: village || "Rural Ward",
        district: district || "District",
        state: state || "State",
        annual_income: Number(annualIncome) || 0,
        aadhaar_masked: aadhaarMasked || "XXXX-XXXX-XXXX",
        ration_card_number: rationCardNumber || null,
        is_head_of_household: Boolean(isHeadOfHousehold),
      };

      if (isValidUUID(userId)) {
        insertPayload.user_id = userId;
      }

      const { data, error } = await supabase
        .from("family_members")
        .insert(insertPayload)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({
        success: true,
        source: "database",
        member: data,
      });
    }

    // In-memory demo response
    const demoMember = {
      id: "mem-" + Date.now(),
      name: fullName,
      relation: normalizedRelation,
      age: normalizedAge,
      gender: normalizedGender,
      village: village || "Keragodu",
      district: district || "Mandya",
      state: state || "Karnataka",
      aadhaarNumber:
        aadhaarMasked || "7842 XXXX " + Math.floor(1000 + Math.random() * 9000),
      rationCardNumber: rationCardNumber || "KA-MAN-BPL-NEW",
      annualIncome: Number(annualIncome) || 50000,
      healthConditions: [],
      documents: [],
    };

    return NextResponse.json({
      success: true,
      source: "demo",
      member: demoMember,
      notice: "Simulated in-memory creation for demo session",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to create family member", details: err?.message },
      { status: 500 }
    );
  }
}

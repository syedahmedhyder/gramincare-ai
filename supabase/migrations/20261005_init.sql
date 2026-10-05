-- ==============================================================================
-- GRAMINCARE AI — MASTER POSTGRESQL RELATIONAL SCHEMA (SUPABASE)
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. USERS / PROFILES TABLE (Linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'citizen' CHECK (role IN ('citizen', 'asha', 'doctor', 'admin')),
    preferred_language TEXT NOT NULL DEFAULT 'en',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. FAMILY MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.family_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    relation TEXT NOT NULL CHECK (relation IN ('Self', 'Spouse', 'Child', 'Parent', 'Other')),
    age INT NOT NULL CHECK (age >= 0 AND age <= 125),
    gender TEXT NOT NULL CHECK (gender IN ('Male', 'Female', 'Other')),
    village TEXT NOT NULL,
    district TEXT NOT NULL,
    state TEXT NOT NULL,
    aadhaar_masked TEXT,
    ration_card_number TEXT,
    annual_income DECIMAL(12, 2) DEFAULT 0,
    is_head_of_household BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. HEALTH PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.health_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id UUID NOT NULL REFERENCES public.family_members(id) ON DELETE CASCADE,
    blood_group TEXT CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
    chronic_conditions TEXT[] DEFAULT '{}',
    known_allergies TEXT[] DEFAULT '{}',
    last_checked_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. HEALTH TWIN RECORDS TABLE
CREATE TABLE IF NOT EXISTS public.health_twin_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id UUID NOT NULL REFERENCES public.family_members(id) ON DELETE CASCADE,
    bp_systolic INT NOT NULL,
    bp_diastolic INT NOT NULL,
    pulse_rate INT NOT NULL,
    blood_sugar_random INT,
    spo2_percentage INT,
    temperature_f DECIMAL(4, 1),
    bmi DECIMAL(4, 1),
    clinical_alerts JSONB DEFAULT '[]'::jsonb,
    immunizations JSONB DEFAULT '[]'::jsonb,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. SCHEMES TABLE
CREATE TABLE IF NOT EXISTS public.schemes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scheme_code TEXT UNIQUE NOT NULL,
    scheme_name TEXT NOT NULL,
    department TEXT NOT NULL,
    state_scope TEXT NOT NULL,
    coverage_amount TEXT NOT NULL,
    description TEXT NOT NULL,
    direct_benefit TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. SCHEME REQUIREMENTS TABLE
CREATE TABLE IF NOT EXISTS public.scheme_requirements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scheme_id UUID NOT NULL REFERENCES public.schemes(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL CHECK (document_type IN ('aadhaar', 'ration', 'income', 'mcp')),
    is_mandatory BOOLEAN DEFAULT true,
    max_income_limit DECIMAL(12, 2),
    special_criteria TEXT
);

-- 8. USER DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS public.user_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id UUID NOT NULL REFERENCES public.family_members(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL CHECK (document_type IN ('aadhaar', 'ration', 'income')),
    document_number_masked TEXT NOT NULL,
    issuing_authority TEXT NOT NULL,
    storage_path TEXT,
    extracted_fields JSONB NOT NULL DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'ready' CHECK (status IN ('ready', 'warning', 'risk')),
    issue_reason TEXT,
    fix_guidance TEXT,
    issued_date DATE,
    expiry_date DATE,
    uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. DOCUMENT CHECKS (GAP PREDICTIONS) TABLE
CREATE TABLE IF NOT EXISTS public.document_checks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id UUID NOT NULL REFERENCES public.family_members(id) ON DELETE CASCADE,
    scheme_id UUID NOT NULL REFERENCES public.schemes(id) ON DELETE CASCADE,
    readiness_score INT NOT NULL CHECK (readiness_score >= 0 AND readiness_score <= 100),
    overall_status TEXT NOT NULL CHECK (overall_status IN ('ready', 'warning', 'risk')),
    can_submit BOOLEAN NOT NULL DEFAULT false,
    mismatch_summary TEXT,
    fix_guidance_steps TEXT[] DEFAULT '{}',
    document_evaluations JSONB DEFAULT '[]'::jsonb,
    checked_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. TRIAGE SESSIONS TABLE
CREATE TABLE IF NOT EXISTS public.triage_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    member_id UUID REFERENCES public.family_members(id) ON DELETE SET NULL,
    reported_symptoms TEXT NOT NULL,
    language_code TEXT NOT NULL DEFAULT 'en',
    voice_transcription TEXT,
    initiated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. TRIAGE RESULTS TABLE
CREATE TABLE IF NOT EXISTS public.triage_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES public.triage_sessions(id) ON DELETE CASCADE,
    urgency_level TEXT NOT NULL CHECK (urgency_level IN ('Home Care', 'Consider PHC Visit', 'Urgent Care')),
    severity_code TEXT NOT NULL CHECK (severity_code IN ('green', 'yellow', 'red')),
    is_red_flag BOOLEAN NOT NULL DEFAULT false,
    clinical_summary TEXT NOT NULL,
    recommended_action TEXT NOT NULL,
    generic_otc_suggestions JSONB DEFAULT '[]'::jsonb,
    disclaimer TEXT NOT NULL DEFAULT 'Decision Support Only: Not a medical diagnosis or prescription.',
    evaluated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. EMERGENCY FACILITIES TABLE
CREATE TABLE IF NOT EXISTS public.emergency_facilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    facility_name TEXT NOT NULL,
    facility_type TEXT NOT NULL CHECK (facility_type IN ('PHC', 'CHC', 'Sub-District Hospital', 'District Hospital')),
    distance_km_benchmark DECIMAL(5, 2) NOT NULL,
    travel_time_mins_benchmark INT NOT NULL,
    location_address TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    is_24x7 BOOLEAN NOT NULL DEFAULT false,
    is_benchmark_data BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. FACILITY STATUS TABLE
CREATE TABLE IF NOT EXISTS public.facility_status (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    facility_id UUID NOT NULL REFERENCES public.emergency_facilities(id) ON DELETE CASCADE,
    doctor_on_duty_name TEXT NOT NULL,
    available_emergency_beds INT NOT NULL DEFAULT 0,
    oxygen_cylinders_count INT NOT NULL DEFAULT 0,
    antivenom_vials_count INT NOT NULL DEFAULT 0,
    blood_units_count INT NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action_type TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES FOR HIGH-THROUGHPUT RETRIEVAL
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_family_members_user ON public.family_members(user_id);
CREATE INDEX IF NOT EXISTS idx_health_twin_member ON public.health_twin_records(member_id);
CREATE INDEX IF NOT EXISTS idx_user_documents_member ON public.user_documents(member_id);
CREATE INDEX IF NOT EXISTS idx_document_checks_member ON public.document_checks(member_id);
CREATE INDEX IF NOT EXISTS idx_triage_sessions_user ON public.triage_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_triage_results_session ON public.triage_results(session_id);
CREATE INDEX IF NOT EXISTS idx_facility_status_facility ON public.facility_status(facility_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_twin_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.triage_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.triage_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheme_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facility_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Read policies for public benchmark catalogs
CREATE POLICY "Allow public read on schemes" ON public.schemes FOR SELECT USING (true);
CREATE POLICY "Allow public read on scheme_requirements" ON public.scheme_requirements FOR SELECT USING (true);
CREATE POLICY "Allow public read on emergency_facilities" ON public.emergency_facilities FOR SELECT USING (true);
CREATE POLICY "Allow public read on facility_status" ON public.facility_status FOR SELECT USING (true);

-- User-scoped policies for profile & family records
CREATE POLICY "Users can manage their own profile" ON public.profiles
    FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can manage their family members" ON public.family_members
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view health profiles of family" ON public.health_profiles
    FOR ALL USING (EXISTS (
        SELECT 1 FROM public.family_members 
        WHERE public.family_members.id = public.health_profiles.member_id 
        AND public.family_members.user_id = auth.uid()
    ));

CREATE POLICY "Users can view health twin records of family" ON public.health_twin_records
    FOR ALL USING (EXISTS (
        SELECT 1 FROM public.family_members 
        WHERE public.family_members.id = public.health_twin_records.member_id 
        AND public.family_members.user_id = auth.uid()
    ));

-- ==============================================================================
-- INITIAL SEED DATA (SCHEMES & BENCHMARK FACILITIES)
-- ==============================================================================
INSERT INTO public.schemes (scheme_code, scheme_name, department, state_scope, coverage_amount, description, direct_benefit)
VALUES 
('PM-JAY', 'Ayushman Bharat PM-JAY', 'National Health Authority (Govt of India)', 'Pan-India', '₹ 5,00,000 / family / year', 'Secondary and tertiary hospitalization coverage for vulnerable rural families.', 'Cashless in-patient treatments across 28,000+ empaneled hospitals.'),
('AB-ArK', 'Arogya Karnataka (Ayushman Bharat - ArK)', 'Dept of Health & Family Welfare, Karnataka', 'Karnataka', '₹ 5,00,000 (Eligible) / 30% Concession', 'Universal health coverage through primary PHC referral networks.', 'Covers 1,650 complex surgical procedures without out-of-pocket costs.'),
('JSY', 'Janani Suraksha Yojana (JSY)', 'National Health Mission (NHM)', 'Pan-India', '₹ 1,400 Rural Cash Incentive + Free Transport', 'Safe motherhood intervention promoting institutional delivery.', 'Direct Benefit Transfer plus free diagnostics, diet and transport.'),
('CMCHIS', 'Chief Minister Comprehensive Health Insurance Scheme', 'Govt of Tamil Nadu', 'Tamil Nadu', '₹ 5,00,000 / family / year', 'Comprehensive coverage for 1,090 surgical procedures and 154 day-care packages.', 'Cashless medical assistance across empaneled hospitals in Tamil Nadu.')
ON CONFLICT (scheme_code) DO NOTHING;

INSERT INTO public.emergency_facilities (facility_name, facility_type, distance_km_benchmark, travel_time_mins_benchmark, location_address, phone_number, is_24x7, is_benchmark_data)
VALUES 
('Keragodu Primary Health Center (PHC)', 'PHC', 3.2, 7, 'Main Road, Keragodu Gram Panchayat, Mandya', '+91 8232 248102', false, true),
('Mandya Taluk Community Health Center (CHC)', 'CHC', 9.8, 18, 'Near Bus Terminal, Mandya Taluk', '+91 8232 229105', true, true),
('Mandya District Civil Hospital & Trauma Center', 'District Hospital', 18.5, 32, 'BIMS Campus, Hospital Road, Mandya City', '+91 8232 220044', true, true)
ON CONFLICT DO NOTHING;

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. organisations
CREATE TABLE organisations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    logo_url TEXT,
    brand_colours JSONB DEFAULT '{"primary": "#253A5E", "accent": "#F59E0B"}',
    reg_12a TEXT,
    reg_80g TEXT,
    config JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. users
CREATE TABLE users (
    id UUID PRIMARY KEY, -- References auth.users
    org_id UUID REFERENCES organisations(id) NOT NULL,
    email TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'fundraiser', 'data_entry', 'auditor')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. donors
CREATE TABLE donors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organisations(id) NOT NULL,
    display_name TEXT NOT NULL,
    pan_encrypted BYTEA,
    pan_last4 TEXT,
    type TEXT NOT NULL CHECK (type IN ('individual', 'corporate', 'csr')) DEFAULT 'individual',
    tier TEXT,
    risk_score NUMERIC,
    merged_into UUID REFERENCES donors(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. donor_identifiers
CREATE TABLE donor_identifiers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donor_id UUID REFERENCES donors(id) NOT NULL,
    org_id UUID REFERENCES organisations(id) NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('phone', 'email', 'alias', 'pan_hash')),
    value_normalised TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. programmes
CREATE TABLE programmes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organisations(id) NOT NULL,
    name TEXT NOT NULL,
    location TEXT,
    unit_cost NUMERIC,
    unit_label TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. campaigns
CREATE TABLE campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organisations(id) NOT NULL,
    name TEXT NOT NULL,
    goal NUMERIC,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. donations
CREATE TABLE donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organisations(id) NOT NULL,
    donor_id UUID REFERENCES donors(id) NOT NULL,
    channel TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    currency TEXT DEFAULT 'INR',
    date DATE NOT NULL,
    reference TEXT,
    campaign_id UUID REFERENCES campaigns(id),
    programme_id UUID REFERENCES programmes(id),
    status TEXT NOT NULL DEFAULT 'completed',
    receipt_no TEXT,
    reconciled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. interactions
CREATE TABLE interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organisations(id) NOT NULL,
    donor_id UUID REFERENCES donors(id) NOT NULL,
    type TEXT NOT NULL,
    channel TEXT NOT NULL,
    payload JSONB,
    sent_at TIMESTAMPTZ,
    status TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. merge_candidates
CREATE TABLE merge_candidates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organisations(id) NOT NULL,
    donor_a UUID REFERENCES donors(id) NOT NULL,
    donor_b UUID REFERENCES donors(id) NOT NULL,
    score NUMERIC NOT NULL,
    reasons JSONB NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. recon_items
CREATE TABLE recon_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organisations(id) NOT NULL,
    source_ref TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    date DATE NOT NULL,
    matched_donation_id UUID REFERENCES donations(id),
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. ai_drafts
CREATE TABLE ai_drafts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organisations(id) NOT NULL,
    type TEXT NOT NULL,
    content TEXT NOT NULL,
    source_record_ids UUID[],
    verified_claims JSONB,
    approved_by UUID REFERENCES users(id),
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. automation_rules
CREATE TABLE automation_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organisations(id) NOT NULL,
    trigger TEXT NOT NULL,
    conditions JSONB,
    actions JSONB NOT NULL,
    enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. consents
CREATE TABLE consents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organisations(id) NOT NULL,
    donor_id UUID REFERENCES donors(id) NOT NULL,
    type TEXT NOT NULL,
    granted_at TIMESTAMPTZ DEFAULT NOW(),
    revoked_at TIMESTAMPTZ
);

-- 14. audit_log
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organisations(id) NOT NULL,
    user_id UUID,
    action TEXT NOT NULL,
    table_name TEXT NOT NULL,
    record_id UUID NOT NULL,
    diff JSONB,
    ip TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_donor_identifiers_value_trgm ON donor_identifiers USING GIN (value_normalised gin_trgm_ops);
CREATE INDEX idx_donations_org_date ON donations(org_id, date);
CREATE INDEX idx_donations_donor_id ON donations(donor_id);

-- RLS (Row Level Security)
ALTER TABLE organisations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE donor_identifiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE programmes ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE merge_candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE recon_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Note: In a real environment, we'd set up auth.jwt()->>'org_id' policies. 
-- For demo/seeding purposes without a full auth flow, we might need a bypass or service role usage.

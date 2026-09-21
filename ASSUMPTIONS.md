# ASSUMPTIONS.md — Pralekhan

All assumptions made during design and build. Reviewed by the team before production deployment.

---

## Infrastructure

| # | Assumption | Rationale |
|---|---|---|
| A1 | Local Supabase (`supabase start`) used for demo; Docker Desktop required | Zero-cost, no credentials needed for judges |
| A2 | Production target: Supabase hosted Free tier (then Pro) + Vercel Hobby | Cheapest possible hosted stack |
| A3 | No separate microservices; all logic in Next.js API routes + Supabase Edge Functions | Simplicity for NGO self-hosting |
| A4 | All integration adapters run in **mock mode** by default (`ADAPTER_MODE=mock`) | Demo works with zero external API keys |

## Data & Privacy

| # | Assumption | Rationale |
|---|---|---|
| A5 | PAN and phone numbers encrypted with pgcrypto symmetric encryption; key in `FIELD_ENCRYPTION_KEY` env var | Minimum viable PII protection |
| A6 | PAN masked as `XXXXX1234X` in UI; phone masked as `XXXXXX1234`; unmasking requires Admin role + audit-logged | Balance usability vs. privacy |
| A7 | GDPR/DPDPA consent captured at import and manual entry; opt-out suppresses all outbound comms | India DPDPA 2023 compliance intent |
| A8 | Seed data is entirely synthetic (faker-js + custom Indian name corpus); no real donor data | Legal and ethical safety |

## Identity Resolution (Merge)

| # | Assumption | Rationale |
|---|---|---|
| A9 | Phone normalised to E.164 (+91XXXXXXXXXX) before storage and comparison | Most reliable deduplication key in India |
| A10 | Name fuzzy match uses pg_trgm trigram similarity (threshold 0.4) + Jaro-Winkler in application layer | Two-pass for precision |
| A11 | Known Indian name variants coded in a lookup table: Mohammad/Mohd/Md, Sharma/Sharmah, etc. | Covers most common NGO donor list problems |
| A12 | Auto-merge threshold: combined score >= 0.90. Human-review threshold: 0.50-0.89. Below 0.50: no candidate | Conservative to avoid wrong merges |
| A13 | Merge is soft (donor record points to merged_into); original records preserved for audit | Never destroy data |

## Acknowledgements & Receipts

| # | Assumption | Rationale |
|---|---|---|
| A14 | 80G receipt PDF generated with pdf-lib; template is per-org via config.receipt_template jsonb field | No headless browser dependency |
| A15 | Receipt numbering: {ORG_SLUG}-{YYYY}-{NNNNN} (auto-incremented per org per year) | Unique, auditable, human-readable |
| A16 | WhatsApp mock: message displayed in on-screen preview panel with green-bubble UI | No real WA Business API key needed |
| A17 | Acknowledgement triggered asynchronously; mock completes in <2s | ~60 second target in mock is instant |
| A18 | Form 10BD export: Excel format with disclaimer "Verify with CA before filing" | Full XML spec is CA responsibility |

## AI / Grounded AI

| # | Assumption | Rationale |
|---|---|---|
| A19 | LLM adapter uses Gemini Flash by default; mock returns pre-written sample drafts | Demo never needs an API key |
| A20 | PII scrubber replaces names with pseudonyms (Donor_001 etc.), strips PAN/phone before LLM call | Prevents data leakage |
| A21 | Unverified claim = any numeric assertion whose value cannot be matched in source_record_ids dataset | Conservative; may flag intentional rounding |
| A22 | AI never sends anything; human approval required at DB level | Hard governance rule |

## Multi-Tenancy

| # | Assumption | Rationale |
|---|---|---|
| A23 | Two demo orgs seeded: UPAY (children education) and Prani (animal welfare) | Proves reusability |
| A24 | RLS policy: org_id = auth.jwt()->>'org_id' on every table | Postgres-level tenant isolation |
| A25 | Super-admin role exists outside org scope; not in demo UI | Future SaaS management |

## Financial / Legal

| # | Assumption | Rationale |
|---|---|---|
| A26 | Unit costs (Rs 500 = 1 child-month) are placeholder values; not audited figures | Must be verified with UPAY finance |
| A27 | CSR donations treated as regular donations with channel=csr; no CSR compliance workflow | Out of scope for prototype |
| A28 | Razorpay webhook HMAC-SHA256 verification implemented even in mock mode | Security habit |

## UX

| # | Assumption | Rationale |
|---|---|---|
| A29 | Primary language: English UI with Hindi field labels and message templates | Staff use English; donors receive Hindi |
| A30 | Mobile-first layout for Donor 360 and Manual Entry (volunteer use case) | Other pages desktop-first |
| A31 | Display font: Sora (Google Fonts, free) for headings; Inter for body | Characterful but legible |

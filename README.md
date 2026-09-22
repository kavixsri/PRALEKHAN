<div align="center">

# Pralekhan
### Donor & Donation Management System
**Built for UPAY NGO · Samadhan 2026-27 Track 2**

[![Live Demo](https://img.shields.io/badge/Live_Demo-kavixsri.github.io/PRALEKHAN-1E3A5F?style=for-the-badge)](https://kavixsri.github.io/PRALEKHAN/)
[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## Demo Login

| Field    | Value              |
|----------|--------------------|
| Email    | `admin@upay.org`   |
| Password | `upay2026`         |

> **Live URL:** https://kavixsri.github.io/PRALEKHAN/

---

## What is Pralekhan?

UPAY NGO manages **20,000-30,000 donors** and donations flowing in through Razorpay, bank/UPI transfers, cash, cheques, and CSR grants. Records were fragmented across spreadsheets — causing duplicates, slow reconciliation, missed acknowledgements, and zero donor insights.

**Pralekhan** unifies all of this into one elegant system built on three core pillars:

| Pillar | What it does |
|--------|-------------|
| **MERGE** | Identity-resolution engine — fuzzy name matching (handles "Mohammad" vs "Md."), E.164 phone normalisation, email deduplication |
| **THANK** | Triggers WhatsApp-first acknowledgement + auto-generated 80G receipt PDF within ~60 seconds of a donation |
| **PROVE** | Grounded AI Writer for grant proposals — every number cites its source, hallucinations are flagged before sending |

---

## Features

### Dashboard
- KPI cards: Total Donors, Total Raised (FY 26-27), Active Campaigns, Pending Reconciliation
- Recent donation feed
- Quick actions: Add Donor, Record Donation, Import CSV

### Donor Management
- **20 rich donor profiles** (individuals + CSR organisations across 15 Indian cities)
- Segments: Champion, Loyal, At-Risk, Lapsed (RFM scoring)
- Donor 360 profile with full donation timeline
- **Add Donor** modal with instant save to local state
- CSV Import Wizard (5 steps: upload → map → normalise → dedupe preview → confirm)

### Donation Ledger
- **30 donations** across all channels: Razorpay, UPI, Bank Transfer, Cash, Cheque
- **Record Donation** modal with channel + campaign selection
- 80G receipt download per transaction

### Merge Review Queue
- Confidence-scored duplicate candidates (score 0.0 - 1.0)
- Side-by-side A vs B donor comparison
- Reasons shown: phone exact match, name variant, email match
- One-click Approve or Reject with audit trail

### Reconciliation Inbox
- Upload bank CSV to auto-match recorded donations
- Green (matched) / Amber (needs review) / Red (unmatched) status badges
- Manual resolution workflow for exceptions

### Reports & Insights
- Campaign performance bar chart
- Donor retention trend line chart
- Channel mix pie chart
- Lapse Risk Queue with RFM score explanations

### Grounded AI Writer
- Generate grant proposals and donor letters
- Every numeric claim auto-cites its source record `[Src: tx2]`
- Unverified numbers highlighted before you can approve
- Send button locked until all claims verified

### Settings
- Profile: name, email, role, organisation
- Security: change password form
- Org Settings: 80G number, 12A number, Razorpay webhook URL, WhatsApp template

### Auth
- Login page with credential validation
- Session stored in localStorage (demo-safe, no server needed)
- All app routes protected — redirects to login if not signed in

---

## Architecture

```
Next.js 16 (App Router, Static Export)
src/app/
  login/              <- Auth page
  (app)/
    layout.tsx        <- Sidebar + auth guard
    page.tsx          <- Dashboard
    donors/           <- List + [id] profile + import wizard
    donations/        <- Ledger + manual entry modal
    reconciliation/   <- Bank CSV matching
    merge-review/     <- Duplicate resolution queue
    reports/          <- Charts (Recharts)
    ai-writer/        <- Grounded AI prototype
    settings/         <- Profile + org config
src/lib/
  mock-data.ts        <- 20 donors, 30 donations, merge candidates
  services/           <- Identity, reconciliation, AI grounding logic
  adapters/           <- Mock adapters for Razorpay, WhatsApp, Sheets
tests/                <- Vitest unit tests (dedupe, matcher, AI verifier)
```

Zero external API dependencies for the demo — all adapters are mocked. No API keys needed.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Static Export) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Charts | Recharts |
| Testing | Vitest |
| Deployment | GitHub Pages |
| Auth | localStorage (demo) → Supabase Auth (production) |
| DB Schema | Supabase Postgres (migration included, not required for demo) |

---

## Run Locally

```bash
git clone https://github.com/kavixsri/PRALEKHAN.git
cd PRALEKHAN
npm install
npm run dev
# Open http://localhost:3000
# Login: admin@upay.org / upay2026
```

Run tests:

```bash
npm run test
```

---

## Cost Model

| Component | Cost |
|-----------|------|
| GitHub Pages hosting | Free |
| Supabase (up to 500MB) | Free |
| WhatsApp Cloud API | ~Rs 0.40/message |
| 80G PDF generation | Free (pdf-lib, serverless) |
| **Total recurring** | **< Rs 500/month** |

---

## Key Files

| File | Purpose |
|------|---------|
| `src/lib/mock-data.ts` | All demo data (20 donors, 30 donations) |
| `src/lib/services/identity.ts` | Phone normalisation + fuzzy name matching |
| `src/lib/services/grounded-ai.ts` | Claim extraction + verification |
| `supabase/migrations/` | Full Postgres schema with RLS |
| `DEMO_SCRIPT.md` | Step-by-step demo walkthrough |
| `ASSUMPTIONS.md` | Design decisions and constraints |

---

<div align="center">
Built for UPAY NGO · Samadhan 2026-27
</div>

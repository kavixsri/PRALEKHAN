<div align="center">

# 📋 Pralekhan
### Donor & Donation Management System
**Built for UPAY NGO · Samadhan 2026-27 Track 2**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-kavixsri.github.io/PRALEKHAN-1E3A5F?style=for-the-badge)](https://kavixsri.github.io/PRALEKHAN/login)
[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## 🔐 Demo Login

| Field    | Value              |
|----------|--------------------|
| Email    | `admin@upay.org`   |
| Password | `upay2026`         |

> **Live URL:** https://kavixsri.github.io/PRALEKHAN/login

---

## 🎯 What is Pralekhan?

UPAY NGO manages **20,000–30,000 donors** and donations flowing in through Razorpay, bank/UPI transfers, cash, cheques, and CSR grants. Records were fragmented across spreadsheets and manual systems — causing duplicates, slow reconciliation, missed acknowledgements, and zero donor insights.

**Pralekhan** unifies all of this into one elegant system built on three core pillars:

| Pillar | What it does |
|--------|-------------|
| 🔀 **MERGE** | Identity-resolution engine that unifies donors across channels — fuzzy name matching (handles "Mohammad" vs "Md." vs "Mohammed"), E.164 phone normalisation, email deduplication |
| 💌 **THANK** | Triggers WhatsApp-first acknowledgement + auto-generated 80G receipt PDF within ~60 seconds of a donation |
| 📝 **PROVE** | Grounded AI Writer for grant proposals — every number cites its source, hallucinations are flagged before sending |

---

## 🖥️ Features

### 🏠 Dashboard
- KPI cards: Total Donors, Total Raised (FY 26-27), Active Campaigns, Pending Reconciliation
- Recent donation feed with real-time activity
- Quick actions: Add Donor, Record Donation, Import CSV

### 👥 Donor Management
- **20 rich donor profiles** (individuals + CSR organisations across 15 Indian cities)
- Segments: Champion, Loyal, At-Risk, Lapsed (RFM scoring)
- Donor 360° profile with donation timeline
- **Add Donor** modal with instant save
- CSV Import Wizard (5 steps: upload → map → normalise → dedupe preview → confirm)

### 💰 Donation Ledger
- **30 donations** across all channels: Razorpay, UPI, Bank Transfer, Cash, Cheque
- **Record Donation** modal
- 80G receipt download per transaction
- Campaign tagging and filtering

### 🔀 Merge Review Queue
- Confidence-scored duplicate candidates (score 0–1)
- Side-by-side A vs B comparison
- Reasons: phone exact match, name variant, email match
- One-click Approve or Reject

### 🔄 Reconciliation Inbox
- Upload bank CSV → auto-match to recorded donations
- Green (matched) / Amber (needs review) / Red (unmatched) badges
- Manual resolution workflow for exceptions

### 📊 Reports & Insights
- Campaign performance bar chart
- Donor retention trend line chart
- Channel mix pie chart
- **Lapse Risk Queue** with hoverable RFM "why" explanation

### ✍️ Grounded AI Writer
- Generate grant proposals and donor letters
- Every claim auto-cites its source record `[Src: tx2]`
- Unverified numbers highlighted in red before you can send
- Approval gate: Send button disabled until all claims verified

### ⚙️ Settings
- Profile: name, email, role, organisation
- Security: change password
- Org Settings: 80G number, 12A number, Razorpay webhook, WhatsApp template

---

## 🏗️ Architecture

```
Next.js 16 (App Router, Static Export)
├── src/app/
│   ├── login/              ← Auth page (localStorage-based)
│   └── (app)/
│       ├── layout.tsx      ← Sidebar + auth guard
│       ├── page.tsx        ← Dashboard
│       ├── donors/         ← List + [id] profile + import wizard
│       ├── donations/      ← Ledger + manual entry
│       ├── reconciliation/ ← Bank CSV matching
│       ├── merge-review/   ← Duplicate resolution
│       ├── reports/        ← Charts (Recharts)
│       ├── ai-writer/      ← Grounded AI prototype
│       └── settings/       ← Profile + org config
├── src/lib/
│   ├── mock-data.ts        ← 20 donors, 30 donations, merge candidates
│   ├── services/           ← Identity, reconciliation, AI grounding logic
│   └── adapters/           ← Mock adapters for Razorpay, WhatsApp, Sheets
└── tests/                  ← Vitest unit tests (dedupe, matcher, AI verifier)
```

**Zero external dependencies for the demo** — all adapters are mocked. No API keys needed. Deploy anywhere static files are served.

---

## 🧪 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Charts | Recharts |
| Testing | Vitest |
| Deployment | GitHub Pages (static export) |
| Auth | localStorage (demo) → Supabase Auth (production) |
| DB Schema | Supabase Postgres (migration included, not required for demo) |

---

## 🚀 Run Locally

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

## 💰 Cost Model

| Component | Cost |
|-----------|------|
| GitHub Pages hosting | Free |
| Supabase (up to 500MB) | Free |
| WhatsApp Cloud API | ~₹0.40/message |
| 80G PDF generation | Serverless (pdf-lib) |
| **Total recurring** | **< ₹500/month** |

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| [`src/lib/mock-data.ts`](src/lib/mock-data.ts) | All demo data (20 donors, 30 donations) |
| [`src/lib/services/identity.ts`](src/lib/services/identity.ts) | Phone normalisation + fuzzy name matching |
| [`src/lib/services/grounded-ai.ts`](src/lib/services/grounded-ai.ts) | Claim extraction + verification |
| [`supabase/migrations/`](supabase/migrations/) | Full Postgres schema with RLS |
| [`DEMO_SCRIPT.md`](DEMO_SCRIPT.md) | Step-by-step demo walkthrough |
| [`ASSUMPTIONS.md`](ASSUMPTIONS.md) | Design decisions and constraints |

---

<div align="center">
Built with ❤️ for UPAY NGO · Samadhan 2026-27
</div>

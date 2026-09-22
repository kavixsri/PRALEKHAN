<div align="center">

# ðŸ“‹ Pralekhan
### Donor & Donation Management System
**Built for UPAY NGO Â· Samadhan 2026-27 Track 2**

[![Live Demo](https://img.shields.io/badge/ðŸŒ_Live_Demo-kavixsri.github.io/PRALEKHAN-1E3A5F?style=for-the-badge)](https://kavixsri.github.io/PRALEKHAN/)
[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## ðŸ” Demo Login

| Field    | Value              |
|----------|--------------------|
| Email    | `admin@upay.org`   |
| Password | `upay2026`         |

> **Live URL:** https://kavixsri.github.io/PRALEKHAN/

---

## ðŸŽ¯ What is Pralekhan?

UPAY NGO manages **20,000â€“30,000 donors** and donations flowing in through Razorpay, bank/UPI transfers, cash, cheques, and CSR grants. Records were fragmented across spreadsheets and manual systems â€” causing duplicates, slow reconciliation, missed acknowledgements, and zero donor insights.

**Pralekhan** unifies all of this into one elegant system built on three core pillars:

| Pillar | What it does |
|--------|-------------|
| ðŸ”€ **MERGE** | Identity-resolution engine that unifies donors across channels â€” fuzzy name matching (handles "Mohammad" vs "Md." vs "Mohammed"), E.164 phone normalisation, email deduplication |
| ðŸ’Œ **THANK** | Triggers WhatsApp-first acknowledgement + auto-generated 80G receipt PDF within ~60 seconds of a donation |
| ðŸ“ **PROVE** | Grounded AI Writer for grant proposals â€” every number cites its source, hallucinations are flagged before sending |

---

## ðŸ–¥ï¸ Features

### ðŸ  Dashboard
- KPI cards: Total Donors, Total Raised (FY 26-27), Active Campaigns, Pending Reconciliation
- Recent donation feed with real-time activity
- Quick actions: Add Donor, Record Donation, Import CSV

### ðŸ‘¥ Donor Management
- **20 rich donor profiles** (individuals + CSR organisations across 15 Indian cities)
- Segments: Champion, Loyal, At-Risk, Lapsed (RFM scoring)
- Donor 360Â° profile with donation timeline
- **Add Donor** modal with instant save
- CSV Import Wizard (5 steps: upload â†’ map â†’ normalise â†’ dedupe preview â†’ confirm)

### ðŸ’° Donation Ledger
- **30 donations** across all channels: Razorpay, UPI, Bank Transfer, Cash, Cheque
- **Record Donation** modal
- 80G receipt download per transaction
- Campaign tagging and filtering

### ðŸ”€ Merge Review Queue
- Confidence-scored duplicate candidates (score 0â€“1)
- Side-by-side A vs B comparison
- Reasons: phone exact match, name variant, email match
- One-click Approve or Reject

### ðŸ”„ Reconciliation Inbox
- Upload bank CSV â†’ auto-match to recorded donations
- Green (matched) / Amber (needs review) / Red (unmatched) badges
- Manual resolution workflow for exceptions

### ðŸ“Š Reports & Insights
- Campaign performance bar chart
- Donor retention trend line chart
- Channel mix pie chart
- **Lapse Risk Queue** with hoverable RFM "why" explanation

### âœï¸ Grounded AI Writer
- Generate grant proposals and donor letters
- Every claim auto-cites its source record `[Src: tx2]`
- Unverified numbers highlighted in red before you can send
- Approval gate: Send button disabled until all claims verified

### âš™ï¸ Settings
- Profile: name, email, role, organisation
- Security: change password
- Org Settings: 80G number, 12A number, Razorpay webhook, WhatsApp template

---

## ðŸ—ï¸ Architecture

```
Next.js 16 (App Router, Static Export)
â”œâ”€â”€ src/app/
â”‚   â”œâ”€â”€ login/              â† Auth page (localStorage-based)
â”‚   â””â”€â”€ (app)/
â”‚       â”œâ”€â”€ layout.tsx      â† Sidebar + auth guard
â”‚       â”œâ”€â”€ page.tsx        â† Dashboard
â”‚       â”œâ”€â”€ donors/         â† List + [id] profile + import wizard
â”‚       â”œâ”€â”€ donations/      â† Ledger + manual entry
â”‚       â”œâ”€â”€ reconciliation/ â† Bank CSV matching
â”‚       â”œâ”€â”€ merge-review/   â† Duplicate resolution
â”‚       â”œâ”€â”€ reports/        â† Charts (Recharts)
â”‚       â”œâ”€â”€ ai-writer/      â† Grounded AI prototype
â”‚       â””â”€â”€ settings/       â† Profile + org config
â”œâ”€â”€ src/lib/
â”‚   â”œâ”€â”€ mock-data.ts        â† 20 donors, 30 donations, merge candidates
â”‚   â”œâ”€â”€ services/           â† Identity, reconciliation, AI grounding logic
â”‚   â””â”€â”€ adapters/           â† Mock adapters for Razorpay, WhatsApp, Sheets
â””â”€â”€ tests/                  â† Vitest unit tests (dedupe, matcher, AI verifier)
```

**Zero external dependencies for the demo** â€” all adapters are mocked. No API keys needed. Deploy anywhere static files are served.

---

## ðŸ§ª Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Charts | Recharts |
| Testing | Vitest |
| Deployment | GitHub Pages (static export) |
| Auth | localStorage (demo) â†’ Supabase Auth (production) |
| DB Schema | Supabase Postgres (migration included, not required for demo) |

---

## ðŸš€ Run Locally

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

## ðŸ’° Cost Model

| Component | Cost |
|-----------|------|
| GitHub Pages hosting | Free |
| Supabase (up to 500MB) | Free |
| WhatsApp Cloud API | ~â‚¹0.40/message |
| 80G PDF generation | Serverless (pdf-lib) |
| **Total recurring** | **< â‚¹500/month** |

---

## ðŸ“ Key Files

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
Built with â¤ï¸ for UPAY NGO Â· Samadhan 2026-27
</div>

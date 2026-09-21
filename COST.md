# COST.md — Pralekhan

> All costs in INR. USD converted at Rs 84/USD.

## Build Cost (One-Time)

| Item | Cost |
|---|---|
| Development (self-built) | Rs 0 |
| Design assets (Google Fonts, shadcn/ui, Tailwind) | Rs 0 |
| **Total Build** | **Rs 0** |

## Monthly Running Cost — Demo / Prototype

| Service | Tier | Cost/Month |
|---|---|---|
| Supabase | Free (500 MB DB, 1 GB storage, 50k MAU) | Rs 0 |
| Vercel | Hobby (100 GB bandwidth) | Rs 0 |
| **Total Demo** | | **Rs 0/month** |

## Monthly Running Cost — Small NGO Production (up to 30k donors)

| Service | Tier | INR/Month |
|---|---|---|
| Supabase Pro | 8 GB DB, 100 GB storage, 100k MAU | ~Rs 2,100 |
| Vercel Pro | 1 TB bandwidth, custom domain | ~Rs 1,680 |
| WhatsApp Cloud API | ~500 msgs/month @ Rs 0.90/conversation | ~Rs 450 |
| Gemini Flash (AI Writer) | ~1M tokens/month | ~Rs 6 |
| Email (Resend free) | 3,000 emails/month free | Rs 0 |
| **Total Production** | | **~Rs 4,236/month** |

## Per-Transaction Costs

| Transaction | Cost |
|---|---|
| Razorpay payment processing | 2% + GST (donor/NGO choice) |
| WhatsApp acknowledgement | ~Rs 0.90 per conversation |
| 80G receipt PDF | Rs 0 (server-side generated) |
| AI draft (Gemini Flash) | ~Rs 0.006 per draft |

## Scaling Estimates

| Donor Volume | Recommended Tier | Monthly Cost |
|---|---|---|
| 0-30k | Supabase Free + Vercel Hobby | Rs 0 |
| 30k-100k | Supabase Pro + Vercel Pro | ~Rs 4,200 |
| 100k-500k | Supabase Pro (larger compute) + Vercel Pro | ~Rs 8,400 |
| 500k+ | Supabase Enterprise or self-hosted | Custom |

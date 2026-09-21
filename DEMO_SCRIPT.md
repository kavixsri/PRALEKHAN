# DEMO_SCRIPT.md — Pralekhan

1. **Messy CSV Import**: Go to Onboarding. Upload dirty_donors.csv. Show normalisation preview (E.164 phones). Show dedupe preview catching "Mohammad" vs "Md" variants.
2. **Merge Review**: Go to Merge Review queue. Show a 70% confidence match. Approve it. Show audit log entry.
3. **Razorpay Mock Payment**: Run script to hit /api/webhooks/razorpay with a test payload for donor ID 1.
4. **WhatsApp + Receipt**: Check Donor 360 page for donor 1. Show the interaction log (Mock WhatsApp sent). Download the auto-generated PDF 80G receipt.
5. **Reconciliation Inbox**: Upload ank_statement.csv. Show auto-matched rows with green badges. Click one exception to manually resolve.
6. **Lapse-Risk Queue**: Go to Reports -> At-Risk. Hover over the RFM score to show the "why" tooltip.
7. **Grounded AI Proposal**: Go to AI Writer. Type "Write a proposal for Rs 1 Lakh based on recent education campaigns". Show the generated draft with [Src: ...] tags. Show how changing a number flags an "Unverified Claim".
8. **Sheet Mirror**: Show the mock console output proving the donation was appended to Google Sheets in real-time.

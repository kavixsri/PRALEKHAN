import { NextRequest, NextResponse } from 'next/server';
import { MockPaymentAdapter } from '@/lib/adapters/mock';
import { IdentityService } from '@/lib/services/identity';

export async function POST(req: NextRequest) {
    const payload = await req.json();
    const signature = req.headers.get('x-razorpay-signature') || '';
    
    const adapter = new MockPaymentAdapter();
    const isValid = adapter.verifyWebhookSignature(JSON.stringify(payload), signature, 'mock-secret');
    
    if (!isValid) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    console.log('[Webhook] Received valid Razorpay payload');
    
    // Simulate identity resolution for the donor
    const donorInfo = {
        name: payload.payload?.payment?.entity?.notes?.name || 'Unknown',
        email: payload.payload?.payment?.entity?.email,
        phone: payload.payload?.payment?.entity?.contact
    };
    
    // In real app, pass dbClient
    const result = await IdentityService.resolveDonor(null, 'upay-org-id', donorInfo);
    console.log('[Webhook] Identity resolved:', result);

    // TODO: Insert donation into DB
    // TODO: Trigger ThankService

    return NextResponse.json({ status: 'ok' });
}

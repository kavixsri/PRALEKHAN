import { IPaymentAdapter, IMessagingAdapter, IEmailAdapter, ISheetsAdapter, ILLMAdapter } from '../types';

export class MockPaymentAdapter implements IPaymentAdapter {
    verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
        console.log('[MockPayment] Verifying signature', { signature, secret });
        return true; // Always valid in mock
    }
    async processWebhook(payload: any): Promise<void> {
        console.log('[MockPayment] Processing webhook payload:', payload);
        return Promise.resolve();
    }
}

export class MockMessagingAdapter implements IMessagingAdapter {
    async sendMessage(to: string, message: string, templateId?: string): Promise<boolean> {
        console.log(\[MockMessaging] Sending WhatsApp to \:\, message);
        return Promise.resolve(true);
    }
}

export class MockEmailAdapter implements IEmailAdapter {
    async sendEmail(to: string, subject: string, body: string, attachment?: Buffer): Promise<boolean> {
        console.log(\[MockEmail] Sending email to \: \\);
        return Promise.resolve(true);
    }
}

export class MockSheetsAdapter implements ISheetsAdapter {
    async appendRow(spreadsheetId: string, range: string, values: any[]): Promise<boolean> {
        console.log(\[MockSheets] Appending to \!\:\, values);
        return Promise.resolve(true);
    }
}

export class MockLLMAdapter implements ILLMAdapter {
    async generateDraft(prompt: string, contextData: any): Promise<string> {
        console.log('[MockLLM] Generating draft for prompt:', prompt.substring(0, 50) + '...');
        return Promise.resolve(
            \Draft Proposal: \\n\\nBased on your support, we have been able to fund 50 child-months of education [Src: donation#test1234]. Thank you for your Rs 25,000 contribution.\
        );
    }
    
    async extractClaims(text: string): Promise<number[]> {
        console.log('[MockLLM] Extracting claims from text');
        // Dummy extraction: extract all numbers
        const matches = text.match(/\\d+/g);
        return Promise.resolve(matches ? matches.map(Number) : []);
    }
}

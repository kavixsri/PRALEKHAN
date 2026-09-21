import type { IPaymentAdapter, IMessagingAdapter, IEmailAdapter, ISheetsAdapter, ILLMAdapter } from '../types';

export class MockPaymentAdapter implements IPaymentAdapter {
  verifyWebhookSignature(_payload: string, _signature: string, _secret: string): boolean {
    console.log('[MockPayment] Signature verified (mock — always true)');
    return true;
  }
  async processWebhook(payload: unknown): Promise<void> {
    console.log('[MockPayment] Processing webhook payload:', payload);
  }
}

export class MockMessagingAdapter implements IMessagingAdapter {
  async sendMessage(to: string, message: string, templateId?: string): Promise<boolean> {
    console.log('[MockWhatsApp] Sending to', to, '| template:', templateId ?? 'none');
    console.log('[MockWhatsApp] Message:', message);
    return true;
  }
}

export class MockEmailAdapter implements IEmailAdapter {
  async sendEmail(to: string, subject: string, _body: string, _attachment?: Buffer): Promise<boolean> {
    console.log('[MockEmail] Sending to', to, '| subject:', subject);
    return true;
  }
}

export class MockSheetsAdapter implements ISheetsAdapter {
  private rows: unknown[][] = [];

  async appendRow(spreadsheetId: string, range: string, values: unknown[]): Promise<boolean> {
    this.rows.push(values);
    console.log('[MockSheets] Row appended to', spreadsheetId + '!' + range, '| Total rows:', this.rows.length);
    return true;
  }

  getRows(): unknown[][] {
    return this.rows;
  }
}

export class MockLLMAdapter implements ILLMAdapter {
  async generateDraft(_prompt: string, _contextData: unknown): Promise<string> {
    return [
      'Dear Supporter,',
      '',
      'Based on our campaigns, we funded 50 child-months of education [Src: tx1, tx3].',
      'Thank you for your Rs 25000 contribution [Src: tx2].',
    ].join('\n');
  }

  async extractClaims(text: string): Promise<number[]> {
    const matches = text.match(/\d+/g);
    return matches ? matches.map(Number) : [];
  }
}

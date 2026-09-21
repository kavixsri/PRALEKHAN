export interface IPaymentAdapter {
    verifyWebhookSignature(payload: string, signature: string, secret: string): boolean;
    processWebhook(payload: any): Promise<void>;
}

export interface IMessagingAdapter {
    sendMessage(to: string, message: string, templateId?: string): Promise<boolean>;
}

export interface IEmailAdapter {
    sendEmail(to: string, subject: string, body: string, attachment?: Buffer): Promise<boolean>;
}

export interface ISheetsAdapter {
    appendRow(spreadsheetId: string, range: string, values: any[]): Promise<boolean>;
}

export interface ILLMAdapter {
    generateDraft(prompt: string, contextData: any): Promise<string>;
    extractClaims(text: string): Promise<number[]>;
}

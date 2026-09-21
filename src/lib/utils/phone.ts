export function normalizePhone(phone: string | null | undefined): string | null {
    if (!phone) return null;
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return '+91' + cleaned;
    }
    if (cleaned.length === 12 && cleaned.startsWith('91')) {
        return '+' + cleaned;
    }
    if (cleaned.length === 11 && cleaned.startsWith('0')) {
        return '+91' + cleaned.substring(1);
    }
    return '+' + cleaned;
}

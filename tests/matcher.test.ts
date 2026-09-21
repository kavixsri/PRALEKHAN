import { describe, it, expect } from 'vitest';
import { ReconciliationService } from '../src/lib/services/reconciliation';

describe('Reconciliation Matcher', () => {
    it('matches exact amount and same date', () => {
        const bankTx = { amount: '500.00', date: '2026-09-20', ref: 'UPI123' };
        const donations = [
            { id: 'd1', amount: '500', date: '2026-09-20' },
            { id: 'd2', amount: '1000', date: '2026-09-20' }
        ];

        const result = ReconciliationService.matchTransaction(bankTx, donations);
        expect(result.status).toBe('matched');
        expect(result.donationId).toBe('d1');
    });

    it('flags for review if multiple matches within +/- 1 day', () => {
        const bankTx = { amount: '500.00', date: '2026-09-20', ref: 'UPI123' };
        const donations = [
            { id: 'd1', amount: '500', date: '2026-09-19' },
            { id: 'd2', amount: '500', date: '2026-09-21' }
        ];

        const result = ReconciliationService.matchTransaction(bankTx, donations);
        expect(result.status).toBe('review');
        expect(result.candidates?.length).toBe(2);
    });
});

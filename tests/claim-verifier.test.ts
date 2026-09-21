import { describe, it, expect } from 'vitest';
import { GroundedAIService } from '../src/lib/services/grounded-ai';

describe('Grounded AI Claim Verifier', () => {
    it('passes when all numbers in draft exist in source data', () => {
        const draft = "We funded 50 child-months with Rs 25000.";
        const sources = [50, 25000];
        const result = GroundedAIService.verifyClaims(draft, sources);
        
        expect(result.isVerified).toBe(true);
        expect(result.unverifiedClaims).toHaveLength(0);
    });

    it('flags numbers that do not exist in source data', () => {
        const draft = "We funded 50 child-months with Rs 30000.";
        const sources = [50, 25000];
        const result = GroundedAIService.verifyClaims(draft, sources);
        
        expect(result.isVerified).toBe(false);
        expect(result.unverifiedClaims).toContain(30000);
    });
});

import { normalizeName } from '../utils/name';
import { normalizePhone } from '../utils/phone';

export class IdentityService {
    // In a real implementation, this would take the Supabase client and query the DB.
    // For now, this demonstrates the logic flow.

    static async resolveDonor(dbClient: any, orgId: string, data: { name: string, phone?: string, email?: string, pan?: string }) {
        const normPhone = normalizePhone(data.phone);
        const normEmail = data.email?.toLowerCase().trim();
        const normName = normalizeName(data.name);

        console.log('[IdentityService] Resolving donor:', { normName, normPhone, normEmail });

        // Step 1: Exact match on identifiers (phone, email, PAN)
        // If exact match found -> Auto-merge (Return existing donor ID)
        
        // Step 2: Fuzzy match on name (using pg_trgm in DB)
        // If high confidence (> 0.9) -> Auto-merge
        // If medium confidence (0.5 - 0.9) -> Create merge_candidate
        
        // If no match or low confidence -> Create new donor
        
        return {
            action: 'create', // or 'auto_merge', 'queue_review'
            donorId: 'new-uuid', 
            confidenceScore: 0
        };
    }
}

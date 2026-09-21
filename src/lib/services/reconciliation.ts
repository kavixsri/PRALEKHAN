export class ReconciliationService {
    static matchTransaction(bankTx: any, donations: any[]) {
        // Find donation matching amount exactly, and date within +/- 1 day
        // And optionally fuzzy match on reference
        const txDate = new Date(bankTx.date);
        const txAmount = parseFloat(bankTx.amount);

        const candidates = donations.filter(d => {
            const dDate = new Date(d.date);
            const dAmount = parseFloat(d.amount);
            
            const daysDiff = Math.abs((txDate.getTime() - dDate.getTime()) / (1000 * 3600 * 24));
            return dAmount === txAmount && daysDiff <= 1;
        });

        if (candidates.length === 1) {
            return { status: 'matched', donationId: candidates[0].id, confidence: 'high' };
        } else if (candidates.length > 1) {
            return { status: 'review', candidates, confidence: 'medium' };
        }
        
        return { status: 'unmatched', confidence: 'low' };
    }
}

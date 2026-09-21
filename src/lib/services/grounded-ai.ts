export class GroundedAIService {
    static verifyClaims(draftContent: string, sourceDataNumbers: number[]) {
        const draftNumbers = draftContent.match(/\d+/g)?.map(Number) || [];
        
        const unverified = [];
        for (const num of draftNumbers) {
            if (!sourceDataNumbers.includes(num)) {
                unverified.push(num);
            }
        }

        return {
            isVerified: unverified.length === 0,
            unverifiedClaims: unverified
        };
    }
}

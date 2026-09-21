import { describe, it, expect } from 'vitest';
import { normalizeName } from '../src/lib/utils/name';
import { normalizePhone } from '../src/lib/utils/phone';

describe('Identity Resolution normalisation', () => {
    it('normalises Indian phone numbers to E.164', () => {
        expect(normalizePhone('9876543210')).toBe('+919876543210');
        expect(normalizePhone('+91 98765 43210')).toBe('+919876543210');
        expect(normalizePhone('09876543210')).toBe('+919876543210');
    });

    it('normalises name variants and whitespace', () => {
        expect(normalizeName('  Mohd   Ali  ')).toBe('mohammad ali');
        expect(normalizeName('Md. Sharmah')).toBe('mohammad sharma');
    });
});

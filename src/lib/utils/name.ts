export function normalizeName(name: string | null | undefined): string | null {
    if (!name) return null;
    let norm = name.normalize('NFKD').toLowerCase().replace(/[.,]/g, '').trim().replace(/\s+/g, ' ');
    
    const variants: Record<string, string> = {
        'mohd': 'mohammad',
        'md': 'mohammad',
        'muhammad': 'mohammad',
        'sharmah': 'sharma'
    };

    let parts = norm.split(' ').map(p => variants[p] || p);
    return parts.join(' ');
}

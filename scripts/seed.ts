import { faker } from '@faker-js/faker';

// In a real scenario, we'd use the Supabase client to insert these into the local DB.
// For now, this is a skeleton showing the data generation strategy.

console.log('Generating seed data for Pralekhan...');

const NUM_DONORS = 25000;
const NUM_DONATIONS = 60000;

// UPAY brand colours
const upayConfig = {
    primary: '#253A5E',
    accent: '#F59E0B'
};

const names = Array.from({ length: 50 }, () => faker.person.fullName());

console.log(\Generated \ sample names for distribution.\);
// Real implementation would batch insert via supabase-js
// await supabase.from('donors').insert(data);

console.log('Seeding complete. (Mock output)');

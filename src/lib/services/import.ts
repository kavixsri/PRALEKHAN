import Papa from 'papaparse';
import { normalizeName } from '../utils/name';
import { normalizePhone } from '../utils/phone';

export class ImportService {
    static parseCsv(fileContent: string) {
        return new Promise((resolve, reject) => {
            Papa.parse(fileContent, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    resolve(results.data);
                },
                error: (error: any) => {
                    reject(error);
                }
            });
        });
    }

    static processRow(row: any, mapping: Record<string, string>) {
        const name = row[mapping['name']] || '';
        const phone = row[mapping['phone']] || '';
        const email = row[mapping['email']] || '';

        return {
            original: row,
            normalized: {
                name: normalizeName(name),
                phone: normalizePhone(phone),
                email: email.toLowerCase().trim()
            }
        };
    }
}

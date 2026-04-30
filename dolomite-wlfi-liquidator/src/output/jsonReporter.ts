import fs from 'node:fs';
import { Candidate } from '../types.js';

export function saveJson(file: string, data: Candidate[]) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

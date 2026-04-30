import fs from 'node:fs';
import path from 'node:path';
import { StateFile } from '../types.js';

export class AccountStore {
  private state: StateFile;
  constructor(private file: string) {
    const dir = path.dirname(file);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    this.state = fs.existsSync(file)
      ? JSON.parse(fs.readFileSync(file, 'utf-8'))
      : { lastScannedBlock: 0, accounts: [] };
  }

  add(owner: string, accountNumber: bigint) {
    const key = `${owner.toLowerCase()}-${accountNumber}`;
    const exists = this.state.accounts.some((a) => `${a.owner}-${a.accountNumber}` === key);
    if (!exists) this.state.accounts.push({ owner: owner.toLowerCase(), accountNumber: accountNumber.toString() });
  }

  setLastScannedBlock(b: number) { this.state.lastScannedBlock = b; }
  getLastScannedBlock() { return this.state.lastScannedBlock; }
  getAccounts() { return this.state.accounts; }
  save() { fs.writeFileSync(this.file, JSON.stringify(this.state, null, 2)); }
}

import { validateConfig, CONFIG } from './config.js';
import { runScanner } from './scanner/wlfiScanner.js';
import { printCandidates } from './output/consoleReporter.js';

async function main() {
  validateConfig();
  const c = await runScanner();
  printCandidates(c, CONFIG.topN);
}

main().catch((e) => { console.error(e); process.exit(1); });

import assert from 'node:assert';
import { calcHealthApprox, getRiskBand } from '../src/scanner/riskEngine.js';
import { fmtUnits, shortAddress } from '../src/utils/format.js';

const h = calcHealthApprox(100, 80, 0.15);
assert.ok(h > 1.08 && h < 1.09);
assert.equal(getRiskBand(0.99), 'LIQUIDATABLE');
assert.equal(getRiskBand(1.005), 'CRITICAL');
assert.equal(getRiskBand(1.02), 'HIGH');
assert.equal(getRiskBand(1.05), 'WATCH');
assert.equal(getRiskBand(1.12), 'SAFE');
assert.equal(shortAddress('0x1234567890123456789012345678901234567890'), '0x1234...7890');
assert.equal(fmtUnits(1_500_000n, 6, 2), '1.50');
console.log('All tests passed');

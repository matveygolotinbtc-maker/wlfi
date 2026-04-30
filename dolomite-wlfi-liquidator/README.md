# Dolomite WLFI Liquidation Scanner (Phase 1 Read-only)

Read-only scanner for Ethereum Mainnet Dolomite positions with WLFI collateral and debt in USD1/USDC/USDT. No transaction sending, no `PRIVATE_KEY` required.

## Features
- Indexes DolomiteMargin logs with resume support (`lastScannedBlock`).
- Extracts unique `(owner, accountNumber)` pairs.
- Evaluates accounts via official getters.
- Computes `healthApprox = suppliedAdjusted / (borrowedAdjusted * (1 + marginRatio))`.
- Risk bands: `LIQUIDATABLE`, `CRITICAL`, `HIGH`, `WATCH`, `SAFE`.
- Prints top-N risky accounts via `console.table` and saves JSON artifacts.

## Config
Copy `.env.example` to `.env`:

```bash
RPC_URL=
START_BLOCK=
LOG_CHUNK=5000
POLL_MS=15000
ONLY_WLFI=true
TOP_N=30
STATE_FILE=./data/state.json
CANDIDATES_FILE=./data/candidates.json
NETWORK=ethereum
```

### START_BLOCK guidance
Set `START_BLOCK` to a block where Dolomite WLFI activity starts (or earlier for full history). Lower start blocks increase initial indexing time.

## Run locally
```bash
npm install
npm run scan
```

## Replit / Railway
1. Create Node.js service.
2. Set env vars (`RPC_URL`, `START_BLOCK`, etc.).
3. Start command: `npm run scan`.
4. Persist `./data` volume so state resumes after restart.

## Output files
- `data/state.json`: indexed accounts + `lastScannedBlock`.
- `data/candidates.json`: ranked candidate accounts.
- `data/full_accounts.json`: full indexed account keys.

## Health approximation warning
`healthApprox` is an approximation for triage/monitoring. Final liquidation eligibility must be verified right before execution, ideally with protocol `staticCall` and fresh state/oracle checks.

## Phase 2 / 3 scaffolding
- `src/future/liquidationSimulator.ts`: dry-run plan generator (no tx).
- `src/future/liquidationExecutor.stub.ts`: secure execution interface stub only.

## Safety
- Never commit `.env`.
- Execution disabled by default.
- Liquidation bot can lose money due to gas, MEV, slippage, failed tx, and stale oracle data.

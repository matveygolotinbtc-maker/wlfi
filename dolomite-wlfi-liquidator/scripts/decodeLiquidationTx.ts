import { Contract, Interface, JsonRpcProvider } from 'ethers';
import { DOLOMITE_MARGIN_ABI } from '../src/abis/dolomiteMargin.js';
import { ADDRESSES } from '../src/addresses.js';

const txHash = process.argv[2];
const rpc = process.env.RPC_URL;
if (!txHash || !rpc) throw new Error('Usage: RPC_URL=... npm run decode:liquidation -- <txHash>');

async function run() {
  const p = new JsonRpcProvider(rpc);
  const r = await p.getTransactionReceipt(txHash);
  if (!r) throw new Error('Receipt not found');
  const iface = new Interface(DOLOMITE_MARGIN_ABI);
  const liquid = r.logs.find((l) => l.address.toLowerCase() === ADDRESSES.DOL_MARGIN.toLowerCase() && l.topics[0] === iface.getEvent('LogLiquidate')?.topicHash);
  if (!liquid) throw new Error('No LogLiquidate in tx');
  const parsed = iface.parseLog(liquid)!;
  const a: any = parsed.args;
  console.log(JSON.stringify({
    liquidator: a.solidAccountOwner ?? a[0],
    liquidated: a.liquidAccountOwner ?? a[2],
    heldMarket: Number(a.heldMarket ?? a[4]),
    owedMarket: Number(a.owedMarket ?? a[5]),
    debtRepaid: (a.solidOwedUpdateWei ?? a[7]).toString(),
    collateralSeized: (a.solidHeldUpdateWei ?? a[6]).toString(),
    effectiveProtocolLiquidationPrice: 'TODO',
    actualSwapOutput: 'TODO',
    estimatedGrossProfitUsd: 'TODO',
    estimatedNetProfitUsd: 'TODO'
  }, null, 2));
}
run();

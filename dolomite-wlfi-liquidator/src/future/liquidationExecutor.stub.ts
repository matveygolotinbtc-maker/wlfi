export type ExecuteInput = {
  enableExecution: boolean;
  privateKey?: string;
  minExpectedProfitUsd: number;
  staticCallOk: boolean;
  gasLimit: bigint;
  maxFeePerGas: bigint;
  maxPriorityFeePerGas: bigint;
  killSwitch: boolean;
};

export async function executeLiquidation(_plan: unknown, input: ExecuteInput): Promise<void> {
  if (input.killSwitch) throw new Error('Kill switch enabled');
  if (!input.enableExecution) throw new Error('ENABLE_EXECUTION=true required');
  if (!input.privateKey) throw new Error('PRIVATE_KEY required');
  if (!input.staticCallOk) throw new Error('successful staticCall required');
  if (input.minExpectedProfitUsd <= 0) throw new Error('minExpectedProfitUsd must be set');
  throw new Error('Execution stub only. TODO: implement safe tx sending with full controls.');
}

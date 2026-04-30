export const ADDRESSES = {
  DOL_MARGIN: '0x003Ca23Fd5F0ca87D01F6eC6CD14A8AE60c2b97D',
  WLFI: '0xda5e1988097297dcdc1f90d4dfe7909e847cbef6'
} as const;

export const MARKET_IDS = {
  USD1: 1,
  USDC: 2,
  USDT: 5,
  WLFI: 13
} as const;

export const KNOWN_MARKET_TOKEN: Record<number, string> = {
  [MARKET_IDS.USD1]: 'USD1',
  [MARKET_IDS.USDC]: 'USDC',
  [MARKET_IDS.USDT]: 'USDT',
  [MARKET_IDS.WLFI]: 'WLFI'
};

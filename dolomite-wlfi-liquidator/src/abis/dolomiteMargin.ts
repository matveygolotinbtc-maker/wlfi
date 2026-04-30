export const DOLOMITE_MARGIN_ABI = [
  'function getAccountMarketsWithBalances((address owner,uint256 number) account) view returns (uint256[])',
  'function getAccountNumberOfMarketsWithDebt((address owner,uint256 number) account) view returns (uint256)',
  'function getAdjustedAccountValues((address owner,uint256 number) account) view returns ((uint256 value) supply,(uint256 value) borrow)',
  'function getMarginRatioForAccount((address owner,uint256 number) account) view returns ((uint256 value) marginRatio)',
  'function getAccountBalances((address owner,uint256 number) account) view returns (uint256[] markets,(bool,uint128)[] tokenPar,(bool,uint128)[] tokenWei)',
  'function getMarketIdByTokenAddress(address token) view returns (uint256)',
  'function getMarketPrice(uint256 marketId) view returns ((uint256 value) price)',
  'event LogDeposit(address indexed accountOwner,uint256 indexed accountNumber,address indexed from,uint256 market,uint256 updateWei)',
  'event LogWithdraw(address indexed accountOwner,uint256 indexed accountNumber,address indexed to,uint256 market,uint256 updateWei)',
  'event LogTransfer(address indexed accountOneOwner,uint256 indexed accountOneNumber,address indexed accountTwoOwner,uint256 accountTwoNumber,uint256 market,uint256 updateWei)',
  'event LogBuy(address indexed accountOwner,uint256 indexed accountNumber,uint256 takerMarket,uint256 makerMarket,uint256 takerUpdateWei,uint256 makerUpdateWei)',
  'event LogSell(address indexed accountOwner,uint256 indexed accountNumber,uint256 takerMarket,uint256 makerMarket,uint256 takerUpdateWei,uint256 makerUpdateWei)',
  'event LogTrade(address indexed takerAccountOwner,uint256 indexed takerAccountNumber,address indexed makerAccountOwner,uint256 makerAccountNumber,uint256 inputMarket,uint256 outputMarket,uint256 takerInputUpdateWei,uint256 takerOutputUpdateWei,uint256 makerInputUpdateWei,uint256 makerOutputUpdateWei)',
  'event LogCall(address indexed accountOwner,uint256 indexed accountNumber,address callee)',
  'event LogLiquidate(address indexed solidAccountOwner,uint256 indexed solidAccountNumber,address indexed liquidAccountOwner,uint256 liquidAccountNumber,uint256 heldMarket,uint256 owedMarket,uint256 solidHeldUpdateWei,uint256 solidOwedUpdateWei,uint256 liquidHeldUpdateWei,uint256 liquidOwedUpdateWei)',
  'event LogVaporize(address indexed solidAccountOwner,uint256 indexed solidAccountNumber,address indexed vaporAccountOwner,uint256 vaporAccountNumber,uint256 heldMarket,uint256 owedMarket,uint256 solidHeldUpdateWei,uint256 solidOwedUpdateWei,uint256 vaporOwedUpdateWei)'
] as const;

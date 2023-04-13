import { bscTokens } from './tokens'
import { SerializedFarmConfig } from './types'

const priceHelperLps: SerializedFarmConfig[] = [
  /**
   * These LPs are just used to help with price calculation for MasterChef LPs (farms.ts).
   * This list is added to the MasterChefLps and passed to fetchFarm. The calls to get contract information about the token/quoteToken in the LP are still made.
   * The absence of a PID means the masterchef contract calls are skipped for this farm.
   * Prices are then fetched for all farms (masterchef + priceHelperLps).
   * Before storing to redux, farms without a PID are filtered out.
   */
  {
    pid: null,
    lpSymbol: 'HERB-TARA LP',
    lpAddresses: {
      97: '',
      841: '0x2D7a8Cc45591dCDC3cb86f003785b29a6F5BEf03',
    },
    token: bscTokens.cake,
    quoteToken: bscTokens.wbnb,
  },
  {
    pid: null,
    lpSymbol: 'TARA-BUSD LP',
    lpAddresses: {
      97: '',
      841: '0x13227e215400E884CAbBE6AD525AE112806E4b4d',
    },
    token: bscTokens.wbnb,
    quoteToken: bscTokens.busd,
  },
]

export default priceHelperLps

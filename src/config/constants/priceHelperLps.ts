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
      4002: '0xeDC6b4E60C33db1CB2A9A6a26d4bd0D9f2958b8d',
    },
    token: bscTokens.cake,
    quoteToken: bscTokens.wbnb,
  },
  {
    pid: null,
    lpSymbol: 'TARA-BUSD LP',
    lpAddresses: {
      97: '',
      4002: '0xe25CB73b37069a2Fb001e75328ED092552045607',
    },
    token: bscTokens.wbnb,
    quoteToken: bscTokens.busd,
  },
]

export default priceHelperLps

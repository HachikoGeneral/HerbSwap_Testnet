import {
  MenuItemsType,
  DropdownMenuItemType,
  SwapIcon,
  SwapFillIcon,
  EarnFillIcon,
  EarnIcon,
  MoreIcon,
} from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'
import { DropdownMenuItems } from '@pancakeswap/uikit/src/components/DropdownMenu/types'
import { ChainId } from '@pancakeswap/sdk'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean }
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean } & {
  items?: ConfigMenuDropDownItemsType[]
}

const filterItemBySupportChainId = (item, chainId) => {
  return !chainId || !item.supportChainIds ? true : item.supportChainIds?.includes(chainId)
}

const config: (
  t: ContextApi['t'],
  isDark: boolean,
  languageCode?: string,
  chainId?: number,
) => ConfigMenuItemsType[] = (t, isDark, languageCode, chainId) =>
  [
    {
      label: t('Trade'),
      icon: SwapIcon,
      fillIcon: SwapFillIcon,
      href: '/swap',
      showItemsOnMobile: false,
      items: [
        {
          label: t('Swap'),
          href: '/swap',
        },
        {
          label: t('Liquidity'),
          href: '/liquidity',
        },
        // {
        //   label: t('Transfer'),
        //   href: '/transfer',
        // },
      ].filter((item) => filterItemBySupportChainId(item, chainId)),
    },
    {
      label: t('Earn'),
      href: '/farms',
      icon: EarnIcon,
      fillIcon: EarnFillIcon,
      supportChainIds: [ChainId.BSC],
      items: [
        {
          label: t('Farms'),
          href: '/farms',
        },
        {
          label: t('Pools'),
          href: '/pools',
        },
      ],
    },
    {
      label: '',
      href: '/info',
      icon: MoreIcon,
      hideSubNav: true,
      supportChainIds: [ChainId.BSC],
      items: [
  /**      {
          label: t('Info'),
          href: '/info',
        },
        {
          type: DropdownMenuItemType.DIVIDER,
        }, */
        {
          label: t('Blog'),
          href: 'https://medium.com/@HerbSwap',
          type: DropdownMenuItemType.EXTERNAL_LINK,
        },
        {
          label: t('All about Taraxa'),
          href: 'https://www.taraxa.io/infrastructure/#section_use_case',
          type: DropdownMenuItemType.EXTERNAL_LINK,
        },
      ],
    },
  ].filter((item) => filterItemBySupportChainId(item, chainId))

export default config

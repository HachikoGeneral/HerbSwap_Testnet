import { FooterLinkType } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('About'),
    items: [
      {
        label: t('Brand'),
        href: 'https://docs.pancakeswap.finance/brand',
      },
      {
        label: t('Blog'),
        href: 'https://medium.com/pancakeswap',
      },
      {
        label: t('Community'),
        href: 'https://docs.pancakeswap.finance/contact-us/telegram',
      },
      {
        label: t('Litepaper'),
        href: 'https://v2litepaper.pancakeswap.finance/',
      },
    ],
  },
  {
    label: t('Developers'),
    items: [
      {
        label: 'Github',
        href: 'https://github.com/pancakeswap',
      },
      {
        label: t('Audits (coming soon)'),
        href: '',
      },
    ],
  },
]

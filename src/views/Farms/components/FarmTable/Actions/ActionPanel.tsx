import { AddIcon, Button, IconButton, MinusIcon, Skeleton, useModal } from '@pancakeswap/uikit'
import styled, { keyframes, css } from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { LinkExternal, Text, useMatchBreakpointsContext } from '@pancakeswap/uikit'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { getAddress } from 'utils/addressHelpers'
import { getBscScanLink } from 'utils'
import { FarmWithStakedValue } from '../../types'
import useCatchTxError from 'hooks/useCatchTxError'
import HarvestAction from './HarvestAction'
import StakedAction from './StakedAction'
import Apr, { AprProps } from '../Apr'
import Multiplier, { MultiplierProps } from '../Multiplier'
import Liquidity, { LiquidityProps } from '../Liquidity'
import { useCallback } from 'react'
import useApproveFarm from '../../../hooks/useApproveFarm'
import { useERC20 } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import { useWeb3React } from '@web3-react/core'
import { pid } from 'process'



export interface ActionPanelProps {
  apr: AprProps
  multiplier: MultiplierProps
  liquidity: LiquidityProps
  details: FarmWithStakedValue
  userDataReady: boolean
  expanded: boolean
}
const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 500px;
  }
`

const collapseAnimation = keyframes`
  from {
    max-height: 500px;
  }
  to {
    max-height: 0px;
  }
`

const Container = styled.div<{ expanded }>`
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 300ms linear forwards
        `
      : css`
          ${collapseAnimation} 300ms linear forwards
        `};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.dropdown};
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  padding: 24px;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    padding: 16px 32px;
  }
`

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
`

const StakeContainer = styled.div`
  color: ${({ theme }) => theme.colors.text};
  align-items: center;
  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
  }
`

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0;
  }
`

const InfoContainer = styled.div`
  min-width: 200px;
`

const ValueContainer = styled.div``

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0px;
`

const ActionPanel: React.FunctionComponent<ActionPanelProps> = ({
  details,
  apr,
  multiplier,
  liquidity,
  userDataReady,
  expanded,
  
}) => {
  const farm = details

  const { isDesktop } = useMatchBreakpointsContext()

  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()
  const isActive = farm.multiplier !== '0X'
  const { quoteToken, token } = farm
  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('HERBSWAP', '')
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: quoteToken.address,
    tokenAddress: token.address,
  })
  const lpAddress = getAddress(farm.lpAddresses)
  const { account } = useWeb3React()
  const lpContract = useERC20(lpAddress)
  const bsc = getBscScanLink(lpAddress, 'address')
  const info = `/info/pool/${lpAddress}`
  const { onApprove } = useApproveFarm(lpContract)
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const dispatch = useAppDispatch()
  
  const { toastSuccess } = useToast()
  
  const handleApprove = useCallback(async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return onApprove()
    })
    if (receipt?.status) {
      toastSuccess(t('Contract Enabled'), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
      dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
    }
  }, [onApprove, dispatch, account, t, toastSuccess, fetchWithCatchTxError])

  return (
    <Container expanded={expanded}>
      <InfoContainer>
        <ValueContainer>
          {farm.isCommunity && farm.auctionHostingEndDate && (
            <ValueWrapper>
              <Text>{t('Auction Hosting Ends')}</Text>
              <Text paddingLeft="4px">
                {new Date(farm.auctionHostingEndDate).toLocaleString(locale, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </Text>
            </ValueWrapper>
          )}
          {!isDesktop && (
            <>
              <ValueWrapper>
                <Text>{t('APR')}</Text>
                <Apr {...apr} />
              </ValueWrapper>
              <ValueWrapper>
                <Text>{t('Multiplier')}</Text>
                <Multiplier {...multiplier} />
              </ValueWrapper>
              <ValueWrapper>
                <Text>{t('Liquidity')}</Text>
                <Liquidity {...liquidity} />
              </ValueWrapper>
            </>
          )}
        </ValueContainer>
        {isActive && (
          <StakeContainer>
            <StyledLinkExternal href={`/add/${liquidityUrlPathParts}`}>
              {t('Get %symbol%', { symbol: lpLabel })}
            </StyledLinkExternal>
          </StakeContainer>
        )}
        <StyledLinkExternal href={bsc}>{t('View Contract')}</StyledLinkExternal>
        <StyledLinkExternal href="https://herbswap.app/swap">{t('See Pair Info (coming soon)')}</StyledLinkExternal>
        <Button width="100%" disabled={pendingTx} onClick={handleApprove} variant="secondary">
          {t('increase allowance')}
        </Button>
      </InfoContainer>
      <ActionContainer>
        <HarvestAction {...farm} userDataReady={userDataReady} />
        <StakedAction {...farm} userDataReady={userDataReady} lpLabel={lpLabel} displayApr={apr.value} />
      </ActionContainer>
    </Container>
  )    /** change herbswap link to {infoAddress} when info site is ready */
}

export default ActionPanel

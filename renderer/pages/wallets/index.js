import React, {useEffect} from 'react'
import {rem} from 'polished'
import theme from '../../shared/theme'
import Layout from '../../shared/components/layout'
import {Box, Drawer, Heading} from '../../shared/components'

import Flex from '../../shared/components/flex'
import Actions from '../../shared/components/actions'
import IconLink from '../../shared/components/icon-link'

import TotalAmount from '../../screens/wallets/components/total-amount'
import WalletList from '../../screens/wallets/components/wallet-list'
import WalletActions from '../../screens/wallets/components/wallet-actions'
import TransferForm from '../../screens/wallets/components/transfer-form'
import ReceiveForm from '../../screens/wallets/components/receive-form'

import Loading from '../../shared/components/loading'
import useWallets from '../../shared/utils/useWallets'

export default function Index() {
  const {wallets, totalAmount, fetching} = useWallets()

  const [isTransferFormOpen, setIsTransferFormOpen] = React.useState(false)
  const [
    isRWithdrawStakeFormOpen,
    setIsRWithdrawStakeFormOpen,
  ] = React.useState(false)

  const handleCloseTransferForm = () => setIsTransferFormOpen(false)

  const [isReceiveFormOpen, setIsReceiveFormOpen] = React.useState(false)
  const handleCloseReceiveForm = () => setIsReceiveFormOpen(false)

  const [activeWallet, setActiveWallet] = React.useState()

  useEffect(() => {
    if (!activeWallet) {
      setActiveWallet(wallets.length > 0 ? wallets[0] : null)
    }
  }, [activeWallet, wallets])

  return (
    <Layout>
      <Box px={theme.spacings.xxxlarge} py={theme.spacings.large}>
        <Heading>Wallets</Heading>
        <Box>
          {fetching ? (
            <Loading color={theme.colors.text} />
          ) : (
            <>
              <Flex css={{justifyContent: 'space-between', marginBottom: 24}}>
                <div>
                  <TotalAmount
                    amount={totalAmount}
                    percentChanges={-0.48}
                    amountChanges={-122}
                  />
                </div>
                <div>
                  <Actions>
                    <IconLink
                      disabled={activeWallet && activeWallet.isStake}
                      icon={<i className="icon icon--withdraw" />}
                      onClick={() => {
                        setIsTransferFormOpen(!isTransferFormOpen)
                      }}
                    >
                      Send
                    </IconLink>
                    <IconLink
                      disabled={activeWallet && activeWallet.isStake}
                      icon={<i className="icon icon--deposit" />}
                      onClick={() => {
                        setIsReceiveFormOpen(!isReceiveFormOpen)
                      }}
                    >
                      Receive
                    </IconLink>
                    {/*
                      <IconLink icon={<i className="icon icon--add_btn" />}>
                          New wallet
                      </IconLink>
                    */}
                  </Actions>
                </div>
              </Flex>
              <div>
                <WalletList
                  wallets={wallets}
                  activeWallet={activeWallet}
                  onChangeActiveWallet={wallet => setActiveWallet(wallet)}
                  onSend={() => setIsTransferFormOpen(true)}
                  onReceive={() => setIsReceiveFormOpen(true)}
                  onWithdrawStake={() => setIsRWithdrawStakeFormOpen(true)}
                />
              </div>
              <h3
                style={{
                  fontWeight: 500,
                  fontSize: rem(24),
                  letterSpacing: 0,
                  marginBottom: rem(19),
                  marginTop: 0,
                  color: theme.colors.primary2,
                }}
              >
                Recent transactions
              </h3>

              <WalletActions />
            </>
          )}
        </Box>
        <Drawer show={isTransferFormOpen} onHide={handleCloseTransferForm}>
          <TransferForm
            onSuccess={handleCloseTransferForm}
            onFail={handleCloseTransferForm}
          />
        </Drawer>

        <Drawer show={isReceiveFormOpen} onHide={handleCloseReceiveForm}>
          <ReceiveForm address={wallets[0] && wallets[0].address} />
        </Drawer>
      </Box>
    </Layout>
  )
}

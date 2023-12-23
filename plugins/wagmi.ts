import { UseWagmiPlugin, configureChains, createConfig } from 'use-wagmi'
import { sepolia } from 'use-wagmi/chains'

import { MetaMaskConnector } from 'use-wagmi/connectors/metaMask'
import { CoinbaseWalletConnector } from 'use-wagmi/connectors/coinbaseWallet'

import { alchemyProvider } from 'use-wagmi/providers/alchemy'
import { publicProvider } from 'use-wagmi/providers/public'

export default defineNuxtPlugin((nuxtApp) => {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [sepolia],
    [
      alchemyProvider({ apiKey: '47VVws6UUDQb0XaCxKw1qC2boRkc' }),
      publicProvider(),
    ],
  )

  const config = createConfig({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({
        chains,
        options: {
          UNSTABLE_shimOnConnectSelectAccount: true,
        },
      }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: '',
        },
      }),
    ],
    publicClient,
    webSocketPublicClient,
  })

  nuxtApp.vueApp.use(UseWagmiPlugin, config)
})
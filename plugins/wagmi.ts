import { UseWagmiPlugin } from 'use-wagmi'

import { http, createConfig } from '@wagmi/core'
import { localhost, sepolia } from '@wagmi/core/chains'

const config = createConfig({
  chains: [localhost, sepolia],
  connectors: [
  ],
  transports: {
    [localhost.id]: http(),
    [sepolia.id]: http(),
  },
})

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(UseWagmiPlugin, {config});
})
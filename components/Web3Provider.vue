<script setup lang="ts">
import { useDappStore } from '@/stores/useDappStore'
import { storeToRefs } from 'pinia'
import { ethers } from 'ethers'

import { MetaMaskConnector, useWalletStore } from '@vue-dapp/core'
import { Board } from '@vue-dapp/vd-board'
import '@vue-dapp/vd-board/dist/style.css'

import { WalletConnectConnector } from '@vue-dapp/walletconnect'

const dappStore = useDappStore()
const { isConnected, user } = storeToRefs(dappStore)

const pinia = usePinia()
const { onActivated, onChanged, onDeactivated } = useWalletStore(pinia)

onActivated(async ({ address, provider, chainId }) => {
	const ethersProvider = new ethers.BrowserProvider(provider)
	const signer = await ethersProvider.getSigner()

	dappStore.setUser({
		address,
		signer,
		chainId: chainId,
	})
})

onChanged(async ({ address, provider, chainId }) => {
	const ethersProvider = new ethers.BrowserProvider(provider)
	const signer = await ethersProvider.getSigner()

	dappStore.setUser({
		address,
		signer,
		chainId,
	})
})

onDeactivated(() => {
	dappStore.resetUser()
})

const connectors = [
	new MetaMaskConnector(),
	new WalletConnectConnector({
		projectId: '3f3c98042b194264687bf59e104c534a',
		chains: [1],
		showQrModal: true,
		qrModalOptions: {
			themeMode: 'dark',
			themeVariables: undefined,
			chainImages: undefined,
			desktopWallets: undefined,
			walletImages: undefined,
			mobileWallets: undefined,
			enableExplorer: true,
			explorerAllowList: undefined,
			tokenImages: undefined,
			privacyPolicyUrl: undefined,
			explorerDenyList: undefined,
			termsOfServiceUrl: undefined,
		},
	}),
]

function connectErrorHandler(err: any) {
	console.error('ConnectError', err)
}
function autoConnectErrorHandler(err: any) {
	console.error('AutoConnectError', err)
}

watch(
	() => dappStore.network,
	() => {
		console.log('Network changed')
	},
)

watch(isConnected, () => {
	if (isConnected.value) {
		console.log('Wallet connected', user.value)
	} else {
		console.log('Wallet disconnected', user.value)
	}
})
</script>

<template>
	<div>
		<slot />

		<Board
			:connectors="connectors"
			dark
			:autoConnectErrorHandler="autoConnectErrorHandler"
			:connectErrorHandler="connectErrorHandler"
		/>
	</div>
</template>

<style lang="scss"></style>

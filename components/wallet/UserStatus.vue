<script setup lang="ts">
import { storeToRefs } from 'pinia'
import copy from 'copy-to-clipboard'
import { useDappStore } from '@/stores/useDappStore'
import { useBoardStore } from '@vue-dapp/vd-board'
import { shortenAddress, useWalletStore } from '@vue-dapp/core'

const pinia = usePinia()
const { open } = useBoardStore(pinia)
const walletStore = useWalletStore(pinia)
const { disconnect } = walletStore
const { connector, status, isConnected } = storeToRefs(walletStore)

const dappStore = useDappStore()
const { isNetworkUnmatched, user } = storeToRefs(dappStore)

async function onSwitchChain() {
	try {
		if (connector.value) {
			await connector.value.switchChain?.(dappStore.chainId)
		}
	} catch (err: any) {
		console.error(err)
	}
}
</script>

<template>
	<v-btn v-if="isConnected" @click="copy(user.address)">
		<p v-if="isNetworkUnmatched">Network Unmatched</p>
		<p v-else> {{ shortenAddress(user.address) }}</p>
		<Icon
			name="i-ic-baseline-content-copy"
			v-if="!isNetworkUnmatched"
		/>
	</v-btn>

	<v-btn v-if="!isConnected" @click="open()" :disabled="status === 'connecting'">
		{{ status === 'connecting' ? 'Connecting...' : '' }}
		<Icon name="i-octicon-plug-24" v-if="status !== 'connecting'" />     
	</v-btn>

	<v-btn v-else @click="disconnect">
		<Icon name="i-ic:baseline-logout" />
	</v-btn>
</template>

<style lang="scss"></style>
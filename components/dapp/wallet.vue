<script setup lang="ts">
	import { switchChain } from '@wagmi/core'
	import { useClipboard } from '@vueuse/core'

	const config = useConfig()
	const { isConnected, address, chain } = useAccount()
	const { disconnect } = useDisconnect()

	const { copy } = useClipboard();

	const openBoard = inject('openBoard');

	function ChainName(chainId: number): string {
		for (const chain of config.chains) {
			if (chain.id === chainId) {
				return chain.name
			}
		}
		return "Unknown"
	}
</script>

<template>
    <v-btn-group
      rounded="xl"
    >
		<v-menu location="bottom">
			<template v-slot:activator="{ props }">
				<v-btn v-bind="props"> {{ chain?.name || ChainName(config.state.chainId) }} <v-icon icon="mdi-chevron-down"></v-icon></v-btn>
			</template>
			<v-list>
				<v-list-item v-for="chain in config.chains" :key="chain.id" @click="switchChain(config, {chainId: chain.id})">
					<v-list-item-title>{{ chain.name }}</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>

		<v-btn v-if="isConnected" @click="copy(address)">
			{{ address && address.slice(0, 6) + '...' + address.slice(-4) }}
			<v-icon icon="mdi-content-copy" />
		</v-btn>

		<v-btn v-if=!isConnected @click=openBoard>
			Connect
			<v-icon icon="mdi-login" />
		</v-btn>
		<v-btn v-if=isConnected @click=disconnect>
			<v-icon icon="mdi-logout"  />
		</v-btn>

	</v-btn-group>
</template>

<style lang="scss"></style>
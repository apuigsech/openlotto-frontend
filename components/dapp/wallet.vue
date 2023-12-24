<script setup lang="ts">
	const { chain, chains } = useNetwork()
	const { address, isConnected } = useAccount()
	const { disconnect } = useDisconnect()
	const { switchNetwork } = useSwitchNetwork()

	import { useClipboard } from '@vueuse/core'
	const { copy } = useClipboard();

	const openBoard = inject('openBoard');
</script>

<template>
    <v-btn-group
      rounded="xl"
    >
		<v-menu v-if="isConnected" location="bottom">
			<template v-slot:activator="{ props }">
				<v-btn v-bind="props"> {{ chain && chain.name }} <v-icon icon="mdi-chevron-down"></v-icon></v-btn>
			</template>
			<v-list>
				<v-list-item v-for="chain in chains" :key="chain.id" @click="switchNetwork(chain.id)">
					<v-list-item-title>{{ chain.name }}</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>

		<v-btn v-if="isConnected" @click="copy(address)">
			{{ address && address.slice(0, 6) + '...' + address.slice(-4) }}
			<v-icon icon="mdi-content-copy" />
		</v-btn>

		<v-btn v-if="!isConnected" @click=openBoard>
			Connect
			<v-icon icon="mdi-login" />
		</v-btn>
		<v-btn v-else @click="disconnect">
			<v-icon icon="mdi-logout" />
		</v-btn>

	</v-btn-group>
</template>

<style lang="scss"></style>
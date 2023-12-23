<script setup lang="ts">
    import { Connector } from 'use-wagmi';
    const props = defineProps({
        connector: Connector
    });
</script>

<template>
	<MetaMaskLogo v-if="props.connector.id === 'metaMask'" class="logo" />
	<WalletConnectLogo v-if="props.connector.id === 'walletConnect'" class="logo" />
	<CoinbaseWalletLogo v-if="props.connector.id === 'coinbaseWallet'"  class="logo" />
	<GnosisSafeLogo v-if="props.connector.id === 'safe'" class="logo" />
</template>

<style lang="scss">
	.logo {
		width: 50px;
		height: 50px;
	}
</style>
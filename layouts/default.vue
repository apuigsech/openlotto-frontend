<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { APP_NAME } from '@/constants';
import { useDappStore } from '@/stores/useDappStore';

const dappStore = useDappStore();

onMounted(() => {
	dappStore.syncBlockNumber(5000);
});

onUnmounted(() => {
	dappStore.unsyncBlockNumber();
});
</script>

<template>
	<Web3Provider>
		<v-app>
    		<v-app-bar>
				<v-app-bar-title>
					<NuxtLink to="/">{{ APP_NAME }}</NuxtLink>
				</v-app-bar-title>
				#{{ dappStore.blockNumber }}
				<Wallet />
			</v-app-bar>

			<v-main><slot /></v-main>
		</v-app>
	</Web3Provider>
</template>

<script lang="ts" setup>
import { APP_NAME } from '@/constants';
import { networkOptions, useDappStore } from '@/stores/useDappStore';

const dappStore = useDappStore();
</script>

<template>
  <v-app>
    <v-app-bar>
		<v-app-bar-title>
			<NuxtLink to="/">{{ APP_NAME }}</NuxtLink>
		</v-app-bar-title>
		<v-app-bar-items>
			<Web3Provider>
				<Wallet />
			</Web3Provider>
  		</v-app-bar-items>
	</v-app-bar>

    <v-main>
		<slot />
    </v-main>

  </v-app>
</template>

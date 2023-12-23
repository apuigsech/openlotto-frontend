<script lang="ts" setup>
	const blockNumber = ref(0);

    useBlockNumber({
        watch: true,
		onBlock(n) {
			blockNumber.value = Number(n);
		}
    })
</script>

<template>
	<dapp>
    	<v-app-bar>
			<v-app-bar-title>
				<NuxtLink to="/">OpenLotto</NuxtLink>
			</v-app-bar-title>
			#{{ blockNumber }}
            <wallet />
		</v-app-bar>
		<v-main>
			<slot />
		</v-main>
	</dapp>
</template>

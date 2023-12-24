<script lang="ts" setup>
    const blockNumber = useBlockNumber({
        // watch: true,
    });	
</script>

<template>
	<dapp>
    	<v-app-bar>
			<v-app-bar-title>
				<NuxtLink to="/">OpenLotto</NuxtLink>
			</v-app-bar-title>
			#{{ blockNumber.data.value }}
            <wallet />
		</v-app-bar>
		<v-main>
			<slot />
		</v-main>
	</dapp>
</template>

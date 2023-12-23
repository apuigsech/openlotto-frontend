<script lang="ts" setup>
</script>

<template>
	<dapp>
    	<v-app-bar>
			<v-app-bar-title>
				<NuxtLink to="/">OpenLotto</NuxtLink>
			</v-app-bar-title>
            <wallet />
		</v-app-bar>
		<v-main>
			<slot />
		</v-main>
	</dapp>
</template>

<script lang="ts" setup>
    import { watchBlockNumber } from '@wagmi/core';

    const config = useConfig()

    const blockNumber = ref(0);

    onMounted(async () => {
        const unwatch = await watchBlockNumber(config, {
            onBlockNumber(n) {
                blockNumber.value = n;
            }
        });
    });

    onUnmounted(() => {
        unwatch();
    });
</script>

<template>
    <dapp>
        <v-app>
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
        </v-app>
    </dapp>
</template>

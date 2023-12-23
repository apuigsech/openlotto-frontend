<script setup lang="ts">
    import { watchNetwork } from '@wagmi/core'

    const unwatch = watchNetwork((network) => {
        if (network.chain) {
            closeBoard();
        }
    })

    const showBoard = ref(false);

    function openBoard() {
        showBoard.value = true;
    }
    function closeBoard() {
        showBoard.value = false;
    }

    provide('showBoard', showBoard);
    provide('openBoard', openBoard);
    provide('closeBoard', closeBoard);
</script>

<template>
    <v-app>
        <slot />
        <board />
    </v-app>
</template>

<style lang="scss"></style>
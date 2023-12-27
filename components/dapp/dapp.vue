<script setup lang="ts">
    import { watchConnections } from '@wagmi/core'

    const config = useConfig()

    const showBoard = ref(false);

    function openBoard() {
        showBoard.value = true;
    }
    function closeBoard() {
        showBoard.value = false;
    }

    let unwatch;

    onMounted(async () => {
        unwatch = watchConnections(config, {
            onChange(data) { 
                closeBoard();
            },
        })
    });

    onUnmounted(() => {
        if (unwatch) {
            unwatch();
        }
    });

    provide('showBoard', showBoard);
    provide('openBoard', openBoard);
    provide('closeBoard', closeBoard);
</script>

<template>
    <div>
        <slot />
        <board />
    </div>
</template>

<style lang="scss"></style>
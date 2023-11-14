<template>
    <div>
        <div v-for="id in ids">
            <LotteryItem :id=id />
        </div>
    </div>
</template>

<script setup>
    const ids = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
</script>
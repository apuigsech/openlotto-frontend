<script setup lang="ts">
	const route = useRoute();
	const id = ref(Number(route.params.id));
</script>

<template>
	<LotteryItem :id=id />
</template>

<style lang="scss"></style>

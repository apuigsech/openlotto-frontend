<template>
    <div v-if="lottery">
        <p><b>InitBlock:</b> {{ lottery.InitBlock }}</p>
        <p><b>Rounds:</b> {{ lottery.Rounds }}</p>
        <p><b>RoundBlocks:</b> {{ lottery.RoundBlocks }}</p>
    </div>
</template>

<script setup>
    const openlotto = useOpenLotto();

    const props = defineProps({
        id: Number,
    });
    
    const lottery = ref(null);

    onMounted(async () => {
        try {
            lottery.value = await openlotto.ReadLottery(props.id);
        } catch (error) {
            console.error("Error loading lottery:", error);
        }
    });
</script>
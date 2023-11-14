<template>
    <div>
        <p>LotteryItem {{ props.id }}</p>
        <p><b>Name:</b> {{ lottery.Name }}</p>
        <p><b>InitBlock:</b> {{ lottery.InitBlock }}</p>
        <p><b>Rounds:</b> {{ lottery.Rounds }}</p>
        <p><b>RoundBlocks:</b> {{ lottery.RoundBlocks }}</p>
        <br />
    </div>
</template>

<script setup>
    import { useOpenLottoStore } from '@/stores/useOpenLottoStore';
    const openlottoStore = useOpenLottoStore();

    const props = defineProps({
        id: Number,
    });

    const lottery = await openlottoStore.ReadLottery(props.id);
</script>
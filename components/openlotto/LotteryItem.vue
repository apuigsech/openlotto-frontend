<template>
    <v-card v-if=lottery :title=lottery.Name>
        <v-card-text>
            <p><b>InitBlock:</b> {{ lottery.InitBlock }}</p>
            <p><b>Rounds:</b> {{ lottery.Rounds }}</p>
            <p><b>RoundBlocks:</b> {{ lottery.RoundBlocks }}</p>
        </v-card-text>
    </v-card>
</template>

<script setup>
    const openlottoStore = useOpenLottoStore();

    const props = defineProps({
        id: Number,
    });
    
    const lottery = ref(null);

    onMounted(async () => {
        try {
            lottery.value = await useOpenLottoStore().ReadLottery(props.id);
        } catch (error) {
            console.error("Error loading lottery:", error);
        }
    });
</script>
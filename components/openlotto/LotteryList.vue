<template>
    <v-data-table 
        :items="items" 
        :headers="headers"
    ></v-data-table>
</template>

<script setup>
    const openlottoStore = useOpenLottoStore();

    const items = computed(() => Array.from(openlottoStore.lotteryMap.entries()).map(([key, value]) => {
        return { ...value, id: key };
    }));

    const headers = [
        { text: 'Name', align: 'left', sortable: true, value: 'Name' },
        { text: 'InitBlock', align: 'left', sortable: true, value: 'InitBlock' },
        { text: 'Rounds', align: 'left', sortable: true, value: 'Rounds' },
        { text: 'RoundBlocks', align: 'left', sortable: true, value: 'RoundBlocks' },
        { text: 'BetPrice', align: 'left', sortable: true, value: 'BetPrice' },
        { text: 'JackpotMin', align: 'left', sortable: true, value: 'JackpotMin' },
        { text: 'Operator', align: 'left', sortable: true, value: 'Operator' },
    ];

    onMounted(async () => {
        openlottoStore.BulkFetchLottery(1, 100);
    });
</script>

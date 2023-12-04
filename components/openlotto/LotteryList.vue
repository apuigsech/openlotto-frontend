<template>
    <v-data-table 
        :items=items
        :headers=headers
        :loading=loading
        hover
    >
        <template v-slot:item.Name="{ item }">
            <nuxt-link :to="`/lottery/${item.ID}`">
                {{ item.Name }}
            </nuxt-link>
        </template>

        <template v-slot:item.BetPrice="{ item }">
            {{ Number(item.BetPrice) / 10000000000000000 }} ETH
        </template>

        <template v-slot:item.JackpotMin="{ item }">
            {{ Number(item.JackpotMin) / 10000000000000000 }} ETH
        </template>

        <template v-slot:item.Operator="{ item }">
            {{ openlottoStore.operators.filter(operator => operator.address === item.Operator)[0].name || 'Unknown' }}
        </template>
    </v-data-table>
</template>

<script setup>
    const openlottoStore = useOpenLottoStore();

    const items = computed(() => Array.from(openlottoStore.lotteryMap.entries()).map(([key, value]) => {
        return { ...value, id: key };
    }));

    const headers = [
        { title: 'Name', align: 'left', sortable: true, value: 'Name' },
        { title: 'Init Block', align: 'left', sortable: true, value: 'InitBlock' },
        { title: 'Rounds', align: 'left', sortable: true, value: 'Rounds' },
        { title: 'Round Blocks', align: 'left', sortable: true, value: 'RoundBlocks' },
        { title: 'BetPrice', align: 'left', sortable: true, value: 'BetPrice' },
        { title: 'JackpotMin', align: 'left', sortable: true, value: 'JackpotMin' },
        { title: 'Operator', align: 'left', sortable: true, value: 'Operator' },
    ];

    const loading = ref(true);

    onMounted(async () => {
        await openlottoStore.BulkFetchLottery(1, 100);
        loading.value = false;
    });
</script>

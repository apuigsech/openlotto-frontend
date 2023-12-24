<template>
    <v-data-table-server 
        :loading=loading
        :headers=headers
        :items=items
        items-length=100
        @update:options=loadItems
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

        <!-- TODO 
            <template v-slot:item.Operator="{ item }">
            {{ openlottoStore.operators.filter(operator => operator.address === item.Operator)[0].name || 'Unknown' }}
        </template> -->
    </v-data-table-server>
</template>

<script setup>
    const openlotto = useOpenLotto();

    const headers = [
        { title: 'Name', align: 'left', sortable: true, value: 'Name' },
        { title: 'Init Block', align: 'left', sortable: true, value: 'InitBlock' },
        { title: 'Rounds', align: 'left', sortable: true, value: 'Rounds' },
        { title: 'Round Blocks', align: 'left', sortable: true, value: 'RoundBlocks' },
        { title: 'BetPrice', align: 'left', sortable: true, value: 'BetPrice' },
        { title: 'JackpotMin', align: 'left', sortable: true, value: 'JackpotMin' },
        { title: 'Operator', align: 'left', sortable: true, value: 'Operator' },
    ];
    const items = ref([]);

    const loading = ref(false);

    function loadItems({ page, itemsPerPage, sortBy }) {
        loading.value = true;
        items.value = [];

        const id_init = 1 + (page - 1) * itemsPerPage;
        const id_fini = 1 + page * itemsPerPage;
    
        for (let id = id_init; id < id_fini; id++) {
            openlotto.ReadLottery(id).then((lottery) => {
                lottery.ID = id;
                items.value.push(lottery);
            });
        }

        loading.value = false;
    }
</script>

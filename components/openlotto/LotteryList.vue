<template>
    <v-infinite-scroll :items="items" :onLoad="load">
        <template v-for="(item, index) in items" :key="item.id">
            <LotteryItem :id="item.id" />
        </template>
    </v-infinite-scroll>
</template>

<script setup>
    const openlottoStore = useOpenLottoStore();

    const items = computed(() => Array.from(openlottoStore.lotteryMap.entries()).map(([key, value]) => {
        return { ...value, id: key };
    }));

    const load = async ({ done }) => {
        console.log("load...");
        const batchSize = 10;
        const lastId = Math.max(...Array.from(openlottoStore.lotteryMap.keys()), 0);

        for (let i = 1; i <= batchSize; i++) {
            try {
                await openlottoStore.FetchLottery(lastId + i);
            } catch (error) {
                console.error("Error fetching lottery:", error);
                break;
            }
        }

        done('ok');
    };
</script>

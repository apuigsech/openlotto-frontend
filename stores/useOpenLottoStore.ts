import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { JsonRpcProvider } from 'ethers';
import { useDappStore } from '@/stores/useDappStore';
import { OpenLotto, LotteryItem } from '@apuigsech/openlotto-bindings';

const openLottoAddress = '0x21FBd49FfdDc52AB3e088813E48B2C3BB06A4528';

export const useOpenLottoStore = defineStore('openlotto', () => {
    const dappStore = useDappStore();

    const lotteryMap = ref(new Map<Number, LotteryItem>());

    const provider = computed(() => {
        return dappStore.isConnected ? dappStore.signer : dappStore.provider;
    });

    const openlotto = computed(() => {
        return new OpenLotto(openLottoAddress, provider.value);
    });

    async function FetchLottery(id: Number) {
        console.log("FetchLottery", id);
        let lottery = await openlotto.value.ReadLottery(id);
        lotteryMap.value.set(id, lottery);
        return lottery;
    }

    async function ReadLottery(id: Number) {
        console.log("ReadLottery", id);
        let lottery = lotteryMap.value.get(id);
        if (!lottery) {
            lottery = await FetchLottery(id);
        }
        return lottery;
    }

    return {
        lotteryMap,
        FetchLottery,
        ReadLottery,
    };
});
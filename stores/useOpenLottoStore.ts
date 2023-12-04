import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { JsonRpcProvider } from 'ethers';
import { useDappStore } from '@/stores/useDappStore';
import { OpenLotto, LotteryItem } from '@apuigsech/openlotto-bindings';
import { OpenLottoOnChain} from '@/constants';

export const useOpenLottoStore = defineStore('openlotto', () => {
    const dappStore = useDappStore();

    const lotteryMap = ref(new Map<Number, LotteryItem>());

    const provider = computed(() => {
        return dappStore.isConnected ? dappStore.signer : dappStore.provider;
    });

    const openlotto = computed(() => {
        const openLottoAddress = OpenLottoOnChain[dappStore.chain.network]['version']['latest']['address'];
        return new OpenLotto(openLottoAddress, provider.value);
    });

    const operators = computed(() => {
        return OpenLottoOnChain[dappStore.chain.network]['version']['latest']['operators'];
    });

    async function CreateLottery(lottery: Lottery) {
        console.log("CreateLottery", lottery);
        let id = await openlotto.value.CreateLotteryAndWait(lottery);
        FetchLottery(id);
        return id;
    }

    async function FetchLottery(id: Number, force: bool = false) {
        console.log("FetchLottery", id);
        let lottery = lotteryMap.value.get(id);
        if (!lottery || force) {
            let lottery = await openlotto.value.ReadLottery(id);
            lotteryMap.value.set(id, lottery);
        }
        return lottery;
    }

    async function BulkFetchLottery(from_id: Number, to_id: Number, force: bool = false): Number {
        console.log("BulkFetchLottery", from_id, to_id);
        let id;
        for (id = from_id; id < to_id; id++) {
            try {
                FetchLottery(id, force);
            } catch (error) {
                break;
            }
        }
        return id;
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
        provider,
        openlotto,
        operators,
        lotteryMap,
        CreateLottery,
        FetchLottery,
        BulkFetchLottery,
        ReadLottery,
    };
});
import { defineStore } from 'pinia';
import { JsonRpcProvider } from 'ethers';
import { useDappStore } from '@/stores/useDappStore';
import { OpenLotto, LotteryItem } from '@apuigsech/openlotto-bindings';

const openLottoAddress = '0x21FBd49FfdDc52AB3e088813E48B2C3BB06A4528';
const dummyOperatorAddress = '0x32049dCEB926f5Dbda4e4215ce603e8252C69B21';

export type OpenLottoState = {
    lotteryList: LotteryItem[];
}

export const useOpenLottoStore = defineStore('openlotto', {
    state: (): OpenLottoState => ({
        lotteryList: [],
    }),
    getters: {
        provider() {
            const dappStore = useDappStore();
            if (dappStore.isConnected) {
                return toRaw(dappStore.signer);
            } else {
                return toRaw(dappStore.provider);
            }
        },
        contract() {
            return new OpenLotto(openLottoAddress, this.provider);
        },
        GetLotteryList: (state) => state.lotteryList,
    },
    actions: {
        async ReadLottery(id) {
            return this.contract.ReadLottery(id);
        }
    }
});
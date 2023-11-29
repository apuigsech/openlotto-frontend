<template>
    <v-form @submit.prevent="createLottery" :disabled=formDisabled>
        <v-text-field 
            variant="underlined"
            label="Name"
            v-model=lotteryRef.Name
        ></v-text-field>

        <v-slider
            label="Init Block"
            v-model=lotteryRef.InitBlock
            :min="blockNumber" :max="blockNumber + 10000" step=1
            thumb-label
        ></v-slider>

        <v-slider
            label="Rounds"
            v-model=lotteryRef.Rounds
            min=1 max=1000 step=1
            thumb-label
        ></v-slider>

        <v-slider
            label="Round Blocks"
            v-model=lotteryRef.RoundBlocks
            min=1 max=1000 step=1
            thumb-label
        ></v-slider>

        <v-slider
            label="Bet Price"
            v-model=lotteryRef.BetPrice
            min=0 max=1000000000000000000 step=100000000000000
            thumb-label
        >
            <template v-slot:thumb-label="">
                {{ Number(lotteryRef.BetPrice) / 10000000000000000 }}
            </template>
        </v-slider>

        <v-select
            label="Operator"
            :items=Operators
            item-title="name"
            item-value="address"
            v-model=lotteryRef.Operator
        ></v-select>

        <v-btn 
            variant="tonal"
            type="submit"
            block
        >Create Lottery</v-btn>
    </v-form>
</template>

<script setup lang="ts">    
    import { useDappStore } from '@/stores/useDappStore';
    import { OpenLotto, LotteryItem } from '@apuigsech/openlotto-bindings';
    import { reactive, ref } from 'vue';

    const openLottoAddress = '0x21FBd49FfdDc52AB3e088813E48B2C3BB06A4528';
    const Operators = [
        { 
            'name': 'None', 
            'address': '0x0000000000000000000000000000000000000000'
        },
        { 
            'name': 'Dummy', 
            'address': '0x32049dCEB926f5Dbda4e4215ce603e8252C69B21'
        }    
    ]

    const dappStore = useDappStore();
    const blockNumber = await dappStore.provider.getBlockNumber();
    
    let lottery = OpenLotto.NewEmptyLottery();
    lottery.Name = '';
    lottery.InitBlock = blockNumber;
    lottery.Rounds = 0;
    lottery.RoundBlocks = 0;
    lottery.BetPrice = 10000000000000000;
    lottery.PrizePoolShare[0] = BigInt('1000000000000000000');
    lottery.Operator = '0x0000000000000000000000000000000000000000';

    const lotteryRef = reactive(lottery);

    const formDisabled=ref(false);
    async function createLottery() {
        formDisabled.value=true;
        lottery.BetPrice = BigInt(lottery.BetPrice);
  
        const dappStore = useDappStore();
        const openlotto = await new OpenLotto(openLottoAddress, toRaw(dappStore.signer));

        let id = await openlotto.CreateLotteryAndWait(lottery);
        formDisabled.value=false;
        console.log("lottery created: ", id);
    }
</script>
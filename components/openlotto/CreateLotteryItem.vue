<template>
    <div>
        <form @submit.prevent="submitName">
            <p><b>Name:</b> <input type="text" v-model="name" placeholder="Lottery Name"></p>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script setup lang="ts">    
    import { useDappStore } from '@/stores/useDappStore';

    const openLottoAddress = '0x21FBd49FfdDc52AB3e088813E48B2C3BB06A4528';
    const dummyOperatorAddress = '0x32049dCEB926f5Dbda4e4215ce603e8252C69B21';

    import { OpenLotto, LotteryItem } from '@apuigsech/openlotto-bindings';

    function newFilledLottery(operator): LotteryItem {
        let lottery = OpenLotto.NewEmptyLottery();
        lottery.Name = 'dummy';
        lottery.InitBlock = BigInt('10');
        lottery.Rounds = 10;
        lottery.RoundBlocks = 100;
        lottery.BetPrice = BigInt('10000000000000000');
        lottery.PrizePoolShare[0] = BigInt('1000000000000000000');
        lottery.Operator = operator;
        return lottery;
    }

    import { ref } from 'vue';
    const name = ref('');

    async function submitName() {
        const dappStore = useDappStore();
        const openlotto = await new OpenLotto(openLottoAddress, toRaw(dappStore.signer));

        let lottery = newFilledLottery(dummyOperatorAddress);
        lottery.Name = name.value;
        let id = await openlotto.CreateLotteryAndWait(lottery);
        console.log("lottery created: ", id);
    }
</script>
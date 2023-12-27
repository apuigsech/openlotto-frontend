<template>
    <v-form v-if=isConnected @submit.prevent="createLottery" >
        <v-text-field 
            variant="underlined"
            label="Name"
            v-model=lottery.Name
        ></v-text-field>

        <v-slider
            label="Init Block"
            v-model=initBlock
            :min=Number(blockNumber.data.value) :max="Number(blockNumber.data.value) + 1000" step=1
            thumb-label
        ></v-slider>
        
        <v-slider
            label="Rounds"
            v-model=lottery.Rounds
            min=1 max=1000 step=1
            thumb-label
        ></v-slider>

        <v-slider
            label="Round Blocks"
            v-model=lottery.RoundBlocks
            min=1 max=1000 step=1
            thumb-label
        ></v-slider>

        <v-slider
            label="Bet Price"
            v-model=betPrice
            min=1 :max=100 :step=0.01
            thumb-label
        >
            <template v-slot:thumb-label="">
                {{ betPrice }} {{ chain.nativeCurrency.symbol }}
            </template>
        </v-slider>

        <v-slider
            label="Jackpot Min"
            v-model=jackpotMin
            min=0 :max=1000 :step=0.1
            thumb-label
        >
            <template v-slot:thumb-label="">
                {{ jackpotMin }} {{ chain.nativeCurrency.symbol }}
            </template>
        </v-slider>

        <!-- <v-select
            label="Operator"
            :items=openLottoStore.operators
            item-title="name"
            item-value="address"
            v-model=lottery.Operator
        ></v-select>  -->

        <v-btn 
            variant="tonal"
            type="submit"
            block
        >Create Lottery</v-btn>
    </v-form>
</template>

<script setup lang="ts">
	const { isConnected, chain } = useAccount();
    const openlotto = useOpenLotto();
    const blockNumber = useBlockNumber();

    const lottery = ref({
        Name: '',
        InitBlock: BigInt(0),
        Rounds: 1,
        RoundBlocks: 1,
        BetPrice: BigInt(0),
        JackpotMin: BigInt(0),
        DistributionPoolTo: [
            '0x0000000000000000000000000000000000000000',
            '0x0000000000000000000000000000000000000000',
            '0x0000000000000000000000000000000000000000',
            '0x0000000000000000000000000000000000000000',
            '0x0000000000000000000000000000000000000000'
        ],
        DistributionPoolShare: [ BigInt(0), BigInt(0), BigInt(0), BigInt(0), BigInt(0) ],
        PrizePoolShare: [
            BigInt(0), BigInt(0), BigInt(0), BigInt(0), BigInt(0),
            BigInt(0), BigInt(0), BigInt(0), BigInt(0), BigInt(0),
            BigInt(0), BigInt(0), BigInt(0), BigInt(0), BigInt(0),
            BigInt(0), BigInt(0), BigInt(0), BigInt(0), BigInt(0) 
        ],
        PrizePoolAttributes: [
            '0x0000000000000000', '0x0000000000000000',
            '0x0000000000000000', '0x0000000000000000',
            '0x0000000000000000', '0x0000000000000000',
            '0x0000000000000000', '0x0000000000000000',
            '0x0000000000000000', '0x0000000000000000',
            '0x0000000000000000', '0x0000000000000000',
            '0x0000000000000000', '0x0000000000000000',
            '0x0000000000000000', '0x0000000000000000',
            '0x0000000000000000', '0x0000000000000000',
            '0x0000000000000000', '0x0000000000000000'
        ],
        Operator: '0x0000000000000000000000000000000000000000',
        Attributes: '0x00000000000000000000000000000000'
    });

    const initBlock = ref(0);
    const betPrice = ref(0);
    const jackpotMin = ref(0);

    async function createLottery() {
        lottery.value.InitBlock = BigInt(initBlock.value);
        lottery.value.BetPrice = BigInt(betPrice.value * 10**chain?.value.nativeCurrency.decimals);
        lottery.value.JackpotMin = BigInt(jackpotMin.value * 10**chain?.value.nativeCurrency.decimals);

        lottery.value.PrizePoolShare[0] = BigInt('1000000000000000000');
        lottery.value.Operator = '0x32049dCEB926f5Dbda4e4215ce603e8252C69B21';
        
        openlotto.CreateLottery(lottery.value);
    }
</script>
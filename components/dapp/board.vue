<script setup lang="ts">
	const { connect, connectors } = useConnect()
    const { isConnected } = useAccount()

    const showBoard = inject('showBoard');
	const closeBoard = inject('closeBoard');
</script>

<template>
	<v-dialog width="500" v-model=showBoard @click:outside=closeBoard>
    	<v-card>
            <v-btn 
                v-for="connector in connectors"
                :disabled=!connector.ready
                @click="connect({connector})"
                class="connector"
            >
                <connector-logo :connector=connector />{{ connector.name }}
            </v-btn>
    	</v-card>
	</v-dialog>
</template>

<style lang="scss">
.connector {
	display: flex;
	justify-content: center;
	padding: 1rem 1rem 0.6rem;
	margin: 0.5rem;
	border-radius: 0.75rem;
	cursor: pointer;
}
</style>
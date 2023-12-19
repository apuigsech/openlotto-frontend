import { type Signer, JsonRpcProvider, Wallet } from 'ethers'
import { defineStore } from 'pinia'
import invariant from 'tiny-invariant'
import { createPublicClient, type Chain, http, type PublicClient, type Abi, getAddress } from 'viem'
import { DEFAULT_NETWORK, HARDHAT_PRIV_KEY, MULTICALL3_ADDRESS } from '@/constants'
import { networkMap, type AppNetwork } from '@/constants'

type IntervalID = number | NodeJS.Timeout;

export type DappState = {
	user: User
	network: AppNetwork
	blockNumber: number
	syncInterval: IntervalID | null
}

export type User = {
	signer: Signer | null
	address: string
	chainId: number
}

export const networkOptions = [...networkMap.keys()]

// ================ move to constants ================

export const useDappStore = defineStore('dapp', {
	state: (): DappState => ({
		user: {
			address: '',
			signer: null,
			chainId: -1,
		},
		network: DEFAULT_NETWORK,
		blockNumber: 0,
		syncInterval: null,
	}),
	getters: {
		chain(state): Chain {
			const chain = networkMap.get(state.network)
			invariant(chain, 'useDappStore.chain')
			return chain
		},
		chainId(): number {
			return this.chain.id
		},
		isNetworkUnmatched(state): boolean {
			if (!this.isConnected) return false
			return state.user.chainId !== this.chainId
		},
		rpcUrl(): string {
			return this.chain.rpcUrls.default.http[0]
		},
		explorerUrl(): string {
			return this.chain.blockExplorers?.default.url || ''
		},
		provider(): JsonRpcProvider {
			invariant(this.rpcUrl, 'rpcUrl')
			return new JsonRpcProvider(this.rpcUrl)
		},
		isConnected(state) {
			if (!state.user.address || !state.user.signer) {
				return false
			}
			return true
		},
		signer(): Signer {
			if (!this.isConnected) {
				console.warn('No wallect connected, using hardhat account #12 as signer')
				return new Wallet(HARDHAT_PRIV_KEY[12]).connect(this.provider)
			}
			invariant(this.user.signer, 'user.signer')
			return this.user.signer
		},
		client(): PublicClient {
			return createPublicClient({
				chain: this.chain,
				transport: http(),
			})
		},
		multicallAddress(state) {
			return MULTICALL3_ADDRESS
		},
	},
	actions: {
		setUser(user: User) {
			this.user = markRaw(user)
		},
		resetUser() {
			this.user.address = ''
			this.user.signer = null
			this.user.chainId = -1
		},
		setNetwork(network: AppNetwork) {
			this.network = network;
		},
		multicall(functionNames: string[], address: string, abi: any) {
			return this.client.multicall({
				contracts: functionNames.map(functionName => {
					return {
						address: getAddress(address),
						abi: abi as Abi,
						functionName,
					}
				}),
				multicallAddress: getAddress(this.multicallAddress),
			})
		},
		async fetchBlockNumber() {
			const num = await this.provider.getBlockNumber()
			this.blockNumber = num
			return num
		},
		async syncBlockNumber(time: number) {
			if (!this.syncInterval) {
				await this.fetchBlockNumber();
				this.syncInterval = setInterval(() => {
					this.fetchBlockNumber();
				}, time);
			}
		},
		async unsyncBlockNumber() {
			if (this.syncInterval) {
				clearInterval(this.syncInterval)
				this.syncInterval = null
			}
		},
	},
	persist: {
		key: 'selectedNetwork',
		paths: ['network'],
	},
})

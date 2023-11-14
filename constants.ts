import type { Chain } from 'viem'
import { mainnet, sepolia } from 'viem/chains'

export type AppNetwork = 'mainnet' | 'sepolia'

export const networkMap = new Map<AppNetwork, Chain>()

networkMap.set('mainnet', mainnet)
networkMap.set('sepolia', sepolia)
sepolia.rpcUrls.default.http[0] = 'https://eth-sepolia.g.alchemy.com/v2/47VVws6UUDQb0XaCxKw1qC2boRkc-N9C';
sepolia.rpcUrls.public.http[0] = 'https://eth-sepolia.g.alchemy.com/v2/47VVws6UUDQb0XaCxKw1qC2boRkc-N9C';
console.log("sepolia",  sepolia)

export const APP_NAME = 'OpenLotto'

export const MULTICALL3_ADDRESS = '0xcA11bde05977b3631167028862bE2a173976CA11'

export const HARDHAT_PRIV_KEY = [
	'', // #0
	'', // #1
	'',
	'',
	'',
	'', // #5
	'',
	'',
	'',
	'',
	'', // #10,
	'',
	'0xa267530f49f8280200edf313ee7af6b827f2a8bce2897751d06a843f644967b1',
]

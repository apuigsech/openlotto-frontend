import { type Chain, defineChain } from 'viem'
import { sepolia } from 'viem/chains'

export type AppNetwork = 'sepolia' | 'development'
export const networkMap = new Map<AppNetwork, Chain>()

// TODO: Using alchemy url.
sepolia.rpcUrls.default.http[0] = 'https://eth-sepolia.g.alchemy.com/v2/47VVws6UUDQb0XaCxKw1qC2boRkc-N9C';
sepolia.rpcUrls.public.http[0] = 'https://eth-sepolia.g.alchemy.com/v2/47VVws6UUDQb0XaCxKw1qC2boRkc-N9C';

type OpenLottoOnChainType = {
	[key in string]: {
    	version: {
      		latest: {
        		address: string;
        		operators: {
					[key in string]: string
				}
      		}
    	}
    	chain: Chain
  	}
};

const development: Chain = defineChain({
	id: 31337,
	network: 'development',
	name: 'Development',
	nativeCurrency: { name: 'Dev Ether', symbol: 'DEV', decimals: 18 },
	rpcUrls: {
	  default: {
			http: ['http://localhost:8545'],
	  },
	  public: {
			http: ['http://localhost:8545'],
	  }
	}
});

export const OpenLottoOnChain: OpenLottoOnChainType = {
    'sepolia': {
        'version': {
            'latest': {
                'address': '0x21FBd49FfdDc52AB3e088813E48B2C3BB06A4528',
                'operators': {
                    'None': '0x0000000000000000000000000000000000000000',
                    'Dummy': '0x32049dCEB926f5Dbda4e4215ce603e8252C69B21',
                }
            }
        },
		'chain': sepolia
    },
    'development': {
        'version': {
            'latest': {
                'address': '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
                'operators': {
                    'None': '0x0000000000000000000000000000000000000000',
                    'Dummy': '',
                }
            }
        },
		'chain':  development
	},
}

for (const key in OpenLottoOnChain) {
	networkMap.set(key as AppNetwork, OpenLottoOnChain[key as AppNetwork]['chain'])
}

export const DEFAULT_NETWORK: AppNetwork = 'sepolia'

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
import { kusama, polkadotD, westend ,polkadotC ,polkadotAH } from "@polkadot-api/descriptors";
import { polkadot, polkadot_asset_hub,polkadot_collectives } from "polkadot-api/chains"


const IDescriptors = {
  polkadot: polkadotD,
  kusama: kusama,
  westend: westend,
  polkadotAH: polkadotAH,
  polkadotC: polkadotC,
} as const;

export type Descriptors = typeof IDescriptors;

export type ChainId = keyof Descriptors;

export const getDescriptors = (id: string): Descriptors[ChainId] => {
  return IDescriptors[id as ChainId];
};

// Define the type for chain specification
export type ChainSpec = {
  id: string;
  name: string;
  wsUrl: string[];
  relay: string;
  paraId?: number;
  logo: string;
  TokenId: string;
  blockExplorerUrl: string;
  ChainSpecs: string;
  Descriptor: Descriptors[ChainId];
};

// Create the array of chain specifications
const chains: ChainSpec[] = [
  {
    id: "polkadot",
    name: "polkadot",
    wsUrl: [
      "wss://polkadot-rpc.dwellir.com",
      "wss://rpc.ibp.network/polkadot",
      "wss://rpc.dotters.network/polkadot",
      "wss://1rpc.io/dot",
      "wss://polkadot-rpc-tn.dwellir.com",
      "wss://polkadot-rpc.publicnode.com",
      "wss://polkadot-public-rpc.blockops.network/ws",
      "wss://rpc-polkadot.luckyfriday.io",
      "wss://rockx-dot.w3node.com/polka-public-dot/ws",
      "wss://dot-rpc.stakeworld.io",
    ],
    relay: "polkadot",
    paraId: undefined,
    logo: "?",
    TokenId: "Dot",
    blockExplorerUrl: "https://polkadot.subscan.io",
    ChainSpecs: polkadot,
    Descriptor: polkadotD,
  },
  {
    id: "polkadotC",
    name: "polkadotCollectives",
    wsUrl: [
      "wss://polkadot-rpc.dwellir.com",
      "wss://rpc.ibp.network/polkadot",
      "wss://rpc.dotters.network/polkadot",
      "wss://1rpc.io/dot",
      "wss://polkadot-rpc-tn.dwellir.com",
      "wss://polkadot-rpc.publicnode.com",
      "wss://polkadot-public-rpc.blockops.network/ws",
      "wss://rpc-polkadot.luckyfriday.io",
      "wss://rockx-dot.w3node.com/polka-public-dot/ws",
      "wss://dot-rpc.stakeworld.io",
    ],
    relay: "polkadot", 
    paraId: undefined,
    logo: "?",
    TokenId: "Dot",
    blockExplorerUrl: "?",
    ChainSpecs: polkadot_collectives,
    Descriptor: polkadotC,
  },

  {
    id: "polkadotAH",
    name: "polkadot Asset Hub",
    wsUrl: [
			"wss://sys.ibp.network/statemint",
			"wss://sys.dotters.network/statemint",
			"wss://sys.ibp.network/asset-hub-polkadot",
			"wss://sys.dotters.network/asset-hub-polkadot",
			"wss://asset-hub-polkadot-rpc.dwellir.com",
			"wss://statemint-rpc-tn.dwellir.com",
			"wss://rpc-asset-hub-polkadot.luckyfriday.io",
			"wss://polkadot-asset-hub-rpc.polkadot.io",
			"wss://dot-rpc.stakeworld.io/assethub",
			"wss://statemint-rpc.dwellir.com"
		],
    relay: "polkadot", // This is a relay chain
    paraId: 1000,
    logo: "?",
    TokenId: "Dot",
    blockExplorerUrl: "?",
    ChainSpecs: polkadot_asset_hub,
    Descriptor: polkadotAH,
  },
] as const;

export const GetChainById = (id: string): ChainSpec | undefined => {
  return chains.find((chain) => chain.id === id);
};

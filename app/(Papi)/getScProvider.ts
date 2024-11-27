import {
  ScClient,
  createScClient,
  AddChainOptions,
  Chain,
} from "@substrate/connect";
import { MapCache } from "@/app/utils/useCache";
import { GetChainById, } from "./ChainSpecs";
import { getSmProvider } from "polkadot-api/sm-provider";

let client: ScClient;
const chainCache = new MapCache<string, Promise<Chain>>();

 const getSc = async (chainid: string) => {
  client ??= createScClient();
  const chainInfo = GetChainById(chainid);

  const addRelayChain = async (
    spec: string,
    options?: AddChainOptions
  ): Promise<Chain> => {
    const existingChain = chainCache.get(spec);
    if (existingChain) {
      return existingChain;
    }

    const chainPromise = client.addChain(spec, options);

    chainCache.set(spec, chainPromise);

    try {
      return await chainPromise;
    } catch (error) {
      chainCache.delete(spec);
      throw error;
    }
  };

  const addParachain = async (
    spec: string,
    relayChain: Chain
  ): Promise<Chain> => {
    const existingChain = chainCache.get(spec);
    if (existingChain) {
      return existingChain;
    }

    const chainPromise = relayChain.addChain(spec);
    chainCache.set(spec, chainPromise);
    try {
      return await chainPromise;
    } catch (error) {
      chainCache.delete(spec);
      throw error;
    }
  };

  try {
    if (chainInfo!.id === chainInfo!.relay) {
      return addRelayChain(chainInfo!.ChainSpecs);
    } else {
      const relaychainInfo = GetChainById(chainInfo!.relay);
      const relayChain = await addRelayChain(relaychainInfo!.ChainSpecs);
      return await addParachain(chainInfo!.ChainSpecs, relayChain);
    }
  } catch (error) {
    console.error("Failed to add chain:", error);
    throw error;
  }
};

export const getScProvider = async (chainId: string) => {
  try {
    const chain = await getSc(chainId);
    return getSmProvider(chain);
  } catch (error) {
    console.error("Failed to get chain provider:", error);
    throw error;
  }
};

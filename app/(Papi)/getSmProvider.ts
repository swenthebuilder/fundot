import { Chain } from "polkadot-api/smoldot";
import { MapCache } from "@/app/utils/useCache";
import { GetChainById, } from "./ChainSpecs";
import { getSmoldotInstance } from "./smoldot";
import { getSmProvider } from "polkadot-api/sm-provider";

const chainCache = new MapCache<string, Promise<Chain>>();

export const getSmol = async (chainid: string) => {
  const smoldot = getSmoldotInstance();
  const chainInfo = GetChainById(chainid);

  const addRelayChain = async (
    spec: string,
    disableJsonRpc: boolean
  ): Promise<Chain> => {
    if (chainInfo!.id === chainInfo!.relay) {
      chainCache.delete(spec);
    }

    const existingChain = chainCache.get(spec);
    if (existingChain) {
      return existingChain;
    }

    const chainPromise = smoldot.addChain({
      chainSpec: spec,
      disableJsonRpc: disableJsonRpc,
    });

    chainCache.set(spec, chainPromise);

    try {
      return await chainPromise;
    } catch (error) {
      chainCache.delete(spec);
      throw error;
    }
  };

  const addParachain = async (spec: string, relayChain: Chain) => {
    const existingChain = chainCache.get(spec);
    if (existingChain) {
      return existingChain;
    }

    const chainPromise = smoldot.addChain({
      chainSpec: spec,
      ...(relayChain ? { potentialRelayChains: [relayChain] } : {}),
    });
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
      return addRelayChain(chainInfo!.ChainSpecs, false);
    } else {
      const relaychainInfo = GetChainById(chainInfo!.relay);
      const relayChain = await addRelayChain(relaychainInfo!.ChainSpecs, true);
      return await addParachain(chainInfo!.ChainSpecs, relayChain);
    }
  } catch (error) {
    console.error("Failed to add chain:", error);
    throw error;
  }
};

export const getSmolProvider = async (chainid: string) => {
  try {
    const chain = await getSmol(chainid);
    return getSmProvider(chain);
  } catch (error) {
    console.error("Failed to get chain provider:", error);
    throw error;
  }
};

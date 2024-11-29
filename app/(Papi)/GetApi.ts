import { MapCache } from "@/app/utils/useCache";
import { GetChainById } from "./ChainSpecs";
import { GetClient } from "./GetClient";
import { ChainDefinition, TypedApi } from "polkadot-api";

const ApiCache = new MapCache<string, TypedApi<ChainDefinition>>();

export const GetApi = async (chainId: string) => {
  const client = await GetClient(chainId);
  const chainInfo = GetChainById(chainId);
  const Api = client.getTypedApi(chainInfo!.Descriptor);
  ApiCache.set(chainId, Api);
  return Api;
};

"use client";
import { createClient, PolkadotClient } from "polkadot-api";
import { getScProvider } from "./getScProvider";
import { getSmolProvider } from "./getSmProvider";
import { isScAvailableScProvider } from "./isScAvailable";
import { settings } from "../settings";
import { GetChainById } from "./ChainSpecs";
import { getWsProvider } from "polkadot-api/ws-provider/web";
import { MapCache } from "../utils/useCache";

const savedSettings = settings.get("settings");
const clientCache = new MapCache<string, PolkadotClient>();

export const GetClient = async (chainId: string) => {
  return clientCache.getOrSet(chainId, async () => {
    try {
      const Client = await GetRpc(chainId);
      return createClient(Client);
    } catch (error) {
      console.error("Failed to create client:", error);
      throw error;
    }
  });
};

const GetRpc = async (chainId: string) => {
  return savedSettings?.lightClients
    ? await lightRpc(chainId)
    : wssRpc(chainId);
};

const lightRpc = async (chainId: string) => {
  return (await isScAvailableScProvider())
    ? await getScProvider(chainId)
    : await getSmolProvider(chainId);
};
const wssRpc = (chainId: string) => {
  const chainInfo = GetChainById(chainId);
  if (!chainInfo) {
    throw new Error(`No chain found for ID: ${chainId}`);
  }
  // future feature
  // if (savedSettings?.customWWS) {
  //   const provider = getWsProvider(rpcSpec);
  //   if (provider !== undefined) {
  //     return provider;
  //   }
  // }
  return getWsProvider(chainInfo.wsUrl);
};
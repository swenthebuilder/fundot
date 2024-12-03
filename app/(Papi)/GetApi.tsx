"use client";
import { MapCache } from "@/app/utils/useCache";
import { GetClient } from "./GetClient";
import { polkadotD, polkadotC, polkadotAH } from "@polkadot-api/descriptors";
import { TypedApi } from "polkadot-api";

// Create a union type of all possible descriptors
type SupportedDescriptor = 
  | typeof polkadotD 
  | typeof polkadotC 
  | typeof polkadotAH;

// Type-safe descriptor mapping
const ChainDescriptors: Record<string, SupportedDescriptor> = {
  'polkadot': polkadotD,
  'polkadotC': polkadotC,
  'polkadotAH': polkadotAH,
  // Add more chain-specific descriptors as needed
};

// Create a type-safe cache and GetApi function
const ApiCache = new MapCache<string, TypedApi<SupportedDescriptor>>();

export const GetApi = async (chainId: string) => {
  return ApiCache.getOrSet(chainId, async () => {
    try {
      const client = await GetClient(chainId);
      const cachedApi = ApiCache.get(chainId);
      if (cachedApi) {
        return cachedApi;
      }
    
      // Select the appropriate descriptor, fallback to default if not found
      const descriptor = ChainDescriptors[chainId] || ChainDescriptors['polkadot'];
      
      const Api = client.getTypedApi(descriptor);
      ApiCache.set(chainId, Api);
      return Api as TypedApi<typeof descriptor>;
    } catch (error) {
      console.error("Failed to create client:", error);
      throw error;
    }
  });
};
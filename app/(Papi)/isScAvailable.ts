import { getProviders } from "@substrate/discovery";

let SUBSTRATE_CONNECT_PROVIDER_CACHE: Promise<unknown> | null = null;

export const isScAvailableScProvider = async () => {
  if (!SUBSTRATE_CONNECT_PROVIDER_CACHE)
    SUBSTRATE_CONNECT_PROVIDER_CACHE = (async () => {
      const providerDetails = getProviders();
      const provider = await providerDetails[0]?.provider;
      return provider ?? null;
    })();

  return await SUBSTRATE_CONNECT_PROVIDER_CACHE;
};

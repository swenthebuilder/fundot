import { polkadotD } from "@polkadot-api/descriptors";
import { MapCache } from "@/app/utils/useCache";
import { GetClient } from "../GetClient";

/// should not be used
const ApiCache = new MapCache<string, unknown>();

// possible work around
export const GetDotApi = async () => {
  const client = await GetClient("polkadot");
  const Api = client.getTypedApi(polkadotD);
  ApiCache.set("polkadot", Api);
  return Api;
};

import { MapCache } from "@/app/utils/useCache";
import { getDescriptors } from "../ChainSpecs";
import { GetClient } from "../GetClient";

/// should not be used
const ApiCache = new MapCache<string, unknown>();

export const GetApi = async (chainId: string) => {
  const client = await GetClient(chainId);
  const Api = client.getTypedApi(getDescriptors(chainId));
  ApiCache.set(chainId, Api);
  return Api;
};

// export const GetApi = async (chainId: string) => {
//     return ApiCache.getOrSet(chainId, async () => {
//         try {
//             const client = await GetClient(chainId);
//             const Api = client.getTypedApi(getDescriptors(chainId));
//             return Api;
//         } catch (error) {
//           console.error("Failed to create Api:", error);
//           throw error;
//         }
//       });
//   };
// client.destroy()

// // possible work around
// export const GetDotApi = async () => {
//   const client = await GetClient("polkadot");
//   const Api = client.getTypedApi(polkadotD);
//   ApiCache.set("polkadot", Api);
//   return Api;
// };
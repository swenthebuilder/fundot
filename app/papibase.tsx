"use client";
import React, { useState } from "react";
import { formatBalance } from "@/app/utils/useformatBalance";
import IslightClient from "@/app/(Papi)/islightClient";
// import { GetClient } from "./(Papi)/GetClient";
// import { polkadotD } from "@polkadot-api/descriptors";
import { GetDotApi } from "./(Papi)/apis";

export default function PolkadotApibase() {
  const [accountBalance, setAccountBalance] = useState<string | null>(null);
  const initializeClient = async () => {
    try {
      const startTime = performance.now();
      const dotapi = await GetDotApi();

      const accountInfo = await dotapi.query.System.Account.getValue(
        "16JGzEsi8gcySKjpmxHVrkLTHdFHodRepEz8n244gNZpr9J"
      );

      setAccountBalance(formatBalance(accountInfo.data.free));

      const endTime = performance.now();
      console.log(`New Chain Creation Time: ${endTime - startTime} ms`);
    } catch (error) {
      console.error("Failed to initialize client:", error);
      throw error;
    }
  };
  // const performancetesClientapi = async () => {
  //   try {
  //     const startTime = performance.now();
  //     const ChainId = "polkadot";
  //     const client = await GetClient(ChainId);
  //     const api = client.getTypedApi(polkadotD);
    
  //     const accountInfo = await api.query.System.Account.getValue(
  //       "16JGzEsi8gcySKjpmxHVrkLTHdFHodRepEz8n244gNZpr9J"
  //     );

  //     setAccountBalance(formatBalance(accountInfo.data.free));

  //     const endTime = performance.now();
  //     console.log(`New Chain Creation Time: ${endTime - startTime} ms`);
  //   } catch (error) {
  //     console.error("Failed to initialize client:", error);
  //     throw error;
  //   }
  // };
  
  return (
    <>
      <div className="flex flex-col  items-center h-screen justify-center gap-4">
        <div>
          <IslightClient />
        <div className="flex flex-col gap-4 pt-6">
        <h2>Polkadot API</h2>
          <button
            onClick={initializeClient}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
             Performance test Client useapi(chainid)
          </button>
          {/* <button
            onClick={performancetesClientapi}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Performance test Client api
          </button> */}
          </div>
        </div>
        {accountBalance && (
          <div className="mb-4 ~px-4/8 ~py-2/4 ~text-sm/xl ">
            <p> Account Balance: {accountBalance} DOT</p>
          </div>
        )}
      </div>
    </>
  );
}

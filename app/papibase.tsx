"use client";
import React, { useState } from "react";
import { formatBalance } from "@/app/utils/useformatBalance";
import IslightClient from "@/app/(Papi)/islightClient";
import { GetDotApi } from "./(Papi)/apis/GetDotApi";
import { GetApi } from "./(Papi)/apis/GetApi";


export default function PolkadotApibase() {
  const [accountBalance, setAccountBalance] = useState<string | null>(null);
  const Clientapi = async () => {
    try {
      const startTime = performance.now();
      const api = await GetApi("polkadot");
      const accountInfo = await api.query.System.Account.getValue(
        "5Cie5mQMSyNcBvP1ABKQgzZgt3zZGNLmfsQPipEj6gvvTvAp"
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
              onClick={GetDotApi}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              GetDotApi
            </button>
            <button
              onClick={Clientapi}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Client Api
            </button>
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

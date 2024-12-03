"use client";
import React, {  useState } from "react";
import { formatBalance } from "@/app/utils/useformatBalance";
import IslightClient from "@/app/(Papi)/islightClient";
import { GetApi } from "./(Papi)/GetApi";
import { chains } from "./(Papi)/ChainSpecs";


export default function PolkadotApibase() {
  const [accountBalance, setAccountBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectChain, setSelectChain] = useState<string | null>("westend2");

  const handleChainSelect = async (chainId: string) => {
    try {
      setSelectChain(chainId);
      setLoading(true);
      
      const startTime = performance.now();
      const api = await GetApi(chainId);
      
      const accountInfo = await api.query.System.Account.getValue(
        "5Cie5mQMSyNcBvP1ABKQgzZgt3zZGNLmfsQPipEj6gvvTvAp"
      );
  
      setAccountBalance(formatBalance(accountInfo.data.free));
  
      const endTime = performance.now();
      console.log(`New Chain Creation Time: ${endTime - startTime} ms`);

    } catch (error) {
      console.error("Failed to initialize client:", error);
      setAccountBalance(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center h-screen justify-center gap-4">
        <div className="text-center text-muted-foreground">
          Selected Chain: 
          <span className="font-medium text-foreground ml-2">
            {chains.find(chain => chain.id === selectChain)?.name || 'No Chain'}
          </span>
        </div>
  
        {/* Chain Selection Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {chains.map((chain) => (
           <button 
           key={chain.id} 
           onClick={() => handleChainSelect(chain.id)}
           className={`
             bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
             flex items-center justify-center
             ${selectChain === chain.id ? 'opacity-50 cursor-not-allowed' : ''}
             ${loading ? 'opacity-50 cursor-not-allowed' : ''}
           `}
           disabled={loading || selectChain === chain.id}
         >
           {loading && selectChain === chain.id ? (
             <div 
               className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
               role="status"
             >
               <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                 Loading...
               </span>
             </div>
           ) : (
             chain.name
           )}
         </button>
          ))}
        </div>
        <div>
          <IslightClient />
          <div className="flex flex-col gap-4 pt-6">
          </div>
        </div>
  
        {/* Account Balance Display */}
        {accountBalance && (
          <div className="mb-4 px-4  rounded">
            <p className="text-sm font-medium">
              Account Balance: <span className="text-green-600">{accountBalance} DOT</span>
            </p>
          </div>
        )}
      </div>
      
    </>
  );
}

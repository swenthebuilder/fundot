import { startFromWorker } from "polkadot-api/smoldot/from-worker";

// const worker = new Worker(new URL("polkadot-api/smoldot/worker", import.meta.url));

// export const smoldot = startFromWorker(worker)

// Store worker and smoldot instance
let worker: Worker;
let smoldot: ReturnType<typeof startFromWorker>;

// Initialize worker and smoldot if not already done
export const getSmoldotInstance = () => {
  if (!worker || !smoldot) {
    worker = new Worker(
      new URL("polkadot-api/smoldot/worker", import.meta.url)
    );
    smoldot = startFromWorker(worker);
  }
  return smoldot;
};
//  smoldot.terminate()

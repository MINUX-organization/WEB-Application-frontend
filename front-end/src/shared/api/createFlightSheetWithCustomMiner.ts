import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {
  name: string;
  installationURL: string;
  wallet: string;
  poolURL: string;
  coin: string;
  algorithm: string;
  poolTemplate: string;
  walletAndWorkerTemplate: string;
  extraConfigArguments: string;
}

const ResponseRuntype = rt.String

export const createFlightSheetWithCustomMiner = makeApiFunc<Request, typeof ResponseRuntype>("POST", 'create/flight-sheet-with-custom-miner', ResponseRuntype)

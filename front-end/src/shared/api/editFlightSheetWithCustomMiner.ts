import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {
  id: number
	newName: string
	newInstallationURL: string
	newWallet: string
	newPoolURL: string
	newCoin: string
	newAlgorithm: string
	newPoolTemplate: string
	newWalletAndWorkerTemplate: string
	newExtraConfigArguments: string
}

const ResponseRuntype = rt.String

export const editFlightSheetWithCustomMiner = makeApiFunc<Request, typeof ResponseRuntype>("POST", 'edit/flight-sheet-with-custom-miner', ResponseRuntype)

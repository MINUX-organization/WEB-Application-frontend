import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {
  id: number
	newName: string
	newCryptocurrencyId: number
	newMinerId: number
	newWalletId: number
	newPoolId: number
	newAdditionalString: string
	newConfigFile: string
	newHugePages: number
}

const ResponseRuntype = rt.String

export const editFlightSheetWithCpu = makeApiFunc<Request, typeof ResponseRuntype>("POST", 'edit/flight-sheet-with-cpu', ResponseRuntype)

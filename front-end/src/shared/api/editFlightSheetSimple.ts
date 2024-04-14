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
}

const ResponseRuntype = rt.String

export const editFlightSheetSimple = makeApiFunc<Request, typeof ResponseRuntype>("POST", 'edit/flight-sheet', ResponseRuntype)

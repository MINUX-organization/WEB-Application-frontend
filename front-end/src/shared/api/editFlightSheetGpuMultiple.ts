import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {
  id: number
	newName: string
	newMinerId: number
	newAdditionalString: string
	newConfigs: Array<{
		walletId: number
		poolId: number
		cryptocurrencyId: number
	}>
}

const ResponseRuntype = rt.String

export const editFlightSheetGpuMultiple = makeApiFunc<Request, typeof ResponseRuntype>("POST", 'edit/flight-sheet-multiple', ResponseRuntype)

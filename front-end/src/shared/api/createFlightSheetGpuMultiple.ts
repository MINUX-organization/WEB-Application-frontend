import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {
  name: string
  minerId: number,
  additionalString: string,
  configs: Array<{
    poolId: number,
    cryptocurrencyId: number,
    walletId: number,
  }>
}

const ResponseRuntype = rt.String

export const createFlightSheetGpuMultiple = makeApiFunc<Request, typeof ResponseRuntype>("POST", 'create/flight-sheet-multiple', ResponseRuntype)

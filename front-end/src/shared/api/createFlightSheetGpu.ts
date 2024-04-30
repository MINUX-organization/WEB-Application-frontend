import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {
  name: string
  cryptocurrencyId: number,
  minerId: number,
  walletId: number,
  poolId: number,
  additionalString: string
}

const ResponseRuntype = rt.String

export const createFlightSheetGpu = makeApiFunc<Request, typeof ResponseRuntype>("POST", 'create/flight-sheet', ResponseRuntype)

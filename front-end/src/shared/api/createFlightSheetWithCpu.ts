import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {
  name: string,
  cryptocurrencyId: number,
  minerId: number,
  walletId: number,
  poolId: number,
  additionalString: string,
  configFile: string,
  hugePages: number
}

const ResponseRuntype = rt.String

export const createFlightSheetWithCpu = makeApiFunc<Request, typeof ResponseRuntype>("POST", 'create/flight-sheet-with-cpu', ResponseRuntype)

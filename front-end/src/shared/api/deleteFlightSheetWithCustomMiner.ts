import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {
  id: number
}

const ResponseRuntype = rt.String;

export const deleteFlightSheetWithCustomMiner = makeApiFunc<Request, typeof ResponseRuntype>("DELETE", 'delete/flight-sheet-with-custom-miner', ResponseRuntype)

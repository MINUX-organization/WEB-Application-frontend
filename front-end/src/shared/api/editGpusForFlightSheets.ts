import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {
  gpusForFlightSheets: Array<{
    id: number
    flightSheetId: number | null
  }>
}

const ResponseRuntype = rt.String;

export const editGpusForFlightSheets = makeApiFunc<Request, typeof ResponseRuntype>("POST", 'other-data/edit-gpus-for-flight-sheets', ResponseRuntype)

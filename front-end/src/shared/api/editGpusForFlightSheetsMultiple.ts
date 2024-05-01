import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {
  gpusForFlightSheets: Array<{
    id: number
    flightSheetMultipleId: number | null
  }>
}

const ResponseRuntype = rt.String;

export const editGpusForFlightSheetsMultiple = makeApiFunc<Request, typeof ResponseRuntype>("POST", 'other-data/edit-gpus-for-flight-sheets-multiple', ResponseRuntype)

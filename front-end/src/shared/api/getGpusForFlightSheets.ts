import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {}

const ResponseRuntype = rt.Record({
  gpusForFlightSheets: rt.Array(rt.Record({
    id: rt.Number,
    name: rt.Union(rt.Null, rt.String),
    flightSheetId: rt.Union(rt.Null, rt.Number)
  }))
})

export const getGpusForFlightSheets = makeApiFunc<Request, typeof ResponseRuntype>("GET", 'other-data/get-gpus-for-flight-sheets', ResponseRuntype)

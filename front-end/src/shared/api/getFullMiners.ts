import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {}

const ResponseRuntype = rt.Record({
  miners: rt.Array(rt.Record({
    id: rt.Number,
    name: rt.String,
    fullName: rt.String
  }))
})

export const getFullMiners = makeApiFunc<Request, typeof ResponseRuntype>("GET", 'other-data/get-full-miners', ResponseRuntype)

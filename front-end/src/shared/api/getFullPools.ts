import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {}

const ResponseRuntype = rt.Record({
  pools: rt.Array(rt.Record({
    id: rt.Number,
    host: rt.String,
    port: rt.Number,
    cryptocurrencyId: rt.Number
  }))
})

export const getFullPools = makeApiFunc<Request, typeof ResponseRuntype>("GET", 'other-data/get-full-pools', ResponseRuntype)

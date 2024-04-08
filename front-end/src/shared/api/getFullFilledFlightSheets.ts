import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {}

const ResponseRuntype = rt.Record({
  flightSheets: rt.Array(rt.Record({
    id: rt.Number,
    name: rt.String,
    additionalString: rt.String,
    cryptocurrency: rt.Record({
      id: rt.Number,
      name: rt.String,
      fullName: rt.String,
      algorithmId: rt.Number
    }),
    wallet: rt.Record({
      id: rt.Number,
      name: rt.String,
      source: rt.String,
      address: rt.String,
      cryptocurrencyId: rt.Number
    }),
    miner: rt.Record({
      id: rt.Number,
      name: rt.String,
      fullName: rt.String
    }),
    pool: rt.Record({
      id: rt.Number,
      host: rt.String,
      port: rt.Number,
      cryptocurrencyId: rt.Number
    }),
    algorithm: rt.Record({
      id: rt.Number,
      name: rt.String
    })
  }))
})

export const getFullFilledFlightSheets = makeApiFunc<Request, typeof ResponseRuntype>("GET", 'other-data/get-full-filled-flight-sheets', ResponseRuntype)

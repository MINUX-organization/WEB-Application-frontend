import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {}

const ResponseRuntype = rt.Record({
  settingGpus: rt.Array(rt.Record({
    gpuId: rt.Number,
    gpuSetupId: rt.Number,
    memoryClock: rt.Number,
    coreClock: rt.Number,
    powerLimit: rt.Number,
    fanSpeed: rt.Number,
    flightSheetId: rt.Union(rt.Null, rt.Number),
    name: rt.Union(rt.Null, rt.String)
  }))
})

export const getSettingsGpus = makeApiFunc<Request, typeof ResponseRuntype>("GET", 'other-data/get-settings-gpus', ResponseRuntype)

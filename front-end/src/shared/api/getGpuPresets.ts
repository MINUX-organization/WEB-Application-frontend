import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {
  gpuId: number
}

const ResponseRuntype = rt.Record({
  gpuPresets: rt.Array(rt.Record({
    name: rt.String,
    id: rt.Number,
    memoryClock: rt.Number,
    coreClock: rt.Number,
    powerLimit: rt.Number,
    critTemp: rt.Number,
    fanSpeed: rt.Number,
    gpuUuid: rt.String
  }))
})

export const getGpuPresets = makeApiFunc<Request, typeof ResponseRuntype>("POST", 'other-data/get-gpu-presets', ResponseRuntype)

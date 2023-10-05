import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {
  gpuId: number
}

const ResponseRuntype = rt.Record({
	gpuSetup: rt.Record({
		id: rt.Number,
		memoryClock: rt.Number,
		coreClock: rt.Number,
		powerLimit: rt.Number,
		critTemp: rt.Number,
		fanSpeed: rt.Number,
		flightSheetId: rt.Union(rt.Number, rt.Null),
		gpuUuid: rt.String
	})
})

export const getGpuSetup = makeApiFunc<Request, typeof ResponseRuntype>("POST", 'other-data/get-gpu-setup', ResponseRuntype)

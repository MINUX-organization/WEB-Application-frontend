import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {
  gpuSetupId: number
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
		gpuUuid: rt.String,
		options: rt.Record({
			temperature: rt.Record({
				maximumCritical: rt.Number,
				enforcedCritical: rt.Number
			}),
			power: rt.Record({
				defaultLimit: rt.Number,
				enforcedLimit: rt.Number,
				minimal: rt.Number,
				maximum: rt.Number
			}),
			clocks: rt.Record({
				minimalCore: rt.Number,
				maximumCore: rt.Number,
				enforcedCore: rt.Number,
				minimalMemory: rt.Number,
				maximumMemory: rt.Number,
				enforcedMemory: rt.Number
			})
		})
	})
})

export const getGpuSetup = makeApiFunc<Request, typeof ResponseRuntype>("POST", 'other-data/get-gpu-setup', ResponseRuntype)

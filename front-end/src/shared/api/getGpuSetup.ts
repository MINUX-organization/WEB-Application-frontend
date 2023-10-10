import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {
  gpuSetupId: number
}

const ResponseRuntype = rt.Record({
	gpuSetup: rt.Record({
		id: rt.Number,
		memoryClockOffset: rt.Number,
		coreClockOffset: rt.Number,
		powerLimit: rt.Number,
		critTemp: rt.Number,
		fanSpeed: rt.Number,
		flightSheetId: rt.Union(rt.Number, rt.Null),
		gpuUuid: rt.String,
		options: rt.Record({
			temperature: rt.Record({
				maximumCritical: rt.Number,
			}),
			power: rt.Record({
				defaultLimit: rt.Number,
				minimal: rt.Number,
				maximum: rt.Number
			}),
			clocks: rt.Record({
				minimalCoreOffset: rt.Number,
				maximumCoreOffset: rt.Number,
				minimalMemoryOffset: rt.Number,
				maximumMemoryOffset: rt.Number,
			})
		})
	})
})

export const getGpuSetup = makeApiFunc<Request, typeof ResponseRuntype>("POST", 'other-data/get-gpu-setup', ResponseRuntype)

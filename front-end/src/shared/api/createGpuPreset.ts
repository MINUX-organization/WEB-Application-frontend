import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {
  name: string
  memoryClockOffset: number
	coreClockOffset: number
	powerLimit: number
	critTemp: number
	fanSpeed: number
	gpuId: number
}

const ResponseRuntype = rt.String

export const createGpuPreset = makeApiFunc<Request, typeof ResponseRuntype>("POST", 'create/gpu-preset', ResponseRuntype)

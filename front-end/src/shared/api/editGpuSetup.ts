import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {
  id: number
	newMemoryClockOffset: number
	newCoreClockOffset: number
	newPowerLimit: number
	newCritTemp: number
	newFanSpeed: number
	// newFlightSheetId: number | null
}

const ResponseRuntype = rt.String

export const editGpuSetup = makeApiFunc<Request, typeof ResponseRuntype>("POST", 'edit/gpu-setup', ResponseRuntype)

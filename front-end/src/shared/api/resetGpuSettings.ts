import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {}

const ResponseRuntype = rt.String

export const resetGpuSettings = makeApiFunc<Request, typeof ResponseRuntype>("POST", '/other-data/reset-gpu-settings', ResponseRuntype)

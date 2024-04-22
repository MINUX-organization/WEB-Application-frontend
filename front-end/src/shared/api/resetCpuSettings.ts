import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {}

const ResponseRuntype = rt.String

export const resetCpuSettings = makeApiFunc<Request, typeof ResponseRuntype>("POST", '/other-data/reset-cpu-settings', ResponseRuntype)

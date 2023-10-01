import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {}

const ResponseRuntype = rt.String // empty string

export const commandPowerOff = makeApiFunc<Request, typeof ResponseRuntype>("POST", 'power-off', ResponseRuntype)

import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {}

const ResponseRuntype = rt.Record({
  status: rt.Boolean
})

export const commandPowerOff = makeApiFunc<Request, typeof ResponseRuntype>("POST", 'commands/power-off', ResponseRuntype)

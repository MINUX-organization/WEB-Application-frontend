import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {
  startupDelay: number
}

const ResponseRuntype = rt.Record({
  status: rt.Boolean
})

export const commandSystemReboot = makeApiFunc<Request, typeof ResponseRuntype>("POST", 'commands/reboot', ResponseRuntype)

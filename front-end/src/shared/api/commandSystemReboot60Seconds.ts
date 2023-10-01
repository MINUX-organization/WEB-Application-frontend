import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {}

const ResponseRuntype = rt.String

export const commandSystemReboot60Seconds = makeApiFunc<Request, typeof ResponseRuntype>("POST", 'commands/reboot-60-seconds', ResponseRuntype)

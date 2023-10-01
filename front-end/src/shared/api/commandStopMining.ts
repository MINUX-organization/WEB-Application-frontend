import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {}

const ResponseRuntype = rt.String

export const commandStopMining = makeApiFunc<Request, typeof ResponseRuntype>("POST", 'stop-mining', ResponseRuntype)

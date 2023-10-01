import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {}

const ResponseRuntype = rt.Record({
  status: rt.Boolean
})

export const commandStartMining = makeApiFunc<Request, typeof ResponseRuntype>("POST", 'commands/start-mining', ResponseRuntype)

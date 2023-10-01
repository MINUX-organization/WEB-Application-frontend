import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {}

const ResponseRuntype = rt.String

export const commandStartMining = makeApiFunc<Request, typeof ResponseRuntype>("POST", 'commands/start-mining', ResponseRuntype)

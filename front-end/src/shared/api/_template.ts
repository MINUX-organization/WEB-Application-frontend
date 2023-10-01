import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {}

const ResponseRuntype = rt.Record({

})

export const template = makeApiFunc<Request, typeof ResponseRuntype>("GET", 'template', ResponseRuntype)

import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {
  id: number
}

const ResponseRuntype = rt.String;

export const deleteCryptocurrency = makeApiFunc<Request, typeof ResponseRuntype>("DELETE", 'delete/cryptocurrency', ResponseRuntype)

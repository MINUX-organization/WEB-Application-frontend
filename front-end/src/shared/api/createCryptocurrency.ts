import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {
  name: string
  fullName: string
  algorithmId: number
}

const ResponseRuntype = rt.String

export const createCryptocurrency = makeApiFunc<Request, typeof ResponseRuntype>("POST", 'create/cryptocurrency', ResponseRuntype)

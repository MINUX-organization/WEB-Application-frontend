import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {
  id: number
  newName: string
  newFullName: string
  newAlgorithmId: number
}

const ResponseRuntype = rt.String

export const editCryptocurrency = makeApiFunc<Request, typeof ResponseRuntype>("POST", 'edit/cryptocurrency', ResponseRuntype)

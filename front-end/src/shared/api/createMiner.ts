// type TRequest = {
//   name: string
//   fullName: string
//   algorithmIdList: number[]
// }

// type TResponse = {
//   ok: boolean
// }

// export const createMiner = async (request: TRequest): Promise<TResponse> => {
//   return await new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve({ ok: true })
//     }, 1000)
//   })
// }


import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {
  name: string
  fullName: string
}

const ResponseRuntype = rt.String

export const createMiner = makeApiFunc<Request, typeof ResponseRuntype>("POST", 'create/miner', ResponseRuntype)

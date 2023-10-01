// type TRequest = {
//   cryptocurrencyId: number,
//   domain: string
//   port: number
// }

// type TResponse = {
//   ok: boolean
// }

// export const createPool = async (request: TRequest): Promise<TResponse> => {
//   return await new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve({ ok: true })
//     }, 1000)
//   })
// }


import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {
  host : string,
	port : number,
	cryptocurrencyId : number
}

const ResponseRuntype = rt.String

export const createPool = makeApiFunc<Request, typeof ResponseRuntype>("GET", 'create/pool', ResponseRuntype)

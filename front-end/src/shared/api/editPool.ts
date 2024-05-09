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
  newHost : string,
	newPort : number,
	newCryptocurrencyId : number
}

const ResponseRuntype = rt.String

export const editPool = makeApiFunc<Request, typeof ResponseRuntype>("POST", 'edit/pool', ResponseRuntype)

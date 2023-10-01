// type TRequest = {
//   cryptocurrencyId: number,
//   name: string,
//   source: string,
//   address: string
// }

// type TResponse = {
//   ok: boolean
// }

// export const createWallet = async (request: TRequest): Promise<TResponse> => {
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
  source: string
  address: string
  cryptocurrencyId: number
}

const ResponseRuntype = rt.String

export const createWallet = makeApiFunc<Request, typeof ResponseRuntype>("GET", 'create/wallet', ResponseRuntype)

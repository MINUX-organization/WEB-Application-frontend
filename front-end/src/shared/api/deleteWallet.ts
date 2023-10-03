// type TRequest = {
//   walletId: number
// }

// type TResponse = {
//   ok: boolean
// }

// export const deleteWallet = async (request: TRequest): Promise<TResponse> => {
//   return await new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve({ ok: true })
//     }, 1000)
//   })
// }


import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {
  id: number
}

const ResponseRuntype = rt.String

export const deleteWallet = makeApiFunc<Request, typeof ResponseRuntype>("DELETE", 'delete/wallet', ResponseRuntype)

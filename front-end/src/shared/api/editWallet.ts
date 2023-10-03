// type TRequest = {
//   id: number,
//   cryptocurrencyId: number,
//   name: string,
//   source: string,
//   address: string
// }

// type TResponse = {
//   ok: boolean
// }

// export const updateWallet = async (request: TRequest): Promise<TResponse> => {
//   return await new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve({ ok: true })
//     }, 1000)
//   })
// }


import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {
  id: number,
  newName: string,
  newSource: string,
  newAddress: string
  newCryptocurrencyId: number,
}

const ResponseRuntype = rt.String

export const editWallet = makeApiFunc<Request, typeof ResponseRuntype>("POST", 'edit/wallet', ResponseRuntype)

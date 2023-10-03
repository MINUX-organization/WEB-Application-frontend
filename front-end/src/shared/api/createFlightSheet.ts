// import { TCryptocurrency, TMiner, TPool, TWallet } from "@/shared/types"

// type TRequest = {
//   cryptocurrency: TCryptocurrency,
//   wallet: TWallet,
//   pool: TPool,
//   miner: TMiner,
//   name: string
// }

// type TResponse = {
//   ok: boolean
// }

// export const createFlightSheet = async (request: TRequest): Promise<TResponse> => {
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
  cryptocurrencyId: number,
  minerId: number,
  walletId: number,
  poolId: number
}

const ResponseRuntype = rt.String

export const createFlightSheet = makeApiFunc<Request, typeof ResponseRuntype>("POST", 'create/flight-sheet', ResponseRuntype)

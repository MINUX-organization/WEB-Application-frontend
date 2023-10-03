// import { TCryptocurrency } from "@/shared/types"

// type TRequest = {}

// type TResponse = {
//   list: TCryptocurrency[]
// }

// export const getCryptocurrencyList = async (request: TRequest): Promise<TResponse> => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve({
//         list: [
//           { id: 0, name: 'BTC', fullName: 'Bitcoin', algorithmId: 0 },
//           { id: 1, name: 'GTC', fullName: 'Greencoin', algorithmId: 1 },
//           { id: 2, name: 'SibTC', fullName: 'Siberian Token Coin', algorithmId: 1 },
//           { id: 3, name: 'GoSCD', fullName: 'Golden Sweden Coin Dimark', algorithmId: 2 },
//           { id: 4, name: 'POC', fullName: 'Corn Oracle Peanuts', algorithmId: 0 },
//           { id: 5, name: 'TCD', fullName: 'Tokio Cito Drunk', algorithmId: 3 }
//         ]
//       })
//     }, 1000)
//   })
// }

import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {}

const ResponseRuntype = rt.Record({
  cryptocurrencies: rt.Array(rt.Record({
    id: rt.Number,
    name: rt.String,
    fullName: rt.String,
    algorithmId: rt.Number
  }))
})

export const getFullCryptocurrencies = makeApiFunc<Request, typeof ResponseRuntype>("GET", 'other-data/get-full-cryptocurrencies', ResponseRuntype)

// import { getSessionId } from "providers/AuthProvider"
// import { TFlightSheetFilled } from "@/shared/types"

// type TRequest = {}

// type TResponse = {
//   list: TFlightSheetFilled[]
// }

// export const getFullFlightSheets = async (request: TRequest): Promise<TResponse> => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (getSessionId() === 'dummySessionId') {
//         resolve({
//           list: [
//             {
//               id: 0,
//               name: 'my first flight sheet',
//               cryptocurrency: { id: 1, algorithmId: 1, fullName: 'Binance coin', name: 'BTC' },
//               wallet: { id: 0, address: '0x0384832988293842', cryptocurrencyId: 2, name: 'my wallet', source: 'some source' },
//               miner: { id: 0, name: 'Mine0', fullName: 'Miner full name0' },
//               pool: { id: 1, host: 'two-miners-host.com', port: 15322, cryptocurrencyId: 0 },
//               algorithm: { id: 1, name: 'krekkov' }
//             },
//             {
//               id: 1,
//               name: 'my second flight sheet',
//               cryptocurrency: { id: 1, algorithmId: 2, fullName: 'Green coin', name: 'GTC' },
//               wallet: { id: 0, address: '0x0384ffccc293842', cryptocurrencyId: 2, name: 'my wallet', source: 'some source' },
//               miner: { id: 1, name: 'Mine1', fullName: 'Miner full name1' },
//               pool: { id: 4, host: 'my-pools-host.com', port: 15322, cryptocurrencyId: 0 },
//               algorithm: { id: 2, name: 'Pinoccio' }
//             },
//             {
//               id: 2,
//               name: 'my third flight sheet',
//               cryptocurrency: { id: 1, algorithmId: 3, fullName: 'Orange coin', name: 'OTC' },
//               wallet: { id: 0, address: '0x03833242488293842', cryptocurrencyId: 2, name: 'my wallet', source: 'some source' },
//               miner: { id: 4, name: 'Mine4', fullName: 'Miner full name4' },
//               pool: { id: 3, host: 'shitcoin.com', port: 2553, cryptocurrencyId: 1 },
//               algorithm: { id: 3, name: 'Mucha' }
//             }
//           ]
//         })
//       }
//       reject("get user info error")
//     }, 1000)
//   })
// }

import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {}

const ResponseRuntype = rt.Record({
  flightSheets: rt.Array(rt.Record({
    id: rt.Number,
    name: rt.String,
    cryptocurrencyId: rt.Number,
    minerId: rt.Number,
    walletId: rt.Number,
    poolId: rt.Number
  }))
})

export const getFullFlightSheets = makeApiFunc<Request, typeof ResponseRuntype>("GET", 'other-data/get-full-flight-sheets', ResponseRuntype)

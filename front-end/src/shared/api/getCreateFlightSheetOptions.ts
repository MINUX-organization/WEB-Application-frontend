import { TAlgorithm, TCryptocurrency, TMiner, TPool, TWallet } from "@/shared/types"

type TRequest = {
}

type TResponse = {
  cryptocurrencies: TCryptocurrency[]
  wallets: TWallet[]
  pools: TPool[]
  algorithms: TAlgorithm[]
  miners: TMiner[]
  algorithmMiner: Array<{id: number, algorithmId: number, minerId: number}>
}

/**
 * this method will return tables of cryptocurrencies, algorithms, miners and algorithm_miner
 */
export const getCreateFlightSheetOptions = async (request: TRequest): Promise<TResponse> => {
  // this is only for test, must be replaced with actual request function
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        cryptocurrencies: [
          { id: 0, name: 'Shit Coin', fullName: 'Shit Coint Russia', algorithmId: 0 },
          { id: 1, name: 'Gold Coin', fullName: 'Gold Coin Simple', algorithmId: 1 },
          { id: 2, name: 'Green Coin', fullName: 'Green Coin Dimple', algorithmId: 1 },
          { id: 3, name: 'Purple Coin', fullName: 'Purple Coin Allergy', algorithmId: 2 },
          { id: 4, name: 'Orange Coin', fullName: 'Orange Coin Kipp', algorithmId: 3 },
        ],
        pools: [
          { id: 0, host: 'pool0-host.com', port: 3004, cryptocurrencyId: 0 },
          { id: 1, host: 'pool1-host.com', port: 25621, cryptocurrencyId: 0 },
          { id: 2, host: 'pool2-host.com', port: 8080, cryptocurrencyId: 1 },
          { id: 3, host: 'pool3-host.com', port: 6004, cryptocurrencyId: 1 },
          { id: 4, host: 'pool4-host.com', port: 2005, cryptocurrencyId: 2 },
          { id: 5, host: 'pool5-host.com', port: 6205, cryptocurrencyId: 4 }
        ],
        wallets: [
          { id: 0, name: 'wallet0', source: 'wallet0 source', address: '0x393420fe23902f20a1331c9320c9c09', cryptocurrencyId: 0},
          { id: 1, name: 'wallet1', source: 'wallet1 source', address: '0x393420fe3232453425432f2f2f32309', cryptocurrencyId: 0},
          { id: 2, name: 'wallet2', source: 'wallet2 source', address: '0x33fab480384000000b0a00323449c09', cryptocurrencyId: 1},
          { id: 3, name: 'wallet3', source: 'wallet3 source', address: '0x393420fe23902f20a1331c9320c9c01', cryptocurrencyId: 2},
          { id: 4, name: 'wallet4', source: 'wallet4 source', address: '0x3abcabababcccc000b0a00323449765', cryptocurrencyId: 3},
          { id: 5, name: 'wallet5', source: 'wallet5 source', address: '0x33f48493754938900b0a00323449c00', cryptocurrencyId: 3},
          { id: 6, name: 'wallet6', source: 'wallet6 source', address: '0x33fab48038423453420a00323449c35', cryptocurrencyId: 3}
        ],
        algorithms: [
          { id: 0, name: 'alg0' },
          { id: 1, name: 'alg1' },
          { id: 2, name: 'alg2' },
          { id: 3, name: 'alg3' },
        ],
        miners: [
          { id: 0, name: 'Mi0', fullName: 'Miner0 full' },
          { id: 1, name: 'Mi1', fullName: 'Miner1 full' },
          { id: 2, name: 'Mi2', fullName: 'Miner2 full' },
          { id: 3, name: 'Mi3', fullName: 'Miner3 full' },
        ],
        algorithmMiner: [
          { id: 0, algorithmId: 0, minerId: 0 },
          { id: 1, algorithmId: 1, minerId: 1 },
          // { id: 2, algorithm_id: 0, miner_id: 3 },
          // { id: 3, algorithm_id: 1, miner_id: 1 },
          // { id: 4, algorithm_id: 1, miner_id: 2 },
          // { id: 5, algorithm_id: 2, miner_id: 3 },
          // { id: 6, algorithm_id: 3, miner_id: 1 },
          // { id: 7, algorithm_id: 3, miner_id: 2 },
          // { id: 8, algorithm_id: 3, miner_id: 3 }
        ]
       })
    }, 1000)
  })
}

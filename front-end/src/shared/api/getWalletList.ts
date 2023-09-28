import { TWalletFilled } from "@shared/types"

type TRequest = {}

type TResponse = {
  list: TWalletFilled[]
}

export const getWalletList = async (request: TRequest): Promise<TResponse> => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ list: [
        {
          id: 0,
          cryptocurrency: { id: 0, name: 'BTC', fullName: 'Bitcoin', algorithmId: 1},
          name: 'Raven',
          source: 'Bybit BYBIT RAVEN',
          address: '0xfffffaaaaakdshiu4584ASddsa2dab5vd5g425sd4fesw'
        },
        {
          id: 1,
          cryptocurrency: { id: 1, name: 'GTC', fullName: 'GreenCoin', algorithmId: 2},
          name: 'HOHOHOHOHOH',
          source: 'Bybit MIble bimble kimple',
          address: '0xaaaaacccccc425324325324243242678987654678gwe'
        },
        {
          id: 2,
          cryptocurrency: { id: 2, name: 'OXZ', fullName: 'Oxford Crypto', algorithmId: 0},
          name: 'HOHOHOHOHOH',
          source: 'Bybit MIble bimble kimple',
          address: '0x32424k3242532432532424324267898765467851'
        },
        {
          id: 3,
          cryptocurrency: { id: 2, name: 'OXZ', fullName: 'Oxford Crypto', algorithmId: 0},
          name: 'SImple name',
          source: 'Bybit MIble bimble kimple',
          address: '0x32424k3242532432532424324267334678'
        }
      ] })
    }, 1000)
  })
}

type TRequest = {
  id: number,
  cryptocurrencyId: number,
  name: string,
  source: string,
  address: string
}

type TResponse = {
  ok: boolean
}

export const updateWallet = async (request: TRequest): Promise<TResponse> => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ ok: true })
    }, 1000)
  })
}

type TRequest = {
  cryptocurrencyId: number,
  name: string,
  source: string,
  address: string
}

type TResponse = {
  ok: boolean
}

export const createWallet = async (request: TRequest): Promise<TResponse> => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ ok: true })
    }, 1000)
  })
}

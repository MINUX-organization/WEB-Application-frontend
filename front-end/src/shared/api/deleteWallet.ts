type TRequest = {
  walletId: number
}

type TResponse = {
  ok: boolean
}

export const deleteWallet = async (request: TRequest): Promise<TResponse> => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ ok: true })
    }, 1000)
  })
}

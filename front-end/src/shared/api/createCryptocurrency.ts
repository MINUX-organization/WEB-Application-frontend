type TRequest = {
  shortName: string
  fullName: string
  algorithmId: number
}

type TResponse = {
  ok: boolean
}

export const createCryptocurrency = async (request: TRequest): Promise<TResponse> => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ ok: true })
    }, 1000)
  })
}

type TRequest = {
  name: string
  fullName: string
  algorithmIdList: number[]
}

type TResponse = {
  ok: boolean
}

export const createMiner = async (request: TRequest): Promise<TResponse> => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ ok: true })
    }, 1000)
  })
}

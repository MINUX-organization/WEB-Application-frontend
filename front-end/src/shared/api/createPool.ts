type TRequest = {
  domain: string
  port: number
}

type TResponse = {
  ok: boolean
}

export const createPool = async (request: TRequest): Promise<TResponse> => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ ok: true })
    }, 1000)
  })
}

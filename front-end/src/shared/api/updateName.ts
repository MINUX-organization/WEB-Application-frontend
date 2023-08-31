type TRequest = {
  name: string
}

type TResponse = { ok: boolean }

export const updateName = async (request: TRequest): Promise<TResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ ok: true })
    }, 1000)
  })
}

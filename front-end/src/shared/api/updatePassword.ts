type TRequest = {
  oldPassword: string
  newPassword: string
}

type TResponse = { ok: boolean }

export const updatePassword = async (request: TRequest): Promise<TResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ ok: true })
    }, 1000)
  })
}

type TRequest = {
  flightSheetId: number,
  gpuIdList: number[]
}

type TResponse = { ok: boolean }

export const updateFlightSheetGPUList = async (request: TRequest): Promise<TResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ ok: true })
    }, 1000)
  })
}

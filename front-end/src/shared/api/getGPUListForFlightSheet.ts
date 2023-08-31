type TRequest = {}

type TResponse = {
  list: Array<{ id: number, name: string, flightSheetId: number | null }>
}

export const getGPUListForFlightSheet = async (request: TRequest): Promise<TResponse> => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ list: [
        { id: 0, name: 'Nvidia RTX 1080', flightSheetId: 0 },
        { id: 1, name: 'Nvidia GeForce 940MX', flightSheetId: 1 },
        { id: 4, name: 'AMD bla bla', flightSheetId: 1 },
        { id: 6, name: 'Rizen idk', flightSheetId: 2 },
        { id: 7, name: 'Rizen idk', flightSheetId: 2 },
        { id: 8, name: 'Rizen idk', flightSheetId: 2 },
        { id: 10, name: 'Noname 1', flightSheetId: 1 },
        { id: 12, name: 'Noname 2', flightSheetId: 1 },
        { id: 13, name: 'Noname 3', flightSheetId: 1 },
        { id: 15, name: 'Kick the trick', flightSheetId: 4 },
        { id: 18, name: 'Kick the trick cpy', flightSheetId: 4 },
        { id: 21, name: 'Rizen idk', flightSheetId: 4 },
        { id: 23, name: 'Bimbo 123', flightSheetId: 6 },
        { id: 26, name: 'GPU my GPU', flightSheetId: 6 },
        { id: 32, name: 'integrated GPU hahahahaha', flightSheetId: 2 },
        { id: 34, name: 'Pick those flowers FLOW', flightSheetId: 2 }
      ] })
    }, 1000)
  })
}

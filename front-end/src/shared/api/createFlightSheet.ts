import { TCryptocurrency, TMiner, TPool, TWallet } from "@shared/types"

type TRequest = {
  cryptocurrency: TCryptocurrency,
  wallet: TWallet,
  pool: TPool,
  miner: TMiner,
  name: string
}

type TResponse = {
  ok: boolean
}

export const createFlightSheet = async (request: TRequest): Promise<TResponse> => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ ok: true })
    }, 1000)
  })
}

import { TAlgorithm } from "@shared/types"

type TRequest = {}

type TResponse = {
  list: TAlgorithm[]
}

export const getAlgorithmList = async (request: TRequest): Promise<TResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        list: [
          { id: 0, name: 'Haha alg1' },
          { id: 1, name: 'Haha alg2' },
          { id: 2, name: 'Pinnocio' },
          { id: 3, name: 'SImple Dimple' },
          { id: 4, name: 'Shmidttt' },
          { id: 5, name: 'Applicatiiiiiin' },
          { id: 6, name: 'Gurren' }
        ]
      })
    }, 200)
  })
}

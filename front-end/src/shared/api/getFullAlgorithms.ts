// import { TAlgorithm } from "@/shared/types"

// type TRequest = {}

// type TResponse = {
//   list: TAlgorithm[]
// }

// export const getFullAlgorithms = async (request: TRequest): Promise<TResponse> => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve({
//         list: [
//           { id: 0, name: 'Haha alg1' },
//           { id: 1, name: 'Haha alg2' },
//           { id: 2, name: 'Pinnocio' },
//           { id: 3, name: 'SImple Dimple' },
//           { id: 4, name: 'Shmidttt' },
//           { id: 5, name: '@/applicatiiiiiin' },
//           { id: 6, name: 'Gurren' }
//         ]
//       })
//     }, 200)
//   })
// }

import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {}

const ResponseRuntype = rt.Record({
  algorithms: rt.Array(rt.Record({
    id: rt.Number,
    name: rt.String
  }))
})

export const getFullAlgorithms = makeApiFunc<Request, typeof ResponseRuntype>("GET", 'other-data/get-full-algorithms', ResponseRuntype)

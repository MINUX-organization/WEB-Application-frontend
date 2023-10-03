import * as rt from 'runtypes'
import { makeApiFunc } from './_makeApiFunc'

type Request = {}

const ResponseRuntype = rt.Record({
  clocks: rt.Record({
    minimum: rt.Union(rt.Number, rt.Null),
    maximum: rt.Union(rt.Number, rt.Null),
  }),
  information: rt.Record({
    architecture: rt.Union(rt.String, rt.Null),
    cache: rt.Record({
      L1: rt.Union(rt.Null, rt.Number),
      L2: rt.Union(rt.Null, rt.Number),
      L3: rt.Union(rt.Null, rt.Number),
    }),
    cores: rt.Record({
      cpus: rt.Union(rt.Number, rt.Null),
      sockets: rt.Union(rt.Number, rt.Null),
      threadsPerCore: rt.Union(rt.Number, rt.Null),
      threadsPerSocket: rt.Union(rt.Number, rt.Null),
    }),
    manufacturer: rt.Union(rt.String, rt.Null), 
    modelName: rt.Union(rt.String, rt.Null),
    opModes: rt.Union(rt.String, rt.Null),
  }),
})

// type Response = rt.Static<typeof ResponseRuntype>

// export const getStaticCPU = async (request: TRequest): Promise<TResponse> => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve({
//         information: {
//           manufacturer: "Intel",
//           modelName: "i3-7100",
//           architecture: "x86_64",
//           opModes: "32-bit, 64-bit",
//           cores: {
//             cpus: 4,
//             threadsPerCore: 2,
//             threadsPerSocket: 2,
//             sockets: 1
//           },
//           cacheL2: 12,
//           cacheL3: 23
//         },
//         clocksMhz: {
//           max: 3900.0,
//           min: 800.0
//         }
//       })
//     }, 200)
//   })
// }

export const getStaticCpu = makeApiFunc<Request, typeof ResponseRuntype>('GET', 'static-data/get-cpu-data', ResponseRuntype)

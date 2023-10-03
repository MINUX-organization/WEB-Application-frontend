import * as rt from 'runtypes'
import { makeApiFunc } from './_makeApiFunc'

type Request = {}

export const ResponseRuntype = rt.Record({
  gpus: rt.Array(
    rt.Record({
      uuid: rt.Union(rt.String, rt.Null),
      information: rt.Record({
        driverVersion: rt.Union(rt.String, rt.Null),
        manufacturer: rt.Union(rt.String, rt.Null),
        pci: rt.Record({ 
          busId: rt.Union(rt.String, rt.Null),
          pciBusId: rt.Number 
        }),
        periphery: rt.Union(rt.String, rt.Null),
        serialNumber: rt.Union(rt.String, rt.Null),
        technology: rt.Record({
          name: rt.String,
          version: rt.String
        }),
      }),
      temperature: rt.Record({
        enforcedCritical: rt.Number,
        maximumCritical: rt.Number,
      }),
      memory: rt.Record({
        total: rt.Union(rt.Number, rt.Null)
      }),
      power: rt.Record({
        defaultLimit: rt.Union(rt.Number, rt.Null), 
        enforcedLimit: rt.Union(rt.Number, rt.Null), 
        maximum: rt.Union(rt.Number, rt.Null),
        minimal: rt.Union(rt.Number, rt.Null)
      }),
      clocks: rt.Record({
        enforcedCore: rt.Number,
        enforcedMemory: rt.Number,
        maximumCore: rt.Number,
        maximumMemory: rt.Number,
        minimalCore: rt.Number,
        minimalMemory: rt.Number
      })
    })
  )
})

// export const getStaticGPUList = async (request: TRequest): Promise<TResponse> => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve({
//         list: [
//           {
//             uuid: "jfsdkjf230423",
//             information: {
//               manufacturer: "Nvidia",
//               periphery: "RTX 3080 Ti",
//               driverVersion: "515.76",
//               architecture: "Ampere",
//               cudaVersion: "11.7", 
//               productArchitecture: "Ampere",
//               serialNumber: null, 
//               pci: {
//                 bus: "0x0b",
//                 deviceId: "0x250410de",
//                 busId: "00000000:0b:00.0"
//               }
//             },
//             temperatureCelsius: {
//               shutdown: 93, 
//               maxOperating: null 
//             },
//             memoryMb: {
//               total: 12288,
//             },
//             powerWatt: {
//               defaultLimit: 170, 
//               enforcedLimit: 170, 
//               minimal: 125,
//               maximum: 184
//             },
//             clocksMhz: {
//               coreMin: 100,
//               coreMax: 2000,
//               memMin: 150,
//               memMax: 2500
//             }
//           },
//           {
//             uuid: "jfsdkjf230423",
//             information: {
//               manufacturer: "Nvidia",
//               periphery: "RTX 3080 Ti",
//               driverVersion: "515.76",
//               architecture: "Ampere",
//               cudaVersion: "11.7", 
//               productArchitecture: "Ampere",
//               serialNumber: null, 
//               pci: {
//                 bus: "0x0b",
//                 deviceId: "0x250410de",
//                 busId: "00000000:0b:00.0"
//               }
//             },
//             temperatureCelsius: {
//               shutdown: 93, 
//               maxOperating: null 
//             },
//             memoryMb: {
//               total: 12288,
//             },
//             powerWatt: {
//               defaultLimit: 170, 
//               enforcedLimit: 170, 
//               minimal: 125,
//               maximum: 184
//             },
//             clocksMhz: {
//               coreMin: 100,
//               coreMax: 2000,
//               memMin: 150,
//               memMax: 2500
//             }
//           }
//         ]
//       })
//     }, 200)
//   })
// }

export const getStaticGPUList = makeApiFunc<Request, typeof ResponseRuntype>('GET', 'static-data/get-gpus-data', ResponseRuntype)

/* eslint-disable @typescript-eslint/no-redeclare */
import * as rt from 'runtypes' 

// export const Informations = rt.Record({
//   manufacturer: rt.Union(rt.String, rt.Null),
//   periphery: rt.Union(rt.String, rt.Null),
//   architecture: rt.Union(rt.String, rt.Null),
//   technology: rt.Record({version: rt.String, name: rt.String}),
//   driverVersion: rt.Union(rt.String, rt.Null),
//   cudaVersion: rt.Union(rt.String, rt.Null), 
//   productArchitecture: rt.Union(rt.String, rt.Null),
//   serialNumber: rt.Union(rt.String, rt.Null), 
//   pci: rt.Record({ 
//     busId: rt.Union(rt.String, rt.Null), 
//     pciBusId: rt.Union(rt.Number, rt.Null) 
//   })
// })
// export type Informations = rt.Static<typeof Informations>

// export const TemperatureCelsius = rt.Record({
//   maximumCritical: rt.Union(rt.Number, rt.Null), 
//   enforcedCritical: rt.Union(rt.Number, rt.Null), 
// })
// export type TemperatureCelsius = rt.Static<typeof TemperatureCelsius>

// export const Memory = rt.Record({
//   total: rt.Union(rt.Number, rt.Null)
// })
// export type Memory = rt.Static<typeof Memory>

// export const Power = rt.Record({
//   defaultLimit: rt.Union(rt.Number, rt.Null), 
//   enforcedLimit: rt.Union(rt.Number, rt.Null), 
//   minimal: rt.Union(rt.Number, rt.Null),
//   maximum: rt.Union(rt.Number, rt.Null)
// })
// export type Power = rt.Static<typeof Power>

// export const Clocks = rt.Record({
//   minimalCore: rt.Union(rt.Number, rt.Null), 
//   enforcedCore: rt.Union(rt.Number, rt.Null), 
//   maximumCore: rt.Union(rt.Number, rt.Null), 
//   minimalMemory: rt.Union(rt.Number, rt.Null),
//   enforcedMemory: rt.Union(rt.Number, rt.Null),
//   maximumMemory: rt.Union(rt.Number, rt.Null)
// })
// export type Clocks = rt.Static<typeof Clocks>

export const GpuStaticRunType = rt.Record({
  gpus: rt.Array(rt.Record({
    uuid: rt.Union(rt.String, rt.Null),
    information: rt.Record({
      manufacturer: rt.Union(rt.String, rt.Null),
      periphery: rt.Union(rt.String, rt.Null),
      architecture: rt.Union(rt.String, rt.Null),
      technology: rt.Record({version: rt.String, name: rt.String}),
      driverVersion: rt.Union(rt.String, rt.Null),
      cudaVersion: rt.Union(rt.String, rt.Null), 
      productArchitecture: rt.Union(rt.String, rt.Null),
      serialNumber: rt.Union(rt.String, rt.Null), 
      pci: rt.Record({ 
        busId: rt.Union(rt.String, rt.Null), 
        pciBusId: rt.Union(rt.Number, rt.Null) 
      })
    }),
    temperatureCelsius: rt.Record({
      maximumCritical: rt.Union(rt.Number, rt.Null), 
      enforcedCritical: rt.Union(rt.Number, rt.Null), 
    }),
    memory: rt.Record({
      total: rt.Union(rt.Number, rt.Null)
    }),
    power: rt.Record({
      defaultLimit: rt.Union(rt.Number, rt.Null), 
      enforcedLimit: rt.Union(rt.Number, rt.Null), 
      minimal: rt.Union(rt.Number, rt.Null),
      maximum: rt.Union(rt.Number, rt.Null)
    }),
    clocks: rt.Record({
      minimalCore: rt.Union(rt.Number, rt.Null), 
      enforcedCore: rt.Union(rt.Number, rt.Null), 
      maximumCore: rt.Union(rt.Number, rt.Null), 
      minimalMemory: rt.Union(rt.Number, rt.Null),
      enforcedMemory: rt.Union(rt.Number, rt.Null),
      maximumMemory: rt.Union(rt.Number, rt.Null)
    }) 
  }))
})

export type GpuStatic = rt.Static<typeof GpuStaticRunType>

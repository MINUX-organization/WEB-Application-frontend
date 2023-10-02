/* eslint-disable @typescript-eslint/no-redeclare */
import * as rt from 'runtypes';

// export const Information = rt.Record({
//   manufacturer: rt.Union(rt.String, rt.Null), 
//   modelName: rt.Union(rt.String, rt.Null), 
//   architecture: rt.Union(rt.String, rt.Null), 
//   opModes: rt.Union(rt.String, rt.Null), 
//   cores: rt.Record({ 
//     cpus: rt.Union(rt.Number, rt.Null), 
//     threadsPerCore: rt.Union(rt.Number, rt.Null), 
//     threadsPerSocket: rt.Union(rt.Number, rt.Null), 
//     sockets: rt.Union(rt.Number, rt.Null) 
//   }),
//   cache: rt.Record({
//     L1: rt.Number,
//     L2: rt.Number,
//     L3: rt.Number
//   })
// })

// export const Clocks = rt.Record({
//   minimum: rt.Union(rt.Number, rt.Null),
//   maximum: rt.Union(rt.Number, rt.Null),
// })
// export type ClocksMhz = rt.Static<typeof Clocks>

export const CpuStaticRunType = rt.Record({
  cpu: rt.Record({
    information: rt.Record({
      manufacturer: rt.Union(rt.String, rt.Null), 
      modelName: rt.Union(rt.String, rt.Null), 
      architecture: rt.Union(rt.String, rt.Null), 
      opModes: rt.Union(rt.String, rt.Null), 
      cores: rt.Record({ 
        cpus: rt.Union(rt.Number, rt.Null), 
        threadsPerCore: rt.Union(rt.Number, rt.Null), 
        threadsPerSocket: rt.Union(rt.Number, rt.Null), 
        sockets: rt.Union(rt.Number, rt.Null) 
      }),
      cache: rt.Record({
        L1: rt.Number,
        L2: rt.Number,
        L3: rt.Number
      })
    }),
    clocks: rt.Record({
      minimum: rt.Union(rt.Number, rt.Null),
      maximum: rt.Union(rt.Number, rt.Null),
    }) 
  })
})

export type CpuStatic = rt.Static<typeof CpuStaticRunType>

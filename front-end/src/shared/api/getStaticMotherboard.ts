import * as rt from 'runtypes'

type TRequest = {}

const TResponseRuntype = rt.Record({
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
    cacheL2: rt.Number,
    cacheL3: rt.Number
  }),
  clocksMhz: rt.Record({
      min: rt.Union(rt.Number, rt.Null),
      max: rt.Union(rt.Number, rt.Null),
  })
})

type TResponse = rt.Static<typeof TResponseRuntype>

export const getStaticCPU = async (request: TRequest): Promise<TResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        information: {
          manufacturer: "Intel",
          modelName: "i3-7100",
          architecture: "x86_64",
          opModes: "32-bit, 64-bit",
          cores: {
            cpus: 4,
            threadsPerCore: 2,
            threadsPerSocket: 2,
            sockets: 1
          },
          cacheL2: 12,
          cacheL3: 23
        },
        clocksMhz: {
          max: 3900.0,
          min: 800.0
        }
      })
    }, 200)
  })
}

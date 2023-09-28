import * as rt from 'runtypes'

type TRequest = {}

export const TResponseRuntype = rt.Record({
  list: rt.Array(
    rt.Record({
      uuid: rt.Union(rt.String, rt.Null),
      information: rt.Record({
        manufacturer: rt.Union(rt.String, rt.Null),
        periphery: rt.Union(rt.String, rt.Null),
        architecture: rt.Union(rt.String, rt.Null),
        driverVersion: rt.Union(rt.String, rt.Null),
        cudaVersion: rt.Union(rt.String, rt.Null), 
        productArchitecture: rt.Union(rt.String, rt.Null),
        serialNumber: rt.Union(rt.String, rt.Null), 
        pci: rt.Record({ 
          bus: rt.Union(rt.String, rt.Null), 
          deviceId: rt.Union(rt.String, rt.Null), 
          busId: rt.Union(rt.String, rt.Null) 
        })
      }),
      temperatureCelsius: rt.Record({
        shutdown: rt.Union(rt.Number, rt.Null), 
        maxOperating: rt.Union(rt.Number, rt.Null), 
      }),
      memoryMb: rt.Record({
        total: rt.Union(rt.Number, rt.Null)
      }),
      powerWatt: rt.Record({
        defaultLimit: rt.Union(rt.Number, rt.Null), 
        enforcedLimit: rt.Union(rt.Number, rt.Null), 
        minimal: rt.Union(rt.Number, rt.Null),
        maximum: rt.Union(rt.Number, rt.Null)
      }),
      clocksMhz: rt.Record({
        coreMin: rt.Union(rt.Number, rt.Null), 
        coreMax: rt.Union(rt.Number, rt.Null), 
        memMin: rt.Union(rt.Number, rt.Null), 
        memMax: rt.Union(rt.Number, rt.Null)
      })
    })
  )
})

type TResponse = rt.Static<typeof TResponseRuntype>

export const getStaticGPUList = async (request: TRequest): Promise<TResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        list: [
          {
            uuid: "jfsdkjf230423",
            information: {
              manufacturer: "Nvidia",
              periphery: "RTX 3080 Ti",
              driverVersion: "515.76",
              architecture: "Ampere",
              cudaVersion: "11.7", 
              productArchitecture: "Ampere",
              serialNumber: null, 
              pci: {
                bus: "0x0b",
                deviceId: "0x250410de",
                busId: "00000000:0b:00.0"
              }
            },
            temperatureCelsius: {
              shutdown: 93, 
              maxOperating: null 
            },
            memoryMb: {
              total: 12288,
            },
            powerWatt: {
              defaultLimit: 170, 
              enforcedLimit: 170, 
              minimal: 125,
              maximum: 184
            },
            clocksMhz: {
              coreMin: 100,
              coreMax: 2000,
              memMin: 150,
              memMax: 2500
            }
          },
          {
            uuid: "jfsdkjf230423",
            information: {
              manufacturer: "Nvidia",
              periphery: "RTX 3080 Ti",
              driverVersion: "515.76",
              architecture: "Ampere",
              cudaVersion: "11.7", 
              productArchitecture: "Ampere",
              serialNumber: null, 
              pci: {
                bus: "0x0b",
                deviceId: "0x250410de",
                busId: "00000000:0b:00.0"
              }
            },
            temperatureCelsius: {
              shutdown: 93, 
              maxOperating: null 
            },
            memoryMb: {
              total: 12288,
            },
            powerWatt: {
              defaultLimit: 170, 
              enforcedLimit: 170, 
              minimal: 125,
              maximum: 184
            },
            clocksMhz: {
              coreMin: 100,
              coreMax: 2000,
              memMin: 150,
              memMax: 2500
            }
          }
        ]
      })
    }, 200)
  })
}

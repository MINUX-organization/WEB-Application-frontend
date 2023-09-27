/* eslint-disable @typescript-eslint/no-redeclare */
import * as rt from 'runtypes' 


export const SystemInfo = rt.Record({
    systemInfo: rt.Record({
        motherboard: rt.String,
        cpu: rt.String,
        harddrive: rt.String,
        linux: rt.String,
        technologies: rt.Record({
            versions: rt.Record({
                opencl: rt.String,
                cuda: rt.String
            })
        }),
        cuda: rt.String,
        drivers: rt.Record({
            versions: rt.Record({
                amd: rt.String,
                nvidia: rt.String
            })
        }),
        minuxVersion: rt.String,
        localIp: rt.String, 
        macAddress: rt.String, 
    })
}) 
export type SystemInfo = rt.Static<typeof SystemInfo>
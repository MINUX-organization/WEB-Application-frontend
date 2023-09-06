/* eslint-disable @typescript-eslint/no-redeclare */
import * as rt from 'runtypes' 


export const SystemInfo = rt.Record({
    motherBoard: rt.String,
    cpu: rt.String,
    hd: rt.String,
    system: rt.String,
    openCl: rt.String,
    cuda: rt.String,
    driver: rt.String,
    minuxVer: rt.String,
    localIp: rt.String,
    globalIp: rt.String,
    macAdress: rt.String, 
}) 
export type SystemInfo = rt.Static<typeof SystemInfo>
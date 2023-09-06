/* eslint-disable @typescript-eslint/no-redeclare */
import * as rt from 'runtypes'

export const Information = rt.Record({
    totalWidthB: rt.Union(rt.Number, rt.Null),
    dataWidthB: rt.Union(rt.Number, rt.Null),
    sizeGb: rt.Union(rt.Number, rt.Null),
    formFactor: rt.Union(rt.String, rt.Null),
    type: rt.Union(rt.String, rt.Null),
    memorySpeedMts: rt.Union(rt.Number, rt.Null), 
    manufacturer: rt.Union(rt.String, rt.Null),
    serialNumber: rt.Union(rt.String, rt.Null),
    configuredMemorySpeedMts: rt.Union(rt.Number, rt.Null),
    configuredVoltageV: rt.Union(rt.Number, rt.Null)   
})

export const RamStatic = rt.Record({
    uuid: rt.Union(rt.String, rt.Null), 
    information: Information
})
export type RamStatic = rt.Static<typeof RamStatic>;
/* eslint-disable @typescript-eslint/no-redeclare */
import * as rt from 'runtypes' 

export const Information = rt.Record({
    manufacturer: rt.Union(rt.String, rt.Null),
    productName: rt.Union(rt.String, rt.Null),
    serialNumber: rt.Union(rt.String, rt.Null), 
})
export type Information = rt.Static<typeof Information>

export const RamSlots = rt.Record({
    type: rt.Union(rt.String, rt.Null),
    count: rt.Union(rt.Number, rt.Null),
    maxSpeed: rt.Union(rt.Number, rt.Null),
    maxCapacity: rt.Union(rt.Number, rt.Null), 
})
export type RamSlots = rt.Static<typeof RamSlots>

export const MotherboardStatic = rt.Record({
    uuid: rt.Union(rt.String, rt.Null),
    information: Information,
    ramSlots: RamSlots, 
    sataSlots: rt.Union(rt.Number, rt.Null),
    pciSlots: rt.Union(rt.Number, rt.Null), 
})
export type MotherboardStatic = rt.Static<typeof MotherboardStatic>;
/* eslint-disable @typescript-eslint/no-redeclare */
import * as rt from 'runtypes' 

export const Information = rt.Record({
    manufacturer: rt.Union(rt.String, rt.Null),
    productName: rt.Union(rt.String, rt.Null),
    serialNumber: rt.Union(rt.String, rt.Null), 
})
export type Information = rt.Static<typeof Information>

export const Slots = rt.Record({
    sata: rt.Union(rt.String, rt.Null),
    pci: rt.Union(rt.Number, rt.Null),
    ram: rt.Record({
        type: rt.Union(rt.String, rt.Null),
        maximumSpeed: rt.Union(rt.Number, rt.Null),
        maximumCapacity: rt.Union(rt.Number, rt.Null), 
    })
})
export type RamSlots = rt.Static<typeof Slots>

export const MotherboardStatic = rt.Record({
    motherboard: rt.Record({
        information: Information,
        slots: Slots, 
    }) 
})
export type MotherboardStatic = rt.Static<typeof MotherboardStatic>;
/* eslint-disable @typescript-eslint/no-redeclare */
import * as rt from 'runtypes'

export const HdDynamic = rt.Record({
    uuid: rt.Union(rt.String, rt.Null),
    temperature: rt.Union(rt.Number, rt.Null), 
    capacity: rt.Union(rt.Number, rt.Null), 
    free: rt.Union(rt.Number, rt.Null)   
})
export type HdDynamic = rt.Static<typeof HdDynamic>;
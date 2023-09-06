/* eslint-disable @typescript-eslint/no-redeclare */
import * as rt from 'runtypes'

export const Value = rt.Record({
    value: rt.Number,
    measurement: rt.String
});
export type Value = rt.Static<typeof Value>;

export const RamDynamic = rt.Record({
    uuid: rt.Union(rt.String, rt.Null), 
    total: Value,
    freeB: Value,  
})
export type RamDynamic = rt.Static<typeof RamDynamic>;
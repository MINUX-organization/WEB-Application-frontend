/* eslint-disable @typescript-eslint/no-redeclare */
import * as rt from 'runtypes';

export const Shares = rt.Record({
    accepted: rt.Union(rt.Number, rt.Null),
    rejected: rt.Union(rt.Number, rt.Null)
});
export type shares = rt.Static<typeof Shares> 


export const Hashrate = rt.Record({
    value: rt.Union(rt.Number, rt.Null), 
    measurement: rt.Union(rt.String, rt.Null),
}) 
export type Hashrate = rt.Static<typeof Hashrate>

export const Miner = rt.Record({
    id: rt.Union(rt.Number, rt.Null),
    fullName: rt.Union(rt.String, rt.Null),
}) 
export type Miner = rt.Static<typeof Hashrate> 

export const CpuDynamic = rt.Record({ 
    temperature: rt.Union(rt.Number, rt.Null),
    fanSpeed: rt.Union(rt.Number, rt.Null),
    clockSpeed: rt.Union(rt.Number, rt.Null),
    hashrate: Hashrate,
    powerUsage: rt.Union(rt.Number, rt.Null),
    algorithm: rt.Union(rt.String, rt.Null),
    miner: Miner,
    cryptocurrency: rt.Union(rt.String, rt.Null),
    minerUpTime: rt.Union(rt.String, rt.Null),
    shares: Shares
}) 
export type CpuDynamic = rt.Static<typeof CpuDynamic>
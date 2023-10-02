/* eslint-disable @typescript-eslint/no-redeclare */
import * as rt from 'runtypes';

// const Shares = rt.Record({
//   accepted: rt.Union(rt.Number, rt.Null),
//   rejected: rt.Union(rt.Number, rt.Null)
// });
// type shares = rt.Static<typeof Shares> 

// const Hashrate = rt.Record({
//   value: rt.Union(rt.Number, rt.Null), 
//   measurement: rt.Union(rt.String, rt.Null),
// }) 
// type Hashrate = rt.Static<typeof Hashrate>

// const Miner = rt.Record({
//   uuid: rt.Union(rt.String, rt.Null),
//   fullName: rt.Union(rt.String, rt.Null),
// }) 
// type Miner = rt.Static<typeof Miner> 

export const CpuDynamicRunType = rt.Record({ 
  temperature: rt.Union(rt.Number, rt.Null),
  clockSpeed: rt.Union(rt.Number, rt.Null),
  fanSpeed: rt.Union(rt.Number, rt.Null),
  hashrate: rt.Record({
    value: rt.Union(rt.Number, rt.Null), 
    measurement: rt.Union(rt.String, rt.Null),
  }),
  powerUsage: rt.Union(rt.Number, rt.Null),
  algorithm: rt.Union(rt.String, rt.Null),
  miner: rt.Record({
    uuid: rt.Union(rt.String, rt.Null),
    fullName: rt.Union(rt.String, rt.Null),
  }),
  cryptocurrency: rt.Union(rt.String, rt.Null),
  minerUpTime: rt.Union(rt.String, rt.Null),
  shares: rt.Record({
    accepted: rt.Union(rt.Number, rt.Null),
    rejected: rt.Union(rt.Number, rt.Null)
  })
})

export type CpuDynamic = rt.Static<typeof CpuDynamicRunType>
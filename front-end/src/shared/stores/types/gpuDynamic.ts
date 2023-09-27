/* eslint-disable @typescript-eslint/no-redeclare */
import * as rt from 'runtypes';

const Shares = rt.Record({
  accepted: rt.Union(rt.Number, rt.Null),
  rejected: rt.Union(rt.Number, rt.Null),
});
export type Shares = rt.Static<typeof Shares>;

export const Memory = rt.Record({
  reserved: rt.Union(rt.Number, rt.Null),
  used: rt.Union(rt.Number, rt.Null),
  free: rt.Union(rt.Number, rt.Null),
});
export type Memory = rt.Static<typeof Memory>;

export const Clocks = rt.Record({
  core: rt.Union(rt.Number, rt.Null), 
  memory: rt.Union(rt.Number, rt.Null), 
});
export type Clocks = rt.Static<typeof Clocks>; 

export const Hashrate = rt.Record({
  value: rt.Union(rt.Number, rt.Null),
  measurement: rt.Union(rt.String, rt.Null)
})

export const GpuDynamic = rt.Record({
  uuid: rt.Union(rt.String, rt.Null),
  fullName: rt.Union(rt.String, rt.Null),
  temperature: rt.Union(rt.Number, rt.Null),
  fanSpeed: rt.Union(rt.Number, rt.Null),
  hashrate: Hashrate,
  powerUsage: rt.Union(rt.Number, rt.Null),
  algorithm: rt.Union(rt.String, rt.Null),
  cryptocurrency: rt.Union(rt.String, rt.Null),
  miner: rt.Record({
    uuid: rt.Union(rt.String, rt.Null),
    fullName: rt.Union(rt.String, rt.Null)
  }),
  minerUpTime: rt.Union(rt.String, rt.Null),
  shares: Shares,
  memory: Memory,
  clocks: Clocks, 
});
export type GpuDynamic = rt.Static<typeof GpuDynamic>;

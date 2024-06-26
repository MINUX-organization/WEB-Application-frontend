/* eslint-disable @typescript-eslint/no-redeclare */
import * as rt from 'runtypes';

// const Shares = rt.Record({
//   accepted: rt.Union(rt.Number, rt.Null),
//   rejected: rt.Union(rt.Number, rt.Null),
// });
// type Shares = rt.Static<typeof Shares>;

// const Memory = rt.Record({
//   reserved: rt.Union(rt.Number, rt.Null),
//   used: rt.Union(rt.Number, rt.Null),
//   free: rt.Union(rt.Number, rt.Null),
// });
// type Memory = rt.Static<typeof Memory>;

// const Clocks = rt.Record({
//   core: rt.Union(rt.Number, rt.Null), 
//   memory: rt.Union(rt.Number, rt.Null), 
// });
// type Clocks = rt.Static<typeof Clocks>; 

// const Hashrate = rt.Record({
//   value: rt.Union(rt.Number, rt.Null),
//   measurement: rt.Union(rt.String, rt.Null)
// })

/**
 * to array:
 * hashrate, shares, cryptocurrencies, algorithm
 */

const cryptoRuntype = rt.Record({
  cryptocurrency: rt.Union(rt.String, rt.Null),
  algorithm: rt.Union(rt.String, rt.Null),
  shares: rt.Record({
    accepted: rt.Union(rt.Number, rt.Null),
    rejected: rt.Union(rt.Number, rt.Null),    
  }),
  hashrate: rt.Record({
    value: rt.Union(rt.Number, rt.Null),
    measurement: rt.Union(rt.String, rt.Null)
  }),
})

export const GpuDynamicRuntype = rt.Record({
  id: rt.Number,
  flightSheetName: rt.Union(rt.String, rt.Null),
  flightSheetWithCustomMinerName: rt.Union(rt.String, rt.Null),
  uuid: rt.Union(rt.String, rt.Null),
  fullName: rt.Union(rt.String, rt.Null),
  temperature: rt.Union(rt.Number, rt.Null),
  fanSpeed: rt.Union(rt.Number, rt.Null),
  crypto: rt.Record({
    "1": cryptoRuntype,
    "2": cryptoRuntype,
    "3": cryptoRuntype
  }),
  powerUsage: rt.Union(rt.Number, rt.Null),
  miner: rt.Record({
    uuid: rt.Union(rt.String, rt.Null),
    fullName: rt.Union(rt.String, rt.Null)
  }),
  minerUpTime: rt.Union(rt.String, rt.Null),
  memory: rt.Record({
    reserved: rt.Union(rt.Number, rt.Null),
    used: rt.Union(rt.Number, rt.Null),
    free: rt.Union(rt.Number, rt.Null),
  }),
  clocks: rt.Record({
    core: rt.Union(rt.Number, rt.Null), 
    memory: rt.Union(rt.Number, rt.Null), 
  })
});

export type GpuDynamic = rt.Static<typeof GpuDynamicRuntype>;

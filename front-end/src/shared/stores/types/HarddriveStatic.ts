/* eslint-disable @typescript-eslint/no-redeclare */
import * as rt from 'runtypes'

// export const Information = rt.Record({
//   deviceModel: rt.Union(rt.String, rt.Null),
//   serialNumber: rt.Union(rt.String, rt.Null), 
//   sataPorts: rt.Union(rt.String, rt.Null), 
//   capacity: rt.Union(rt.Number, rt.Null)  
// });
// export type Information = rt.Static<typeof Information>

export const HarddriveStaticRunType = rt.Record({
  harddrives: rt.Array(rt.Record({
    uuid: rt.Union(rt.String, rt.Null),
    information: rt.Record({
      deviceModel: rt.Union(rt.String, rt.Null),
      serialNumber: rt.Union(rt.String, rt.Null), 
      sataPorts: rt.Union(rt.String, rt.Null), 
      capacity: rt.Union(rt.Number, rt.Null)  
    })
  }))
})

export type HarddriveStatic = rt.Static<typeof HarddriveStaticRunType>;

/* eslint-disable @typescript-eslint/no-redeclare */
import * as rt from 'runtypes'

export const HarddriveDynamicRunType = rt.Record({
  uuid: rt.Union(rt.String, rt.Null),
  temperature: rt.Union(rt.Number, rt.Null), 
  capacity: rt.Union(rt.Number, rt.Null), 
  free: rt.Record({
    value: rt.Number,
    measurement: rt.String
  })
})

export type HarddriveDynamic = rt.Static<typeof HarddriveDynamicRunType>;

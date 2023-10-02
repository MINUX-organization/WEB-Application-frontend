/* eslint-disable @typescript-eslint/no-redeclare */
import * as rt from 'runtypes'

export const CoinsValue = rt.Record({
  coin: rt.String,
  algorithm: rt.String,
  value: rt.Number
})
export type CoinsValue = rt.Static<typeof CoinsValue>

export const CalculationsDynamicRunType = rt.Record({
  coinsValue: rt.Array(CoinsValue),
  totalSharesAccepted: rt.Number,    
  totalSharesRejected: rt.Number, 
  workingAlgorithms: rt.Number,
  workingMiners: rt.Number,
  totalPower: rt.Number,
  totalRam: rt.Number
})

export type CalculationsDynamic = rt.Static<typeof CalculationsDynamicRunType>

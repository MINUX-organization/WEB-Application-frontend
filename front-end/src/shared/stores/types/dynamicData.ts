/* eslint-disable @typescript-eslint/no-redeclare */
import * as rt from 'runtypes'
import { GpuDynamic } from './gpuDynamic';
import { CpuDynamic } from './cpuDynamic';
import { HdDynamic } from './hdDynamic';
import { RamDynamic } from './ramDynamic';
import { CalculationsDynamic } from './calculationsDynamic';


export const DynamicDataRunType = rt.Record({
    state: rt.Record({mining: rt.Boolean}),
    gpus: rt.Array(GpuDynamic),
    cpu: CpuDynamic, 
    harddrive: HdDynamic, 
    rams: rt.Array(RamDynamic),
    calculations: CalculationsDynamic 
})

export type DynamicData = rt.Static<typeof DynamicDataRunType>;
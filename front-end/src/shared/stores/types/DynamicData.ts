/* eslint-disable @typescript-eslint/no-redeclare */
import * as rt from 'runtypes'
import { GpuDynamic } from './GpuDynamic';
import { CpuDynamicRunType } from './CpuDynamic';
import { HarddriveDynamicRunType } from './HarddriveDynamic';
import { RamDynamic } from './RamDynamic';
import { CalculationsDynamicRunType } from './calculationsDynamic';

export const DynamicDataRunType = rt.Record({
  state: rt.Record({ mining: rt.Boolean }),
  gpus: rt.Array(GpuDynamic),
  cpu: CpuDynamicRunType, 
  harddrive: rt.Array(HarddriveDynamicRunType), 
  rams: rt.Array(RamDynamic),
  calculations: CalculationsDynamicRunType 
})

export type DynamicData = rt.Static<typeof DynamicDataRunType>;

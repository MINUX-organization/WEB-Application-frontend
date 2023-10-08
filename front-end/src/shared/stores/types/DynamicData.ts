/* eslint-disable @typescript-eslint/no-redeclare */
import * as rt from 'runtypes'
import { GpuDynamicRuntype } from './GpuDynamic';
import { CpuDynamicRunType } from './CpuDynamic';
import { HarddriveDynamicRunType } from './HarddriveDynamic';
import { RamDynamicRuntype } from './RamDynamic';
import { CalculationsDynamicRunType } from './calculationsDynamic';

export const DynamicDataRunType = rt.Record({
  state: rt.Record({ mining: rt.Boolean }),
  gpus: rt.Array(GpuDynamicRuntype),
  cpu: CpuDynamicRunType, 
  harddrives: rt.Array(HarddriveDynamicRunType), 
  rams: rt.Array(RamDynamicRuntype),
  calculations: CalculationsDynamicRunType 
})

export type DynamicData = rt.Static<typeof DynamicDataRunType>;

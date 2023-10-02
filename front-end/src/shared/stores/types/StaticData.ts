/* eslint-disable @typescript-eslint/no-redeclare */
import * as rt from 'runtypes' 
import { GpuStaticRunType } from './gpuStatic';
import { CpuStaticRunType } from './CpuStatic';
import { RamStaticRunType } from './RamStatic';
import { MotherboardStaticRunType } from './MotherboardStatic';
import { HarddriveStaticRunType } from './HarddriveStatic';
import { SystemInfoRunType } from './SystemInfo';
import { CalculationsStaticRunType } from './CalculationsStatic';

export const StaticDataRunType = rt.Record({
  gpu: rt.Array(GpuStaticRunType),
  cpu: CpuStaticRunType, 
  ram: rt.Array(RamStaticRunType),
  motherboard: MotherboardStaticRunType,
  hd: HarddriveStaticRunType,
  systemInfo: SystemInfoRunType,
  calculations: CalculationsStaticRunType
})

export type StaticData = rt.Static<typeof StaticDataRunType>;

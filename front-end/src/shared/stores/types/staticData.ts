/* eslint-disable @typescript-eslint/no-redeclare */
import * as rt from 'runtypes' 
import { GpuStatic } from './gpuStatic';
import { CpuStatic } from './cpuStatic';
import { RamStatic } from './ramStatic';
import { MotherboardStatic } from './motherboardStatic';
import { HdStatic } from './hdStatic';
import { SystemInfo } from './systemInfo';
import { CalculationsStatic } from './calculationsStatic';

export const StaticData = rt.Record({
    gpu: rt.Array(GpuStatic),
    cpu: CpuStatic, 
    ram: rt.Array(RamStatic),
    motherboard: MotherboardStatic,
    hd: HdStatic,
    systemInfo: SystemInfo,
    calculations: CalculationsStatic
})
export type StaticData = rt.Static<typeof StaticData>;
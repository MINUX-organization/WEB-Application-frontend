import React from 'react';
import './cpu.scss';
import { valueOrNA } from 'shared/utils';
import { getCpuFullName } from '@shared/api/getCpuFullName';
import { useQuery } from 'react-query';
import { useDynamicDataStore } from '@shared/stores';
import { CpuInfoItem } from './CpuInfoItem';

export default function Cpu() {
  const cpuFullName = useQuery((['load cpu full name']), getCpuFullName);
  const cpuDynamic = useDynamicDataStore((state) => state.data.cpu); 
  return (
    <div className='border-line'>
      <div className='flex-conteiner-cpu'>
        <div className='cpu-conteiner'>
          <span>CPU</span>
          <span className='text'>{valueOrNA(cpuFullName.data)}</span>
        </div> 
        <div className='cpu-info'>
          <div className='cpu-info-element'>
            <CpuInfoItem label="Shares accepted:" value={valueOrNA(cpuDynamic.shares.accepted)} />
            <CpuInfoItem label="Shares rejected:" value={valueOrNA(cpuDynamic.shares.rejected)} />
          </div>
          <div className='cpu-info-element'>
            <CpuInfoItem label="Hashrate:" value={`${valueOrNA(cpuDynamic.hashrate.value)} ${cpuDynamic.hashrate.measurement ?? "H/s"}`} />
            <CpuInfoItem label="Power:" value={`${valueOrNA(cpuDynamic.powerUsage)} Watt`} />
          </div>
          <div className='cpu-info-element'>
            <CpuInfoItem label="Clock Speed:" value={`${valueOrNA(cpuDynamic.clockSpeed)} Mhz`} />
            <CpuInfoItem label="Temperature:" value={`${valueOrNA(cpuDynamic.temperature)} °C`} />
          </div>
        </div>
      </div>
    </div>
  );
}
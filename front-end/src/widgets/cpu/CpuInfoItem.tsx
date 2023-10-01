import React from 'react';
import { valueOrNA } from '@/shared/utils';

type Props = {
    label: string,
    value: any,
}

export const CpuInfoItem = ({ label, value }: Props) => {
  return (
    <div className='flex justify-between'>
      <span className='text'>{label}</span>
      <span>{valueOrNA(value)}</span>
    </div>
  );
};
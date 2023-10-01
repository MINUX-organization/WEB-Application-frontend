import React from 'react' 
import '@/shared/styles/widgets-first-level.scss' 
import BoxWithBorder from '@/shared/components/BoxWithBorder'; 
import { useDynamicDataStore } from '@/shared/stores';

const name: string = 'Working miners'

export default function Miners() { 
  const workingMiners = useDynamicDataStore((state) => state.data.calculations.workingMiners)

  return (
    <BoxWithBorder name={name} count={workingMiners}/>
  )
}
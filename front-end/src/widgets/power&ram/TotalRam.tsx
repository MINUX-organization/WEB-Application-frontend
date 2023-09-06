import { useDynamicDataStore } from '@shared/stores'
import BoxWithBorder from 'shared/components/BoxWithBorder'

const name: string = 'Total Ram Usage' 

export default function TotalRam() {
  const totalRam = useDynamicDataStore((state) => state.data.calculations.totalRam)

  return (
    <BoxWithBorder name={name} count={totalRam} value='Gb' color2='value'/> 
  )
}
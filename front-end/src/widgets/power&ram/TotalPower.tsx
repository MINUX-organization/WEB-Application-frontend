import { useDynamicDataStore } from '@/shared/stores'; 
import BoxWithBorder from '@/shared/components/BoxWithBorder'

const name: string = 'Total Power Usage' 

export default function TotalPower() {
  const totalPower = useDynamicDataStore((state) => state.data.calculations.totalPower) 
  
  return (
    <BoxWithBorder name={name} count={totalPower} value='Watt' color2='value'/> 
  )
}
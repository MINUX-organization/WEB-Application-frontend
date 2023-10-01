import { useDynamicDataStore } from '@/shared/stores'
import BoxWithBorder from '@/shared/components/BoxWithBorder' 

const name: string = 'Total Shares Accepted' 

export default function SharesAccepted() { 
  const totalSharesAccepted = useDynamicDataStore((state) => state.data.calculations.totalSharesAccepted) 
  
  return ( 
    <BoxWithBorder name={name} count={totalSharesAccepted} color1='green'/> 
  )
}
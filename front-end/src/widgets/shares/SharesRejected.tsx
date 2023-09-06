import { useDynamicDataStore } from '@shared/stores'
import BoxWithBorder from 'shared/components/BoxWithBorder' 

const name: string = 'Total Shares Rejected'

export default function SharesRejected() { 
  const totalSharesRejected = useDynamicDataStore((state) => state.data.calculations.totalSharesRejected) 

  return ( 
    <BoxWithBorder name={name} count={totalSharesRejected} color1='red'/> 
  )
}
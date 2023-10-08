import TotalPower from './TotalPower'
import TotalRam from './TotalRam'
import './index.scss' 

export default function PowerRamWidget() {
  return (
    <div className='flex-container-shares'> 
      <TotalPower/> 
      <TotalRam/> 
    </div>
  )
}
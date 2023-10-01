import './monitoring.scss'
import WorkerWidget from '@/widgets/workers'
import SharesWidget from '@/widgets/shares'
import PowerRamWidget from '@/widgets/power&ram'
import { Cpu } from '@/widgets/cpu'
import { Coins } from '@/widgets/coins'
import { Gpu } from '@/widgets/gpu'
import { FooterSystemInfo } from '@/widgets/footerSystemInfo' 

export default function Monitoring() { 
  return (
    <div className='monitoring'>
      <div className='monitoring-main-content'>
        <div className='flex-container-monitoring'> 
          <WorkerWidget/> 
          <PowerRamWidget/> 
          <SharesWidget/> 
        </div>

        <div className='flex-container-monitoring'>
          <Cpu/>
          <Coins/>
        </div>

        <div className='flex-container-monitoring'>
          <Gpu/>
        </div> 
      </div>

      <div className='flex-container-monitoring-footer'>
        <FooterSystemInfo/>
      </div>
    </div>
  )
}

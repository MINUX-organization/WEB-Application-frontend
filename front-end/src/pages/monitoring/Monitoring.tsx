import React from 'react' 
import './monitoring.scss'
import WorkerWidget from 'widgets/workers'
import SharesWidget from 'widgets/shares'
import PowerRamWidget from 'widgets/power&ram'
import Cpu from 'widgets/cpu/Cpu'
import Coins from 'widgets/coins/Coins'

export default function Monitoring() { 
    return (
      <div className='monitoring'>
        <div className='flex-conteiner-monitoring'> 
          <WorkerWidget/> 
           
          <PowerRamWidget/> 
           
          <SharesWidget/> 
        </div>

        <div className='flex-conteiner-monitoring'>
          <Cpu/>

          <Coins/>
        </div>
      </div>
  ) 
}
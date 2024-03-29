import { useState } from 'react'
import { GpuDynamic } from '@/shared/stores/types/GpuDynamic'

type Props = {
  item: GpuDynamic
}

export default function GpuItem({ item }: Props) {
  const [isClose, setIsClose] = useState(true); 
  const clickHandler = () => {
    setIsClose(!isClose);
  }

  return ( 
    <div className='wrapper' onClick={clickHandler}> 
      <div className='grid-row-value'> 
        <span className={'span-1'}>{item.id}</span> 
        <span className={'span-2'}>{item.fullName}</span> 
        <span className={'span-3'}>{item.shares.accepted}</span> 
        <span className={'span-4'}>{item.shares.rejected}</span> 
        <span className={'span-5'}>{item.hashrate.value?.toFixed(3)}<span className="power-unit">{item.hashrate.measurement}</span></span> 
        <span className={'span-6'}>{item.temperature}<span className="power-unit">°C</span></span>
        <span className={'span-7'}>{item.fanSpeed}<span className="power-unit">%</span></span>
        <span className={'span-8'}>{item.powerUsage}<span className="power-unit">W</span></span> 
      </div>
      <div className={`overflow ${isClose ? '' : 'active'}`} >
        <div className='gpu-popup'>
          <div className='gpu-flex-data'>
            <div className='flex w-52 justify-between'>
              <p className='opacity-[65%]'>Crypto</p>
              <p>{item.cryptocurrency}</p> 
            </div>
            <div className='flex w-52 justify-between'>
              <p className='opacity-[65%]'>Miner</p>
              <p>{item.miner.fullName}</p> 
            </div>
          </div>
          <div className='gpu-flex-data-1'>
            <p className='opacity-[65%]'>Miner up time</p>
            <p>{item.minerUpTime}</p>
          </div>
        </div> 
      </div>
    </div>
  )
}

import React, { useId, useState } from 'react'
import { GpuDynamic } from '@/shared/stores/types/gpuDynamic'

type Props = {
    item: GpuDynamic
    index: number
}

interface gpuTicket {
    index: number 
    name: string | null
    accepted: number | null
    rejected: number | null
    hashrate: string
    temperature: number | null
    fanSpeed: number | null
    powerUsage: number | null
}

export default function GpuItem({item, index}: Props) {
    const id = useId();

    const [isClose, setIsClose] = useState(true); 

    const clickHandler = () => {
        setIsClose(!isClose);
    }

  return ( 
    <>
        <div className='wrapper' onClick={clickHandler}> 
            <div className='grid-row-value'> 
                <span className={'span-1'}>{index}</span> 
                <span className={'span-2'}>{item.fullName}</span> 
                <span className={'span-3'}>{item.shares.accepted}</span> 
                <span className={'span-4'}>{item.shares.accepted}</span> 
                <span className={'span-5'}>{`${item.hashrate.value} ${item.hashrate.measurement}`}</span> 
                <span className={'span-6'}>{item.temperature + ' °C'}</span> 
                <span className={'span-7'}>{item.fanSpeed + ' %'}</span> 
                <span className={'span-8'}>{item.powerUsage}</span> 
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

    </>
  )
}
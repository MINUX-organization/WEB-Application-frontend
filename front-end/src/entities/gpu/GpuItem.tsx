import React, { useState } from 'react'
import { GpuDynamic } from '@shared/stores/types/gpuDynamic'

type Props = {
    item: GpuDynamic
    index: number
}

interface gpuTicket {
    index: number
    name: string | null
    accepted: number | null
    rejected: number | null
    hashrate: object
    temperature: number | null
    fanSpeed: number | null
    powerUsage: number | null
}

export default function GpuItem({item, index}: Props) {

    const [isClose, setIsClose] = useState(true); 

    const gpuCard: gpuTicket = {
        index: index,
        name: item.fullName,
        accepted: item.shares.accepted,
        rejected: item.shares.rejected,
        hashrate: {value: item.hashrate.value, measurement: item.hashrate.measurement},
        temperature: item.temperature,
        fanSpeed: item.temperature,
        powerUsage: item.powerUsage
    }

    const clickHandler = () => {
        setIsClose(!isClose);
    }

    const values = Object.values(gpuCard)
  return ( 
    <>
        <div className='wrapper' onClick={clickHandler}> 
            <div className='grid-row-value'> 
                {values.map((item, index) => (  
                    <span key={item} className={'span-' + (index + 1)}>{item}</span> 
                ))} 
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
                            <p>{item.miner}</p> 
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
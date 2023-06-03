import React from 'react'
import TotalPower from './TotalPower'
import TotalRam from './TotalRam'
import './index.scss' 

export default function PowerRamWidget() {
  return (
    <div className='flex-conteiner-shares'> 
            <TotalPower/> 
            <TotalRam/> 
    </div>
  )
}
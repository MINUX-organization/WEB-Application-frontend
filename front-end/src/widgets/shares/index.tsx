import React from 'react'
import SharesAccepted from './SharesAccepted'
import SharesRejected from './SharesRejected'
import './index.scss' 

export default function SharesWidget() {
  return (
    <div className='flex-container-shares'> 
      <SharesAccepted/> 
      <SharesRejected/> 
    </div>
  )
}
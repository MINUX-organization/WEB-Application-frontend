import React from 'react'
import './coins.scss'
import CoinsScroll from './CoinsScroll' 

export default function Coins() { 
  return ( 
    <div className='flex-container-coin'>
        <div className='border-line'> 
          <div className='coin-container'>
              <span>Coin</span>
              <span>Algorithm</span>
              <span>Value</span>
          </div>   
        </div> 

        <CoinsScroll/>
    </div>
  )
}
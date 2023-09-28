import styles from './Aside.module.scss'
import { AsideItem } from './AsideItem'
import picMine from '@shared/images/stop-mining.png'
import powerOff from '@shared/images/power-off.svg'
import { useDynamicDataStore } from '@shared/stores'
import React, { useEffect, useRef } from 'react'
import { useStateObj } from '@shared/lib'
import { FDropAside } from '@widgets/Layout/model/FDropAside'
import { commandPowerOff } from '@shared/api/commandPowerOff'
import { commandSystemReboot } from '@shared/api/commandSystemReboot'
import { commandSystemRebootWithDelay } from '@shared/api/commandSystemRebootWithDelay'
import { commandStartMining } from '@shared/api/commandStartMining'
import { commandStopMining } from '@shared/api/commandStopMining'

export const Aside = () => {
  const asideRef = useRef<HTMLDivElement>(null)
  const isDropAsideOpen = useStateObj<boolean>(false);
  const isMining = useDynamicDataStore((state) => state.data.state.mining )
  const updateDynamicData = useDynamicDataStore((state) => state.updateDynamicData); 

  const toggleMiningState = () => { 
    const newState = {
      state: {
        mining: !isMining,
      },
    };
    updateDynamicData(newState);
  }
  
  const fields = [
    {label: 'Power off', onSelect: commandPowerOff}, 
    {label: 'Reboot', onSelect: commandSystemReboot}, 
    {label: 'Power off and Start in 60s', onSelect: commandSystemRebootWithDelay} 
  ]

  const toggleDropAside = () => {
    isDropAsideOpen.setValue(!isDropAsideOpen.value)
  }
  
  const handleClickOutsideAside = (event: MouseEvent) => {
    if (asideRef.current && !asideRef.current.contains(event.target as Node)) {
      isDropAsideOpen.setValue(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideAside);

    return () => {
      document.removeEventListener("click", handleClickOutsideAside);
    };
  }, []);
  
  return (
    <div className={styles['wrapper']}> 
      <div onClick={toggleMiningState}>
        {isMining ? 
        <AsideItem text="Stop Mining" onClick={commandStopMining}>
          <img src={picMine} alt="Stop mining" />
        </AsideItem> :
        <AsideItem text="Start Mining">
          <img src={picMine} alt="Start mining" onClick={commandStartMining}/>
        </AsideItem>
        } 
      </div>
      <div>
        <div ref={asideRef}>
          <AsideItem text="Power Off" onClick={toggleDropAside}>
            <img src={powerOff} alt="Power Off" />
          </AsideItem> 
        </div>
        {isDropAsideOpen.value && <FDropAside fields={fields} position='right'/>}
      </div>
    </div>
  )
}

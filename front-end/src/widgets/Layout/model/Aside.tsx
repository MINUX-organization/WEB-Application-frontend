import { AsideItem } from './AsideItem'
import { useDynamicDataStore } from '@/shared/stores'
import { useRef } from 'react'
import { errorHandlerToaster, useStateObj } from '@/shared/lib'
import { FDropAside } from '@/widgets/Layout/model/FDropAside'
import { commandPowerOff } from '@/shared/api/commandPowerOff'
import { commandSystemReboot } from '@/shared/api/commandSystemReboot'
import { commandSystemReboot60Seconds } from '@/shared/api/commandSystemReboot60Seconds'
import { useEventListener } from 'usehooks-ts'
import styles from './Aside.module.scss'
import picMine from '@/shared/images/stop-mining.png'
import powerOff from '@/shared/images/power-off.svg'
import { commandStopMining } from '@/shared/api/commandStopMining'
import { toast } from 'react-toastify'
import { commandStartMining } from '@/shared/api/commandStartMining'

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
    {label: 'Power off', onSelect: () => errorHandlerToaster(commandPowerOff({}))},
    {label: 'Reboot', onSelect: () => errorHandlerToaster(commandSystemReboot({}))},
    {label: 'Power off and Start in 60s', onSelect: () => errorHandlerToaster(commandSystemReboot60Seconds({}))}
  ]

  const toggleDropAside = () => {
    isDropAsideOpen.setValue(prev => !prev)
  }
  
  const handleClickOutsideAside = (event: MouseEvent) => {
    if (asideRef.current && !asideRef.current.contains(event.target as Node)) {
      isDropAsideOpen.setValue(false);
    }
  };
  
  const handleStopMining = () => {
    commandStopMining({}).then(res => {
        toast.info('mining stopped', { position: toast.POSITION.BOTTOM_LEFT})
    }).catch(e => {
      toast.error(e, { position: toast.POSITION.BOTTOM_LEFT})
    })
  }

  const handleStartMining = () => {
    commandStartMining({}).then(res => {
        toast.info('mining started', { position: toast.POSITION.BOTTOM_LEFT})
    }).catch(e => {
      toast.error(e, { position: toast.POSITION.BOTTOM_LEFT})
    })
  }

  const documentRef = useRef<Document>(document)
  useEventListener('click', handleClickOutsideAside, documentRef)
  
  return (
    <div className={styles['wrapper']}> 
      <div onClick={toggleMiningState}>
        {isMining ? 
        <AsideItem text="Stop Mining" onClick={handleStopMining}>
          <img src={picMine} alt="Stop mining" />
        </AsideItem> :
        <AsideItem text="Start Mining">
          <img src={picMine} alt="Start mining" onClick={handleStartMining}/>
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

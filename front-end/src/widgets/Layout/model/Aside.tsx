import { AsideItem } from './AsideItem'
import { useDynamicDataStore } from '@/shared/stores'
import { useRef } from 'react'
import { errorHandlerToaster, useStateObj } from '@/shared/lib'
import { FDropAside } from '@/widgets/Layout/model/FDropAside'
import { commandPowerOff } from '@/shared/api/commandPowerOff'
import { commandSystemReboot } from '@/shared/api/commandSystemReboot'
import { useEventListener } from 'usehooks-ts'
import { commandStopMining } from '@/shared/api/commandStopMining'
import { toast } from 'react-toastify'
import { commandStartMining } from '@/shared/api/commandStartMining'
import styles from './Aside.module.scss'
import picMine from '@/shared/images/stop-mining.png'
import powerOff from '@/shared/images/power-off.svg'

export const Aside = () => {
  const asideRef = useRef<HTMLDivElement>(null)
  const isDropAsideOpen = useStateObj<boolean>(false);
  const isMining = useDynamicDataStore((state) => state.data.state.mining )
  const updateDynamicData = useDynamicDataStore((state) => state.updateDynamicData); 
  
  const fields = [
    {label: 'Power off', onSelect: () => errorHandlerToaster(commandPowerOff({}))},
    {label: 'Reboot', onSelect: () => errorHandlerToaster(commandSystemReboot({ startupDelay: 0 }))},
    {label: 'Power off and Start in 60s', onSelect: () => errorHandlerToaster(commandSystemReboot({ startupDelay: 60 }))}
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
      if (res.status === 200) {
        updateDynamicData({ state: { mining: false }})
      }
      toast.info('mining stopped')
    }).catch(e => {
      toast.error(JSON.stringify(e.message))
    })
  }

  const handleStartMining = () => {
    commandStartMining({}).then(res => {
      if (res.status === 200) {
        updateDynamicData({ state: { mining: true }})
      }
      toast.info('mining started')
    }).catch(e => {
      toast.error(JSON.stringify(e.message))
    })
  }

  const documentRef = useRef<Document>(document)
  useEventListener('click', handleClickOutsideAside, documentRef)
  
  return (
    <div className={styles['wrapper']}> 
      <div>
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

import { AsideItem } from './AsideItem'
import { useDynamicDataStore } from '@/shared/stores'
import { useRef } from 'react'
import { useStateObj } from '@/shared/lib'
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
    {label: 'Power off', onSelect: () => (
      commandPowerOff({}).then(res => {
        if (res.status) {
          toast.info('system is powering off...')
        } else {
          toast.error('system cannot be powered off')
        }
      }).catch(e => {
        // do nothing
      })
    )},
    {label: 'Reboot', onSelect: () => (
      commandSystemReboot({ startupDelay: 0 }).then(res => {
        if (res.status) {
          toast.info('system is rebooting...')
        } else {
          toast.error('system cannot reboot')
        }
      }).catch(e => {
        // do nothing
      })
    )},
    {label: 'Power off and Start in 60s', onSelect: () => (
      commandSystemReboot({ startupDelay: 60 }).then(res => {
        if (res.status) {
          toast.info('system will be powered off right now and started in 60 seconds')
        } else {
          toast.info('system cannot be powered off')
        }
      }).catch(e => {
        // do nothing
      })
    )}
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
        toast.info('mining stopped')
      } else {
        toast.error('mining is not stopped, there is unknown error')
      }
    }).catch(e => {
      // do nothing
    })
  }

  const handleStartMining = () => {
    commandStartMining({}).then(res => {
      if (res.status === 200) {
        updateDynamicData({ state: { mining: true }})
        toast.info('mining started')
      } else {
        toast.error('mining is not started, there is unknown error')
      }
    }).catch(e => {
      // do nothing
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
          <AsideItem text="Shutdown menu" onClick={toggleDropAside}>
            <img src={powerOff} alt="Shutdown menu" />
          </AsideItem> 
        </div>
        {isDropAsideOpen.value && <FDropAside fields={fields} position='right'/>}
      </div>
    </div>
  )
}

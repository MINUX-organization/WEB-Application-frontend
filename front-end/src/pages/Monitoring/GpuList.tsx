import { useDynamicDataStore } from '@/shared/stores'
import { CSSProperties, ReactNode, useCallback, useState } from 'react'
import { useElementSize } from 'usehooks-ts'
import { useQuery } from 'react-query'
import { valueOrZero } from '@/shared/utils'
import { getCalculationsData } from '@/shared/api/getCalculationsData'
import styles from './Monitoring.module.scss'
import NaImage from '@/shared/components/NaImage'

export const GpuList = () => {
  const { data } = useQuery(['load calculations data'], getCalculationsData)
  const gpus = [...useDynamicDataStore((state) => state.data.gpus)].sort((a,b) => a.id - b.id)
  const [gpuListRef, size] = useElementSize()

  const CountBox = useCallback((props: { label: string, value: ReactNode, frameColor?: string }) => {
    return (
      <div className={styles['count-box']} style={{ "--frame-color": props.frameColor } as CSSProperties}>
        <div className={styles['label']}>{props.label}</div>
        <div className={styles['value']}>{props.value}</div>
      </div>
    )
  },[])

  const GpuItem = (props: { item: typeof gpus[number] }) => {
    const item = props.item;
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownRef, size] = useElementSize()
    return (
      <div className={styles['gpu-item-wrapper']}>
        <div className={styles['gpu-item']} onClick={() => setIsOpen(prev => !prev)}>
          <div className={styles['gpu-id-and-fullname']}>
            <div className={styles['gpu-id']} title={item.id.toString()}>{item.id}</div>
            <div className={styles['gpu-fullname']}>{item.fullName}</div>
          </div> 
          <div>{item.shares.accepted}</div> 
          <div>{item.shares.rejected}</div> 
          <div>{item.hashrate.value?.toFixed(3)}<span className={styles['unit']}>{item.hashrate.measurement}</span></div> 
          <div>{item.temperature}<span className={styles['unit']}>°C</span></div>
          <div>{item.fanSpeed}<span className={styles['unit']}>%</span></div>
          <div>{item.powerUsage}<span className={styles['unit']}>W</span></div> 
        </div>
        <div className={styles['gpu-dropdown-wrapper'] + ' ' + (isOpen && styles['open'])} style={{ "--gpu-dropdown-width": `${size.width}px`, "--gpu-dropdown-height": `${size.height}px` } as CSSProperties}>
          <div ref={dropdownRef} className={styles['gpu-dropdown'] + ' ' + (isOpen && styles['open'])}>
            <div className={styles['gpu-dropdown-first-item']}>
              <div className={styles['label']}>{"Crypto\nminer"}</div>
              <div className={styles['value']}>{item.cryptocurrency}</div>
            </div>
            <div className={styles['gpu-dropdown-second-item']}>
              <div className={styles['label']}>{"Miner\nup time"}</div>
              <div className={styles['value']}>-</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles['gpu-list-wrapper']} style={{ "--gpu-list-width": `${size.width}px`, "--gpu-list-height": `${size.height}px` } as CSSProperties}>
      <div ref={gpuListRef} className={styles['gpu-list']}>
        <div className={styles['header']}>
          <div className={styles['counters']}>
            <CountBox label='GPUs' value={valueOrZero(data?.data.calculations.gpusCount)} />
            <CountBox label='Nvidia' value={valueOrZero(data?.data.calculations.gpusNvidia)} frameColor='#43C09B' />
            <CountBox label='AMD' value={valueOrZero(data?.data.calculations.gpusAmd)} frameColor='#FC4E4E' />
          </div>
          <div>Accepted</div>
          <div>Rejected</div>
          <div>Hashrate</div>
          <div>Temp</div> 
          <div>Fan</div> 
          <div>Power</div>
        </div>
        <div className={styles['gpu-list-grid-wrapper']}>
          {gpus.length === 0 && <NaImage className={styles['na-image']} alt={true}/>}
          <div className={styles['gpu-list-body']}>
            {gpus.map(item => (
              <GpuItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
import { TSettingsGpu } from "@/shared/types"
import { FContainer, FModal } from "@/shared/ui"
import { useBooleanUrl } from "@/shared/lib/useBooleanUrl"
import { useMediaQuery } from "usehooks-ts"
import { Fragment } from "react"
import { EditGpuSetup } from "@/features/EditGpuSetup"
import styles from './SettingsGpuItem.module.scss'
import gpuImage from '@/shared/images/gpu-two-vent-image.png'
import gearsImage from '@/shared/images/gears.png'

type SettingsGpuItemProps = React.ComponentPropsWithoutRef<'div'> & {
  item: TSettingsGpu
}

export const SettingsGpuItem = (props: SettingsGpuItemProps) => {
  const isOpen = useBooleanUrl(props.item.gpuId.toString() + props.item.gpuSetupId.toString())
  const above1400 = useMediaQuery('(min-width: 1400px)')
  const above800 = useMediaQuery('(min-width: 800px)')

  const fields = [
    { label: 'ID', value: props.item.gpuId, unit: '' },
    { label: 'BUS', value: '-', unit: '' },
    { label: 'Core', value: props.item.coreClock, unit: 'Mhz' },
    { label: 'Memory', value: props.item.memoryClock, unit: 'Mhz' },
    { label: 'Critical Temp.', value: '-', unit: '°C' },
    { label: 'Power limit', value: props.item.powerLimit, unit: 'Watt' },
    { label: 'AutoFan', value: '-', unit: '' },
    { label: 'Overclock mode', value: '-', unit: '' }
  ]
  return (
    <>
      <FContainer className={styles['wrapper']} bodyProps={{ className: styles['wrapper-inner'] }} visibility={{ l: false, t: false, r: false, b: false }}>
        {above1400 && (
          <div className={styles["above-1400px-wrapper"]}>
            <div className={styles['first-item']}>
              {fields.slice(0, 2).map(item => (
                <Fragment key={item.label}>
                  <div className={styles['label']}>{item.label}</div>
                  <div className={styles['value']}>{item.value}</div>
                </Fragment>
              ))}
            </div>
            <div className={styles['second-item']}>
              <div className={styles['name']}>{props.item.name}</div>
              <div className={styles['under-name']}>-</div>
              <div className={styles['under-name']}>-</div>
            </div>
            <div className={styles['third-item']}>
              {fields.slice(2, 6).map(item => (
                <Fragment key={item.label}>
                  <div className={styles['label']}>{item.label}</div>
                  <div className={styles['value']}>{item.value}</div>
                  <div className={styles['unit']}>{item.unit}</div>
                </Fragment>
              ))}
            </div>
            <div className={styles['fourth-item']}>
              <img src={gpuImage} className={styles['image']} alt="gpu" />
              <div className={styles['label']}>AutoFan</div>
              <div className={styles['value']}>-</div>
            </div>
            <div className={styles['fifth-item']}>
              <div className={styles['label']}>Overclock mode</div>
              <div className={styles['value']}>-</div>
            </div>
            <div className={styles['sixth-item']}>
              <img src={gearsImage} className={styles['gears']} alt="gears" onClick={isOpen.setTrue} />
            </div>
          </div>
        )}
        {!above1400 && (
          <div className={styles['below-1400px-wrapper']}>
            <div className={styles['first-line']}>
              <div className={styles['name-box']}>
                <div className={styles['name']}>{props.item.name}</div>
                <div className={styles['under-name']}>-</div>
                <div className={styles['under-name']}>-</div>
              </div>
              {above800 && <img src={gpuImage} className={styles['image']} alt="gpu" />}
              <img src={gearsImage} className={styles['gears']} alt="gears" onClick={isOpen.setTrue} />
            </div>
            {above800 && (
              <div className={styles['fields-wrapper']}>
                <div className={styles['fields']}>
                  {fields.slice(0, 4).map(item => (
                    <Fragment key={item.label}>
                      <div className={styles['label']}>{item.label}</div>
                      <div className={styles['value']}>{item.value}</div>
                      <div className={styles['unit']}>{item.unit}</div>
                    </Fragment>
                  ))}
                </div>
                <div className={styles['fields']}>
                  {fields.slice(4, 8).map(item => (
                    <Fragment key={item.label}>
                      <div className={styles['label']}>{item.label}</div>
                      <div className={styles['value']}>{item.value}</div>
                      <div className={styles['unit']}>{item.unit}</div>
                    </Fragment>
                  ))}
                </div>
              </div>
            )}
            {!above800 && (
              <div className={styles['fields']}>
                {fields.map(item => (
                  <Fragment key={item.label}>
                    <div className={styles['label']}>{item.label}</div>
                    <div className={styles['value']}>{item.value}</div>
                    <div className={styles['unit']}>{item.unit}</div>
                  </Fragment>
                ))}
              </div>
            )}
          </div>
        )}
      </FContainer>
      <FModal open={isOpen.value} title={props.item.name ?? 'Empty Name'} onClose={isOpen.setFalse}>
        <EditGpuSetup gpuId={props.item.gpuSetupId} onCancel={isOpen.setFalse} onApply={isOpen.setFalse} />
      </FModal>
    </>
  )
}

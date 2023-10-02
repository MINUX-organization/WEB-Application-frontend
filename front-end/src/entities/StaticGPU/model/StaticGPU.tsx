import { HTMLProps } from "react" 
import { FContainer } from "@/shared/ui"
import { useMediaQuery } from 'usehooks-ts'
import { valueOrNA } from "@/shared/utils"
import { TStaticGPU } from "@/shared/types"
import gpuOneVentImage from '@/shared/images/gpu-one-vent-image.png'
import gpuTwoVentImage from '@/shared/images/gpu-two-vent-image.png'
import styles from './StaticGPU.module.scss'
import _ from 'lodash'
import { GpuStaticRunType } from "@/shared/stores/types/gpuStatic"

const omittedProps = [
  'item',
  'imageType'
] as const

type StaticGPUProps = Omit<HTMLProps<HTMLDivElement>, typeof omittedProps[number]> & {
  item: TStaticGPU,
  imageType?: 'one-vent' | 'two-vent'
}

export const StaticGPU = (props: StaticGPUProps) => {
  const above1500px = useMediaQuery('(min-width: 1600px)');
  const above1300px = useMediaQuery('(min-width: 1300px)');

  const fields: Array<{ label: string, value: any }> = [ 
    { label: 'Manufacturer', value: (props.item.information.manufacturer) },
    { label: 'Periphery', value: (props.item.information.periphery) },
    { label: 'Driver Ver.', value: (props.item.information.driverVersion) },
    { label: 'CUDA Ver.', value: (props.item.information.cudaVersion)},
    { label: 'Architecture', value: (props.item.information.architecture) },
    { label: 'Serial Number', value: (props.item.information.serialNumber) },
    { label: 'PCI bus', value: (props.item.information.pci.busId) },
    { label: 'Memory', value: (props.item.memoryMb.total + " GB")  },
    { label: 'Power', value: (props.item.powerWatt.minimal + " Watt")  },
    { label: 'Core Clocks Mhz', value: (props.item.clocksMhz.coreMax + ' Mhz') },
    { label: 'Memory Clocks Mhz', value: (props.item.clocksMhz.memMax + ' Mhz') }
  ]
  const lastField = { label: 'GPU uuid', value: props.item.uuid }

  return (
    <div {..._.omit(props, omittedProps)} className={(props.className ?? '') + ' ' + styles['wrapper']}>
      <FContainer
        bodyProps={{ className: styles['fields-grid']}}
        visibility={{ r: !above1500px, rc: false, tc: false, bc: false, lc: false }}
        className={styles['fields-grid-wrapper']}
      >
        {_.map(_.chunk(fields, above1300px ? 5 : 6), (chunk, index) => (
          <div key={'chunk-' + index} className={styles['fields-chunk']}>
            {_.map(chunk, item => (
              <div key={item.label} className={styles['field']}>
                <span className={styles['label']}>{item.label}</span>
                <span className={styles['value']}>{valueOrNA(item.value)}</span>
              </div>
            ))}
          </div>
        ))}
        <div className={styles['last-field']}>
          <span className={styles['label']}>{lastField.label}</span>
          <span className={styles['value']}>{' '}{valueOrNA(lastField.value)}</span>
        </div>
      </FContainer>
      {above1500px &&
        <FContainer visibility={{ _l: false, tc: false, bc: false, rc: false }} className={styles['image-container-wrapper'] + ' ' + styles['sp1']} bodyProps={{ className: styles['image-container'] }}>
          <img src={{'one-vent': gpuOneVentImage, 'two-vent': gpuTwoVentImage}[props.imageType ?? 'two-vent']} alt='gpu' className={styles['image']} />
        </FContainer>
      }
    </div>
  )
}

import { HTMLProps } from "react" 
import { FContainer } from "@shared/ui"
import { useMediaQuery } from 'usehooks-ts' 
import { valueOrNA } from "@shared/utils"
import gpuOneVentImage from '@shared/images/gpu-one-vent-image.png'
import gpuTwoVentImage from '@shared/images/gpu-two-vent-image.png'
import styles from './GPUItem.module.scss'
import _ from 'lodash'
import { GpuStatic } from "@shared/stores/types/gpuStatic"

type GPUItemProps = HTMLProps<HTMLDivElement> & {
  item: GpuStatic,
  narrow?: boolean,
  imageType?: 'one-vent' | 'two-vent'
}

export const GPUItem = (props: GPUItemProps) => {
  const above1500px = useMediaQuery('(min-width: 1600px)');
  const above1300px = useMediaQuery('(min-width: 1300px)');

  const fields: Array<{ label: string, value: any }> = [
    { label: 'uuid', value: (props.item.uuid) },
    { label: 'Manufacturer', value: (props.item.information.manufacturer) },
    { label: 'Periphery', value: (props.item.information.periphery) },
    { label: 'Driver Ver.', value: (props.item.information.driverVersion) },
    { label: 'CUDA Ver.', value: (props.item.information.cudaVersion)},
    { label: 'Architecture', value: (props.item.information.architecture) },
    { label: 'Serial Number', value: (props.item.information.serialNumber) },
    { label: 'PCI bus', value: (props.item.information.pci.pciBusId) },
    { label: 'Memory', value: (props.item.memory.total + " GB")  },
    { label: 'Power', value: (props.item.power.minimal + " Watt")  },
    { label: 'Core Clocks Mhz', value: (props.item.clocks.maximumCore + ' Mhz') },
    { label: 'Memory Clocks Mhz', value: (props.item.clocks.maximumMemory + ' Mhz') }
  ]
  const lastField = { label: 'GPU uuid', value: 'GPU-87111c58-594e-494c-a574-6c9b130a6170' }

  return (
    <div {..._.omit(props, 'item', 'narrow', 'imageType')} className={(props.className ?? '') + ' ' + styles['wrapper']}>
      <FContainer visibility={{ r: !above1500px, rc: false, tc: false, bc: false, lc: false }} className={styles['fields-grid-wrapper']} bodyProps={{ className: styles['fields-grid']}}>
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
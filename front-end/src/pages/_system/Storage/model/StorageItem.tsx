import { FContainer, FTopic } from "@/shared/ui"
import { HTMLProps } from "react"
import { TStaticHarddrive } from "@/shared/types"
import styles from './StorageItem.module.scss'
import _ from 'lodash'

const omittedProps = [
  'item'
] as const

type StorageProps = Omit<HTMLProps<HTMLDivElement>, typeof omittedProps[number]> & {
  item: TStaticHarddrive
}

export const StorageItem = (props: StorageProps) => {

  const fields: Array<{ label: string, value: any }> = [ 
    { label: 'Serial Number', value: (props.item.information.serialNumber) },
    { label: 'Device Model', value: (props.item.information.deviceModel) },
    { label: 'Capacity', value: (props.item.information.capacity + " Gb")},
    { label: 'SATA ports', value: (props.item.information.sataPorts) },
  ] 

  return (
    <div {..._.omit(props, omittedProps)} className={(props.className ?? '') + ' ' + styles['wrapper']}> 
      <FContainer visibility={{ lc: false, rc: false }} className={styles['data']} bodyProps={{ className: styles['data-body']}}>
        <FTopic className={styles['data-topic']} text="HDD" />
        <div className={styles['fields']}>
          {fields.map(field => (
            <div key={field.label} className={styles['field-item']}>
              <label>{field.label}</label>
              <div className={styles['field-data']}>{field.value}</div>
            </div>
          ))}
        </div>
      </FContainer>
      {/* <img src={hddImage} alt="motherboard" className={styles['image']} /> */}
    </div>
  )
}

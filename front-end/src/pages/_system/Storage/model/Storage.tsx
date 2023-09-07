import { FContainer, FTopic } from "@shared/ui"
import { HTMLProps } from "react"
import styles from './Storage.module.scss'
import hddImage from '@shared/images/hdd-image.svg' 
import { valueOrNA } from "@shared/utils" 
import { useQuery } from "react-query"
import { getHarddriveData } from "@shared/api/getHarddriveData" 
import { Spin } from "antd"


type StorageProps = HTMLProps<HTMLDivElement>

export const Storage = (props: StorageProps) => {
  const {isFetching, data} = useQuery(['load hardrive data'], getHarddriveData); 

  const fields: Array<{ label: string, value: any }> = [
    { label: 'uuid', value: (data?.uuid) }, 
    { label: 'Serial Number', value: (data?.information.serialNumber) },
    { label: 'Device Model', value: (data?.information.deviceModel) },
    { label: 'Capacity', value: (data?.information.capacity + " Gb")},
    { label: 'SATA ports', value: (data?.information.sataPorts) },
  ] 

  return (
    <div {...props} className={(props.className ?? '') + ' ' + styles['wrapper']}> 
      <FContainer visibility={{ lc: false, rc: false }} className={styles['data']} bodyProps={{ className: styles['data-body']}}>
        <FTopic className={styles['data-topic']} text="HDD" />
        <div className={styles['fields']}>
          {fields.map(field => (
            <div key={field.label} className={styles['field-item']}>
              <label>{field.label}</label>
              <div className={styles['field-data']}>{
                (isFetching ? <Spin size="default" /> : valueOrNA(field.value))
              }</div>
            </div>
          ))}
        </div>
      </FContainer>
      <img src={hddImage} alt="motherboard" className={styles['image']} />
    </div>
  )
}

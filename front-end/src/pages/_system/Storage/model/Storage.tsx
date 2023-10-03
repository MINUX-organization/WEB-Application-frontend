import { FContainer, FTopic } from "@/shared/ui"
import { HTMLProps } from "react"
import { valueOrNA } from "@/shared/utils" 
import { useQuery } from "react-query"
import { getStaticHarddrives } from "@/shared/api" 
import { Spin } from "antd"
import styles from './Storage.module.scss'
import hddImage from '@/shared/images/hdd-image.svg' 

type StorageProps = HTMLProps<HTMLDivElement>

export const Storage = (props: StorageProps) => {
  const {isFetching, data} = useQuery(['load hardrive data'], getStaticHarddrives); 

  const fields: Array<{ label: string, value: any }> = [ 
    { label: 'Serial Number', value: (data?.data.harddrives[0].information.serialNumber) },
    { label: 'Device Model', value: (data?.data.harddrives[0].information.deviceModel) },
    { label: 'Capacity', value: (data?.data.harddrives[0].information.capacity + " Gb")},
    { label: 'SATA ports', value: (data?.data.harddrives[0].information.sataPorts) },
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

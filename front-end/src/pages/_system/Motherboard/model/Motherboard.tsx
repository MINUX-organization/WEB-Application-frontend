import { FContainer, FTopic } from "@shared/ui"
import { HTMLProps } from "react"
import motherboardImage from '@shared/images/motherboard-image.svg'
import styles from './Motherboard.module.scss' 
import { valueOrNA } from "@shared/utils"
import { Spin } from "antd" 
import { getMotherboardData } from "@shared/api/getMotherboardData"
import { useQuery } from "react-query"

type MotherboardProps = HTMLProps<HTMLDivElement>

export const Motherboard = (props: MotherboardProps) => { 
  const {isFetching, data} = useQuery(['load motherboard data'], getMotherboardData); 

  const fields: Array<{ label: string, value: any }> = [
    { label: 'Manufacturer', value: (data?.information.manufacturer) },
    { label: 'Product Name', value: (data?.information.productName) },
    { label: 'Serial Number', value: (data?.information.serialNumber) },
    { label: 'uuid', value: (data?.uuid) },
    { label: 'SATA ports', value: (data?.sataSlots) },
    { label: 'RAM Type', value: (data?.ramSlots.maxSpeed + " Mhz")  },
    { label: 'Maximum RAM Capacity', value: (data?.ramSlots.maxCapacity + " GB")  },
    { label: 'PCIe', value: (data?.pciSlots) },
  ]

  return (
    <div {...props} className={(props.className ?? '') + ' ' + styles['wrapper']}>
      <FContainer visibility={{ lc: false, rc: false }} className={styles['data']} bodyProps={{ className: styles['data-body']}}>
        <FTopic className={styles['data-topic']} text="MOTHERBOARD" />
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
      <img src={motherboardImage} alt="motherboard" className={styles['image']} />
    </div>
  )
}

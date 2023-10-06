import { FContainer, FTopic } from "@/shared/ui"
import { ComponentPropsWithoutRef } from "react"
import { valueOrNA } from "@/shared/utils"
import { Spin } from "antd" 
import { getMotherboardData } from "@/shared/api/getMotherboardData"
import { useQuery } from "react-query"
import motherboardImage from '@/shared/images/motherboard-image.svg'
import styles from './Motherboard.module.scss' 

type MotherboardProps = ComponentPropsWithoutRef<'div'>

export const Motherboard = (props: MotherboardProps) => { 
  const {data: motherboardData, isLoading} = useQuery(['load motherboard data'], getMotherboardData);

  
  return (
    <div {...props} className={(props.className ?? '') + ' ' + styles['wrapper']}>
      {isLoading && <Spin />}
      {motherboardData !== undefined && (() => {
        const motherboard = motherboardData.data.motherboard
        const fields: Array<{ label: string, value: any }> = [
          { label: 'Manufacturer', value: (motherboard.information.manufacturer) },
          { label: 'Product Name', value: (motherboard.information.productName) },
          { label: 'Serial Number', value: (motherboard.information.serialNumber) }, 
          { label: 'SATA ports', value: (motherboard.slots.sata) },
          { label: 'RAM Type', value: (motherboard.slots.ram.type)  },
          { label: 'Maximum RAM Capacity', value: (motherboard.slots.ram.maximumCapacity + " GB")  },
          { label: 'PCIe', value: (motherboard.slots.pci) },
        ]
        return (
          <>
            <FContainer visibility={{ lc: false, rc: false }} className={styles['data']} bodyProps={{ className: styles['data-body']}}>
              <FTopic className={styles['data-topic']} text="MOTHERBOARD" />
              <div className={styles['fields']}>
                {fields.map(field => (
                  <div key={field.label} className={styles['field-item']}>
                    <label>{field.label}</label>
                    <div className={styles['field-data']}>{
                      (isLoading ? <Spin size="default" /> : valueOrNA(field.value))
                    }</div>
                  </div>
                ))}
              </div>
            </FContainer>
            <img src={motherboardImage} alt="motherboard" className={styles['image']} />
          </>
        )
      })()}
    </div>
  )
}

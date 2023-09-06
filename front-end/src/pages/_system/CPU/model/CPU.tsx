import { FContainer, FTopic } from "@shared/ui"
import { HTMLProps } from "react"
import cpuImage from '@shared/images/cpu-image.svg'
import styles from './CPU.module.scss' 
import { valueOrNA } from "@shared/utils"
import { useQuery } from "react-query"
import { getCpuData } from "@shared/api/getCpuData"
import { Spin } from "antd"

type CPUProps = HTMLProps<HTMLDivElement>

export const CPU = (props: CPUProps) => {
  const { isFetching, data } = useQuery(['load cpu data'], getCpuData)

  const fields: Array<{ label: string, value: string | number }> = [
    { label: 'Manufacturer', value: valueOrNA(data?.information.manufacturer) },
    { label: 'Model', value: valueOrNA(data?.information.modelName) },
    { label: 'Architecture', value: valueOrNA(data?.information.architecture) },
    { label: 'Operation', value: valueOrNA(data?.information.opModes) },
    { label: 'CPUs', value: valueOrNA(data?.information.cores.cpus) },
    { label: 'Threads per Core', value: valueOrNA(data?.information.cores.threadsPerCore) },
    { label: 'Cores per Socket', value: valueOrNA(data?.information.cores.threadsPerSocket) },
    { label: 'Max Clock', value: valueOrNA(data?.clocksMhz.max) },
    { label: 'Min Clock', value: valueOrNA(data?.clocksMhz.min) },
    { label: 'Cache L2', value: valueOrNA(data?.information.cacheL2 + ' MB') },
    { label: 'Cache L3', value: valueOrNA(data?.information.cacheL3 + ' MB') }
  ]

  if (isFetching) { 
    <div {...props} className={(props.className ?? '') + ' ' + styles['wrapper']}>
      <div className="flex justify-center w-full"><Spin size="default"/></div>
    </div>
  }

  return (
    <div {...props} className={(props.className ?? '') + ' ' + styles['wrapper']}>
      <FContainer visibility={{ lc: false, rc: false }} className={styles['data']} bodyProps={{ className: styles['data-body']}}>
        <FTopic className={styles['data-topic']} text="CPU" />
        <div className={styles['fields']}>
          {fields.map(field => (
            <div key={field.label} className={styles['field-item']}>
              <label>{field.label}</label>
              <div className={styles['field-data']}>{isFetching ? <Spin size="default"/> : field.value}</div>
            </div>
          ))}
        </div>
      </FContainer>
      <div className={styles['cpu-image-wrapper']}>
        <img src={cpuImage} alt="cpu" className={styles['image']} />
        <div className={styles['cpu-image-text']}>{isFetching ? <Spin size="default"/> : valueOrNA(data?.information.manufacturer)}<br/>{data?.information.modelName}</div>
      </div>
    </div>
  )
}

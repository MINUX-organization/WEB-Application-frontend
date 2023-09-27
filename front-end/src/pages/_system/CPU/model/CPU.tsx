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

  const fields: Array<{ label: string, value: any }> = [
    { label: 'Manufacturer', value: (data?.cpu.information.manufacturer) },
    { label: 'Model', value: (data?.cpu.information.modelName) },
    { label: 'Architecture', value: (data?.cpu.information.architecture) },
    { label: 'Operation', value: (data?.cpu.information.opModes) },
    { label: 'CPUs', value: (data?.cpu.information.cores.cpus) },
    { label: 'Threads per Core', value: (data?.cpu.information.cores.threadsPerCore) },
    { label: 'Cores per Socket', value: (data?.cpu.information.cores.threadsPerSocket) },
    { label: 'Max Clock', value: (data?.cpu.clocks.maximum) },
    { label: 'Min Clock', value: (data?.cpu.clocks.minimum) },
    { label: 'Cache L2', value: (data?.cpu.information.cache.L2 + ' MB') },
    { label: 'Cache L3', value: (data?.cpu.information.cache.L3 + ' MB') }
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
              <div className={styles['field-data']}>{isFetching ? <Spin size="default"/> : valueOrNA(field.value)}</div>
            </div>
          ))}
        </div>
      </FContainer>
      <div className={styles['cpu-image-wrapper']}>
        <img src={cpuImage} alt="cpu" className={styles['image']} />
        <div className={styles['cpu-image-text']}>{isFetching ? <Spin size="default"/> : valueOrNA(data?.cpu.information.manufacturer)}<br/>{data?.cpu.information.modelName}</div>
      </div>
    </div>
  )
}

import { FContainer, FTopic } from "@shared/ui"
import { HTMLProps } from "react"
import { valueOrNA } from "@shared/utils"
import { TStaticCPU } from "@shared/types"
import styles from './StaticCPU.module.scss'

type StaticCPUProps = HTMLProps<HTMLDivElement> & {
  item: TStaticCPU
}

export const StaticCPU = (props: StaticCPUProps) => {

  const fields: Array<{ label: string, value: string | number }> = [
    { label: 'Manufacturer', value: valueOrNA(props.item.information.manufacturer) },
    { label: 'Model', value: valueOrNA(props.item.information.modelName) },
    { label: 'Architecture', value: valueOrNA(props.item.information.architecture) },
    { label: 'Operation', value: valueOrNA(props.item.information.opModes) },
    { label: 'CPUs', value: valueOrNA(props.item.information.cores.cpus) },
    { label: 'Threads per Core', value: valueOrNA(props.item.information.cores.threadsPerCore) },
    { label: 'Cores per Socket', value: valueOrNA(props.item.information.cores.threadsPerSocket) },
    { label: 'Max Clock', value: valueOrNA(props.item.clocksMhz.max) },
    { label: 'Min Clock', value: valueOrNA(props.item.clocksMhz.min) },
    { label: 'Cache L2', value: valueOrNA(props.item.information.cacheL2) + 'Mb' },
    { label: 'Cache L3', value: valueOrNA(props.item.information.cacheL3) + 'Mb' }
  ]

  return (
    <div {...props}>
      <FContainer visibility={{ lc: false, rc: false }} className={styles['data']} bodyProps={{ className: styles['data-body']}}>
        <FTopic className={styles['data-topic']} text="CPU" />
        <div className={styles['fields']}>
          {fields.map(field => (
            <div key={field.label} className={styles['field-item']}>
              <label>{field.label}</label>
              <div>{field.value}</div>
            </div>
          ))}
        </div>
      </FContainer>
    </div>
  )
}

import { FContainer, FTopic } from "@/shared/ui"
import { HTMLProps } from "react"
import { valueOrNA } from "@/shared/utils"
import { TStaticCPU } from "@/shared/types"
import styles from './StaticCPU.module.scss'

type StaticCPUProps = HTMLProps<HTMLDivElement> & {
  item: TStaticCPU
}

export const StaticCPU = (props: StaticCPUProps) => {

  const fields: Array<{ label: string, value: string | number }> = [
    { label: 'Manufacturer', value: valueOrNA(props.item.cpu.information.manufacturer) },
    { label: 'Model', value: valueOrNA(props.item.cpu.information.modelName) },
    { label: 'Architecture', value: valueOrNA(props.item.cpu.information.architecture) },
    { label: 'Operation', value: valueOrNA(props.item.cpu.information.opModes) },
    { label: 'CPUs', value: valueOrNA(props.item.cpu.information.cores.cpus) },
    { label: 'Threads per Core', value: valueOrNA(props.item.cpu.information.cores.threadsPerCore) },
    { label: 'Cores per Socket', value: valueOrNA(props.item.cpu.information.cores.threadsPerSocket) },
    { label: 'Max Clock', value: valueOrNA(props.item.cpu.clocks.maximum) },
    { label: 'Min Clock', value: valueOrNA(props.item.cpu.clocks.minimum) },
    { label: 'Cache L2', value: valueOrNA(props.item.cpu.information.cache.L2) + 'Mb' },
    { label: 'Cache L3', value: valueOrNA(props.item.cpu.information.cache.L3) + 'Mb' }
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

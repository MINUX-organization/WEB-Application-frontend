import { HTMLProps, useMemo } from "react"
// import { RootState } from "@/app/store" 
import { valueOrNA } from "@/shared/utils"
import { useQuery } from "react-query"
import { getStaticCpu } from "@/shared/api"
import { StaticCPU } from "@/entities/StaticCPU/model/StaticCPU"
import { Spin } from "antd"
import { CPUImage } from "@/shared/images/CPUImage"
import styles from './CPU.module.scss' 

type CPUProps = HTMLProps<HTMLDivElement>

export const CPU = (props: CPUProps) => {
  const staticCPUQuery = useQuery(['load static CPU'], () => getStaticCpu({}))
  const cpuType: 'intel' | 'amd' | 'unknown' = useMemo(() => {
    if (staticCPUQuery.data === undefined || staticCPUQuery.data.data.cpu.information.manufacturer === null) return 'unknown'
    if (staticCPUQuery.data.data.cpu.information.manufacturer.search(/intel/i) !== -1) return 'intel'
    if (staticCPUQuery.data.data.cpu.information.manufacturer.search(/amd/i) !== -1) return 'amd'
    return 'unknown' 
  }, [staticCPUQuery.data])

  if (staticCPUQuery.isFetching) { 
    <div {...props} className={(props.className ?? '') + ' ' + styles['wrapper']}>
      <div className="flex justify-center w-full"><Spin size="default"/></div>
    </div>
  }

  return (
    <div {...props} className={(props.className ?? '') + ' ' + styles['wrapper']}>
      {staticCPUQuery.isFetching && <Spin />}
      {staticCPUQuery.data !== undefined && !staticCPUQuery.isFetching &&
        <>
          <StaticCPU item={staticCPUQuery.data.data} />
          <div className={styles['cpu-image-wrapper']}>
            <CPUImage className={styles['image'] + ' ' + (cpuType === 'intel' ? styles['cpu-intel'] : cpuType === 'amd' ? styles['cpu-amd'] : styles['cpu-unknown'])} />
            <div className={styles['cpu-image-text']}>
              {valueOrNA(staticCPUQuery.data?.data.cpu.information.manufacturer)}
              <br />{
              staticCPUQuery.data?.data.cpu.information.modelName}
            </div>
          </div>
        </>
      }
    </div>
  )
}

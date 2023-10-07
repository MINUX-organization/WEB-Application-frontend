import { SettingsGpuItem } from "@/entities/SettingsGpuItem"
import { getSettingsGpus } from "@/shared/api"
import { Spin } from "antd"
import { HTMLProps } from "react"
import { useQuery } from "react-query"
import { toast } from "react-toastify"
import styles from './GPU.module.scss'

export const GPU = (props: HTMLProps<HTMLDivElement>) => {
  const { data: settingGpus, isLoading, refetch } = useQuery(['get settings gpus'], () => getSettingsGpus({}), { onError: (error: any) => toast.error(error.message)})
  return (
    <div {...props} className={props.className + ' ' + styles['wrapper']}>
      {isLoading && <Spin />}
      {settingGpus !== undefined && (
        <>
          {(() => {
            const orphanGpus = settingGpus.data.settingGpus.filter(v => !v.connected)
            if (orphanGpus.length === 0) {
              return null;
            }
            return (
              <div className={styles['notification']}>
                <span>{orphanGpus.length}</span> orphan gpu(s)
              </div>
            )
          })()}
          {settingGpus.data.settingGpus.filter(v => v.connected).map(item => (
            <SettingsGpuItem key={item.gpuId} item={item} onEdit={refetch} />
          ))}
        </>
      )}
    </div>
  )
}

import { getSystemInfo } from "@/shared/api/getSystemInfo"
import { valueOrNA } from "@/shared/utils"
import { Spin } from "antd"
import { Fragment } from "react"
import { useQuery } from "react-query"
import { toast } from "react-toastify"
import styles from './Monitoring.module.scss'
import _ from 'lodash'

export const Footer = () => {
  const { isFetching, data } = useQuery(['load system info data'], getSystemInfo, { onError: (err: any) => toast.error(`cannot get system info: ${err.message}`)})
  const systemInfo = data?.data.systemInfo
  const fields = {
    "MB": systemInfo?.motherboard,
    "OpenCL": systemInfo?.technologies.versions.opencl,
    "Local IP": systemInfo?.localIp,
    "CPU": systemInfo?.cpu,
    "CUDA": systemInfo?.technologies.versions.cuda,
    "MAC address": systemInfo?.macAddress,
    "Disk": systemInfo?.harddrive,
    "Driver AMD": systemInfo?.drivers.versions.amd,
    "Minux version": systemInfo?.minuxVersion,
    "Linux": systemInfo?.linux,
    "Driver Nvidia": systemInfo?.drivers.versions.nvidia,
  }

  const Field = (props: { label: string, value: string | number | undefined }) => {
    return (
      <Fragment>
        <div className={styles['label']}>{props.label}</div>
        <div className={styles['value']}>{isFetching ? <Spin size='default' /> : valueOrNA(props.value)}</div>
      </Fragment>
    )
  }

  return (
    <div className={styles['footer']}>
      {_.toPairs(fields).map(([label, value]) => (
        <Field key={label} label={label} value={value} />
      ))}
    </div>
  )
}
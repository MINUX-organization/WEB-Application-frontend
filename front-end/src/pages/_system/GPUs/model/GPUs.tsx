import { FTopic } from "@shared/ui"
import { HTMLProps } from "react" 
import { GPUItem } from "./GPUItem"
import styles from './GPUs.module.scss' 
import { useQuery } from "react-query"
import { getGpusData } from "@shared/api/getGpusData"
import { Spin } from "antd"

type GPUsProps = HTMLProps<HTMLDivElement> 

export const GPUs = (props: GPUsProps) => {
  const { isFetching, data } = useQuery(['load gpus data'], getGpusData) 
  return (
    <div {...props} className={(props.className ?? '') + ' ' + styles['wrapper']}>
      <FTopic text="GPUs" className={styles['topic']} /> 

      {(isFetching) ? 
      <div className="w-full h-full flex justify-center"><Spin size="large" /></div> : 

      <div className={styles['gpu-list']}>
        {data && data.gpus.map(gpu => (
          <GPUItem key={gpu.uuid} item={gpu} />
          ))}
      </div>}
    </div>
  )
}

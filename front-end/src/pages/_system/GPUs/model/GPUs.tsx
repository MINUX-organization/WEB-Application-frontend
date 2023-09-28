import { FTopic } from "@shared/ui"
import { HTMLProps } from 'react' 
// import { useSelector } from "react-redux"
// import { RootState } from "@app/store"
import { StaticGPU } from "@entities/StaticGPU"
import { useQuery } from "react-query"
import { getStaticGPUList } from "@shared/api"
import { Spin } from 'antd'
import styles from './GPUs.module.scss'

type GPUsProps = HTMLProps<HTMLDivElement> 

export const GPUs = (props: GPUsProps) => {
  // const data = useSelector((state: RootState) => state.staticData.data?.gpu);
  const gpuListQuery = useQuery(['load static gpu list'], () => getStaticGPUList({}))

  return (
    <div {...props} className={(props.className ?? '') + ' ' + styles['wrapper']}>
      <FTopic text="GPUs" className={styles['topic']} /> 
      <div className={styles['gpu-list']}>
        {gpuListQuery.isFetching && <Spin />}
        {!gpuListQuery.isFetching && gpuListQuery.data !== undefined && gpuListQuery.data.list.map(gpu => (
            <StaticGPU key={gpu.uuid} item={gpu} />
          ))
        }
      </div>
    </div>
  )
}

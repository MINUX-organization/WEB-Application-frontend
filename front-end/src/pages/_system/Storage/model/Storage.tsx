import { HTMLProps } from "react"
import { useQuery } from "react-query"
import { getStaticHarddrives } from "@/shared/api"
import { Spin } from "antd"
import { StorageItem } from "./StorageItem"
import styles from './Storage.module.scss'
import hddImage from '@/shared/images/hdd-image.svg' 

type StorageProps = HTMLProps<HTMLDivElement>

export const Storage = (props: StorageProps) => {
  const {isFetching, data} = useQuery(['load hardrive data'], getStaticHarddrives);

  return (
    <div {...props} className={(props.className ?? '') + ' ' + styles['wrapper']}> 
      <div className={styles['field-data']}>
        {isFetching && <Spin size="default" />}
        {data !== undefined &&
          <div className={styles['list']}>
            {data.data.harddrives.map(item => <StorageItem item={item} />)}
          </div>
        }
      </div>
      <img src={hddImage} alt="motherboard" className={styles['image']} />
    </div>
  )
}

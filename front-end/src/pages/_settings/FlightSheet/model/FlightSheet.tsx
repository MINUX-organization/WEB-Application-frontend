import { HTMLProps } from "react";
import { CreateFlightSheet } from "@features/CreateFlightSheet";
import { FlightSheetListItem } from "@entities/FlightSheetListItem";
import { useQuery } from "react-query";
import { getFlightSheetList } from "../api";
import { Spin } from "antd";
import styles from './FlightSheet.module.scss'

export const FlightSheet = (props: HTMLProps<HTMLDivElement>) => {
  const flightSheetListQuery = useQuery(['load flight sheet list'], () => getFlightSheetList({}))
  return (
    <div {...props} className={(props.className ?? '') + ' ' + styles['wrapper']}>
      <CreateFlightSheet onAdd={flightSheetListQuery.refetch} />
      <div className={styles['list']}>
        {flightSheetListQuery.isFetching && <div className="w-full flex justify-center"><Spin size="large" /></div>}
        {!flightSheetListQuery.isFetching && flightSheetListQuery.data !== undefined && flightSheetListQuery.data.list.map(item => (
          <FlightSheetListItem key={item.id} item={item}/>
        ))}
      </div>
    </div>
  )
}

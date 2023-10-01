import { HTMLProps } from "react"
import { DatePicker } from 'antd';
import { useStateObj } from "@/shared/lib";
import styles from './FDatePicker.module.scss'
import dayjs from "dayjs";
import _ from 'lodash'

type FDatePickerProps = Omit<HTMLProps<HTMLDivElement>, 'value' | 'onChange'> & {
  value?: null | [dayjs.Dayjs | null, dayjs.Dayjs | null]
  onChange?: (values: null | [dayjs.Dayjs | null, dayjs.Dayjs | null]) => void
}

export const FDatePicker = (props: FDatePickerProps) => {
  const innerState = useStateObj<null | [dayjs.Dayjs | null, dayjs.Dayjs | null]>(null)
  const state: ReturnType<typeof useStateObj<null | [dayjs.Dayjs | null, dayjs.Dayjs | null]>> = (() => {
    return {
      value: props.value ?? innerState.value,
      setValue: value => {
        innerState.setValue(prev => {
          const newValue = _.isFunction(value) ? value(prev) : value;
          if (props.onChange !== undefined) props.onChange(newValue)
          return newValue
        })
      }
    }
  })()

  return (
    <div {..._.omit(props, 'value', 'onChange')} className={(props.className ?? '') + ' ' + styles['wrapper']}>
      <DatePicker.RangePicker value={state.value} className={styles['input-container']} style={{ width: '100%' }} onChange={(values) => state.setValue(values)} format={'DD.MM.YYYY'} />
    </div>
  )
}

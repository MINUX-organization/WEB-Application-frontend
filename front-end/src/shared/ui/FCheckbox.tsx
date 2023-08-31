import { HTMLProps, SetStateAction } from "react"
import { useBoolean } from "usehooks-ts"
import _ from 'lodash'
import styles from './FCheckbox.module.scss'

const omittedProps = [
  'value',
  'onChange'
] as const

type FCheckboxProps = Omit<HTMLProps<HTMLDivElement>, typeof omittedProps[number]> & {
  value?: boolean
  onChange?: (value: boolean) => void
}


export const FCheckbox = (props: FCheckboxProps) => {
  const innerValue = useBoolean(false)
  const state = {
    value: props.value ?? innerValue.value,
    setValue: (argValue: SetStateAction<boolean>) => {
      const newValue = _.isFunction(argValue) ? argValue(state.value) : argValue;
      if (props.onChange !== undefined) props.onChange(newValue)
      innerValue.setValue(newValue);
    },
    setTrue: () => state.setValue(true),
    setFalse: () => state.setValue(false),
    toggle: () => state.setValue(prev => !prev)
  }
  return (
    <div className={(props.className ?? '') + ' ' + styles['wrapper'] + ' ' + (state.value ? styles['checked'] : '')} onClick={state.toggle}>
      <div className={styles['first-line']} />
      <div className={styles['second-line']} />
    </div>
  )
}

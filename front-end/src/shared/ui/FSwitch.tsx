import { HTMLProps } from "react"
import { useBoolean } from "usehooks-ts"
import styles from './FSwitch.module.scss'
import _ from 'lodash'

type FSwitchProps = Omit<HTMLProps<HTMLDivElement>, 'onChange'> & {
  checked?: boolean,
  onChange?: (checked: boolean) => void
  label?: string
  labelProps?: HTMLProps<HTMLSpanElement>
  /** placement of the label @default 'right' */
  labelPlacement?: 'left' | 'right'
}

export const FSwitch = (props: FSwitchProps) => {
  const innerValue = useBoolean(false);
  const value = props.checked ?? innerValue.value;

  const handleToggle = () => {
    if (props.onChange !== undefined) props.onChange(!value)
    innerValue.setValue(!value);
  }

  return (
    <div {..._.omit(props, 'checked', 'onChange', 'label', 'labelProps', 'labelPlacement')} onClick={e => {handleToggle(); if (props.onClick !== undefined) { props.onClick(e)}}} className={(props.className ?? '') + ' ' + styles['wrapper'] + ' ' + (props.labelPlacement === 'left' ? styles['reversed'] : '')}>
      <div className={styles['body'] + ' ' + (value ? styles['checked'] : '')}>
        <div className={styles['marker']} />
      </div>
      {props.label !== undefined && <span {...props.labelProps} className={(props.labelProps?.className ?? '') + ' ' + styles['label']}>{props.label}</span>}
    </div>
  )
}

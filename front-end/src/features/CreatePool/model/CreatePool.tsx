import { HTMLProps } from "react";
import { FButton, FTextInput } from "@shared/ui";
import { useStateObj } from "@shared/lib";
import { useBoolean } from "usehooks-ts";
import { createPool } from "../api";
import styles from './CreatePool.module.scss'
import _ from 'lodash'

const omittedProps = [
  'onAdd'
] as const

type CreatePoolProps = Omit<HTMLProps<HTMLDivElement>, typeof omittedProps[number]> & {
  onAdd?: () => void
}

export const CreatePool = (props: CreatePoolProps) => {
  const domain = useStateObj('');
  const port = useStateObj('');
  const isAdding = useBoolean(false);

  const action = {
    reset: () => {
      domain.setValue('');
      port.setValue('');
    },
    add: () => {
      if (domain.value === '') {alert('domain must be entered'); return;}
      if (domain.value === '') {alert('domain must be entered'); return;}
      const numPort = Number.parseInt(port.value);
      if (Number.isNaN(numPort)) {alert('port must be a number'); return;}
      isAdding.setTrue();
      createPool({
        domain: domain.value,
        port: numPort
      }).then(res => {
        if (props.onAdd !== undefined) props.onAdd();
        action.reset();
      }).catch(e => {
        alert(e.message);
      }).finally(() => {
        isAdding.setFalse();
      })
    }
  }

  return (
    <div {..._.omit(props, omittedProps)} className={(props.className ?? '') + ' ' + styles['wrapper']}>
      <div className={styles['field-label']}>Domain name</div>
      <FTextInput className={styles['field-value']} value={domain.value} onChange={domain.setValue} placeholder="Example: 2miner.com" />
      <div className={styles['field-label']}>Port</div>
      <FTextInput className={styles['field-value']} value={port.value} onChange={port.setValue} placeholder="Example: 4500" />
      <div className={styles['buttons']}>
        <FButton severity="bad" onClick={action.reset}>Reset</FButton>
        <FButton severity="good" loading={isAdding.value} onClick={action.add}>Add</FButton>
      </div>
    </div>
  )
}

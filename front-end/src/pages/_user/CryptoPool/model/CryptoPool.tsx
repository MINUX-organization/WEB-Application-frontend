import { CreateCryptocurrency } from "@features/CreateCryptocurrency";
import { CreatePool } from "@features/CreatePool";
import { HTMLProps } from "react";
import styles from './CtyptoPool.module.scss'


export const CryptoPool = (props: HTMLProps<HTMLDivElement>) => {
  return (
    <div {...props} className={(props.className ?? '') + ' ' + styles['wrapper']}>
      <div className={styles['label']}>Add cryptocurrency</div>
      <CreateCryptocurrency />
      <div className={styles['label']}>Add pool</div>
      <CreatePool />
    </div>
  )
}

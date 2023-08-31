import { HTMLProps } from "react";
import { PoolForm } from "./PoolForm"; 
import styles from './CryptoPool.module.scss'
import { CryptoForm } from "./CryptoForm";

export const CryptoPool = (props: HTMLProps<HTMLDivElement>) => {
  return (
    <div {...props} className={styles['wrapper']}> 
      <CryptoForm/> 

      <PoolForm/>
    </div>
  )
}

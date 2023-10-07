import { HTMLProps } from "react";
import styles from './analytics.module.scss'

export const Analytics = (props: HTMLProps<HTMLDivElement>) => {
  return (
    <div {...props} className={`${props.className ?? ''} ${styles['wrapper']}`}>
      <p>In development</p>
      <p>Coming soon...</p>
    </div>
  )
}

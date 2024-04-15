import { HTMLProps } from "react"
import styles from './FButton.module.scss'
import { ConfigProvider, Spin } from 'antd'
import _ from 'lodash'

const omittedProps = [
  'severity',
  'loading',
] as const

type FButtonProps = Omit<HTMLProps<HTMLButtonElement>, typeof omittedProps[number]> & {
  severity: 'good' | 'bad',
  type?: "button" | "submit" | "reset" | undefined
  loading?: boolean
}

export const FButton = (props: FButtonProps) => {
  return (
    <button {..._.omit(props, omittedProps)}
      className={
        (props.className ?? '') + ' ' +
        styles['wrapper'] + ' ' +
        (props.severity === 'good' ? styles['good'] : styles['bad']) + ' ' +
        (props.loading ? styles['loading'] : '')
      }
    >
      <div className={styles['inner']}>
        <ConfigProvider theme={{ token: { colorPrimary: 'white' }}}>
          <Spin className={styles['spin']} />
        </ConfigProvider>
        <div className={styles['children']}>{props.children}</div>
      </div>
    </button>
  )
}

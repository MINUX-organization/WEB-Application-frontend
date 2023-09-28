import { HTMLProps, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'
import { AiOutlineClose } from 'react-icons/ai'
import styles from './FModal.module.scss'

type FModaProps = PropsWithChildren & {
  open: boolean
  title: string
  onClose: () => void
  bodyProps?: HTMLProps<HTMLDivElement>
}

export const FModal = (props: FModaProps) => {

  return createPortal((
    <div className={styles['wrapper'] + ' ' + (props.open ? styles['open'] : '')} onMouseDown={e => e.target === e.currentTarget ? props.onClose() : null}>
      <div className={styles['inner']}>
        <div className={styles['header']}>
          <div className={styles['side-lines']} />
          <div className={styles['left-filler']} />
          <div className={styles['text']}>{props.title}</div>
          <AiOutlineClose className={styles['icon']} onClick={props.onClose}/>
        </div>
        {props.open &&
          <div {...props.bodyProps} className={(props.bodyProps?.className ?? '') + ' ' + styles['body']}>
            {props.children}
          </div>
        }
      </div>
    </div>
  ), document.body)
}

import { HTMLProps } from 'react'
import styles from './FQuadCornerContainer.module.scss'

/**
 * container with quads and sliced lines   
 * to override quads' and lines' color use "--color" property
 * @param props 
 * @returns 
 */
export const FQuadCornerContainer = (props: HTMLProps<HTMLDivElement> & { style?: { '--color'?: string }}) => {
  return (
    <div {...props} className={(props.className ?? '') + ' ' + styles['wrapper']}>
      <div className={styles['lt-corner']}></div>
      <div className={styles['rt-corner']}></div>
      <div className={styles['lb-corner']}></div>
      <div className={styles['rb-corner']}></div>
      <div className={styles['t-line']}></div>
      <div className={styles['b-line']}></div>
      <div className={styles['l-line']}></div>
      <div className={styles['r-line']}></div> 
      {props.children} 
    </div>
  )
}

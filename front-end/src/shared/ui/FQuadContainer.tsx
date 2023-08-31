import { HTMLProps } from "react"
import styles from './FQuadContainer.module.scss'
import _ from 'lodash'

const omittedProps = [
  'filled',
  'defaultHideDecorators',
  'visibility',
  'bodyProps'
]

type FQuadContainerProps = HTMLProps<HTMLDivElement> & {
  /** fill quads */
  filled?: boolean
  /** defines default visibility of quads */
  defaultHideDecorators?: boolean
  /** props for body element */
  bodyProps?: HTMLProps<HTMLDivElement>
  /** defines what parts of container are visible */
  visibility?: {
    /** left top quad */
    lt?: boolean,
    /** right top quad */
    rt?: boolean,
    /** left bottom quad */
    lb?: boolean,
    /** right bottom quad */
    rb?: boolean,
    /** left line */
    ll?: boolean,
    /** top line */
    tl?: boolean,
    /** right line */
    rl?: boolean,
    /** bottom line */
    bl?: boolean,
    /** left side */
    _l?: boolean,
    /** top side */
    _t?: boolean,
    /** right side */
    _r?: boolean,
    /** bottom side */
    _b?: boolean
  }
}

/** container with quads on corners */
export const FQuadContainer = (props: FQuadContainerProps) => {
  const defValue = !(props.defaultHideDecorators ?? false)
  const filled = props.filled ?? false;

  const hvis = {
    _l: props.visibility?._l ?? true,
    _t: props.visibility?._t ?? true,
    _r: props.visibility?._r ?? true,
    _b: props.visibility?._b ?? true
  }

  const vis = {
    lt: (hvis._l && hvis._t) && (props.visibility?.lt ?? defValue),
    rt: (hvis._r && hvis._t) && (props.visibility?.rt ?? defValue),
    lb: (hvis._l && hvis._b) && (props.visibility?.lb ?? defValue),
    rb: (hvis._r && hvis._b) && (props.visibility?.rb ?? defValue),
    ll: props.visibility?.ll ?? true,
    tl: props.visibility?.tl ?? true,
    rl: props.visibility?.rl ?? true,
    bl: props.visibility?.bl ?? true,
    ...hvis
  }
  return (
    <div {..._.omit(props, omittedProps)} className={(props.className ?? '') + ' ' + styles['wrapper']}>
      {vis.lt && <div className={styles['lt-corner'] + ' ' + (filled ? styles['filled'] : '')} />}
      {vis.rt && <div className={styles['rt-corner'] + ' ' + (filled ? styles['filled'] : '')} />}
      {vis.lb && <div className={styles['lb-corner'] + ' ' + (filled ? styles['filled'] : '')} />}
      {vis.rb && <div className={styles['rb-corner'] + ' ' + (filled ? styles['filled'] : '')} />}
      {vis._t && vis.tl && <div className={styles['t-line'] + ' ' + (!vis.lt ? styles['no-l-corner'] : '') + ' ' + (!vis.rt ? styles['no-r-corner'] : '')} />}
      {vis._b && vis.bl && <div className={styles['b-line'] + ' ' + (!vis.lb ? styles['no-l-corner'] : '') + ' ' + (!vis.rb ? styles['no-r-corner'] : '')} />}
      {vis._l && vis.ll && <div className={styles['l-line'] + ' ' + (!vis.lt ? styles['no-t-corner'] : '') + ' ' + (!vis.lb ? styles['no-b-corner'] : '')} />}
      {vis._r && vis.rl && <div className={styles['r-line'] + ' ' + (!vis.rt ? styles['no-t-corner'] : '') + ' ' + (!vis.rb ? styles['no-b-corner'] : '')} />}
      <div {...props.bodyProps} className={(props.bodyProps?.className ?? '') + ' ' + styles['body']}>
        {props.children}
      </div>
    </div>
  )
}

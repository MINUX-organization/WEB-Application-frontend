import { CSSProperties, ComponentPropsWithoutRef, HTMLProps, SetStateAction, useRef, useState } from "react"
import { useStateObj } from "@/shared/lib"
import { useElementSize } from "usehooks-ts";
import styles from './FNumInput.module.scss'
import _ from 'lodash'
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const lineHeight = 30;
const px = 10;
const py = 15;

const omitProps = [
  'value',
  'onChange',
  'placeholder',
  'title',
  'inputProps'
] as const

type FTextInputProps = Omit<ComponentPropsWithoutRef<'div'>, typeof omitProps[number]> & {
  value?: number
  onChange?: (value: SetStateAction<number>) => void
  placeholder?: string
  title?: string
  inputProps?: HTMLProps<HTMLInputElement>
}

export const FNumInput = (props: FTextInputProps) => {
  const refRTLine = useRef<HTMLDivElement>(null)
  const innerState = useStateObj(0)
  const state = {
    value: props.value ?? innerState.value,
    setValue: (argValue: SetStateAction<number>) => {
      const newValue = _.isFunction(argValue) ? argValue(state.value) : argValue;
      if (props.onChange !== undefined) props.onChange(newValue)
      innerState.setValue(newValue)
    }
  }
  const [refTitle, titleSize] = useElementSize()
  const [titleWidth, setTitleWidth] = useState(0)

  return (
    <div {..._.omit(props, omitProps)}
      onClick={() => setTitleWidth(titleSize.width)}
      className={(props.className ?? '') + ' ' + styles['wrapper'] + ' ' + (props.title === undefined || props.title === '' ? styles['no-title'] : '')}
      style={{
        '--px': px + 'px',
        '--py': py + 'px',
        '--line-height': lineHeight + 'px',
        '--title-width': titleWidth + 'px'
      } as CSSProperties}
    >
      <div ref={refTitle} className={styles['title']}>{props.title}</div>
      <div className={styles['lt-line']} />
      <div ref={refRTLine} className={styles['rt-line']} />
      <input
        {...props.inputProps}
        className={(props.inputProps?.className ?? '') + ' ' + styles['input']}
        type='number'
        placeholder={props.placeholder}
        value={state.value}
        onChange={e => state.setValue(e.target.valueAsNumber)}
      />
      <div className={styles['arrows']}>
        <button tabIndex={-1} onClick={() => state.setValue(prev => Number.isNaN(prev) ? 1 : prev + 1)} ><AiOutlineUp /></button>
        <button tabIndex={-1} onClick={() => state.setValue(prev => Number.isNaN(prev) ? -1 : prev - 1)}><AiOutlineDown /></button>
      </div>
    </div> 
  )
}

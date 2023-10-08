import { CSSProperties, ComponentPropsWithoutRef, HTMLProps, SetStateAction, useRef, useState } from "react"
import { useStateObj } from "@/shared/lib"
import { useElementSize } from "usehooks-ts";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import styles from './FNumInput.module.scss'
import _ from 'lodash'

const lineHeight = 30;
const px = 10;
const py = 15;

const omitProps = [
  'value',
  'onChange',
  'placeholder',
  'title',
  'inputProps',
  'min',
  'max'
] as const

type FTextInputProps = Omit<ComponentPropsWithoutRef<'div'>, typeof omitProps[number]> & {
  value?: number | null
  onChange?: (value: SetStateAction<number | null>) => void
  placeholder?: string
  title?: string
  inputProps?: HTMLProps<HTMLInputElement>
  min?: number
  max?: number
}

export const FNumInput = (props: FTextInputProps) => {
  const clipValue = (value: number | null) => {
    if (value === null) return null;
    if (props.min !== undefined && value < props.min) return props.min
    if (props.max !== undefined && value > props.max) return props.max
    return value;
  }
  const refRTLine = useRef<HTMLDivElement>(null)
  const innerState = useStateObj<number | null>(null)
  const state = {
    value: props.value ?? innerState.value,
    setValue: (argValue: SetStateAction<number | null>) => {
      const newValue = _.isFunction(argValue) ? argValue(state.value) : argValue;
      if (props.onChange !== undefined) props.onChange(newValue)
      innerState.setValue(newValue)
    },
    setValueClipped: (argValue: SetStateAction<number | null>) => {
      let newValue = clipValue(_.isFunction(argValue) ? argValue(state.value) : argValue);
      if (props.onChange !== undefined) props.onChange(newValue)
      innerState.setValue(newValue)
    }
  }
  const [refTitle, titleSize] = useElementSize()
  const [titleWidth, setTitleWidth] = useState(0)



  const updateClipValue = () => {
    state.setValue(prev => clipValue(prev))
  }

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
        value={state.value ?? NaN}
        onBlur={updateClipValue}
        onChange={e => state.setValue(_.isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber)}
      />
      <div className={styles['arrows']}>
        <button tabIndex={-1} onClick={() => state.setValueClipped(prev => _.isNil(prev) ? 1 : prev + 1)} ><AiOutlineUp /></button>
        <button tabIndex={-1} onClick={() => state.setValueClipped(prev => _.isNil(prev) ? -1 : prev - 1)}><AiOutlineDown /></button>
      </div>
      {(props.min !== undefined || props.max !== undefined) &&
        <div className={styles['min-max-popup']}>
          {props.min ?? '*'} - {props.max ?? '*'}
        </div>
      }
    </div> 
  )
}

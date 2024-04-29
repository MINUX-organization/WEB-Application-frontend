import { CSSProperties, HTMLProps, SetStateAction, useRef } from "react"
import { useFInterval, useStateObj } from "@/shared/lib"
import { AiOutlineClose, AiOutlineDown } from "react-icons/ai"
import { useBoolean, useEventListener, useWindowSize } from "usehooks-ts"
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Spin } from "antd";
import { FCheckbox } from "./FCheckbox";
import styles from './FDropdown.module.scss'
import _ from 'lodash'

const omittedProps = [
  'options',
  'value',
  'onChange',
  'getOptionLabel',
  'getOptionValue',
  'placeholder',
  'loading',
  'disabled',
  'warnWhenNoOptions'
] as const

const optionsListHeight = 300
const optionsListOffset = 0
const screenOffset = 10;

type FDropdownProps<T> = Omit<HTMLProps<HTMLDivElement>, typeof omittedProps[number]> & {
  /** array of options, any kind of type is allowed */
  options: Array<T>
  /** sets text that is displayed per each option */
  getOptionLabel: (item: T) => string
  /** sets key for each option */
  getOptionValue: (item: T) => string
  /** text that is displayed while value is null or empty array */
  placeholder?: string
  /** replaces dropdown icon with spinner and hides dropdown menu */
  loading?: boolean
  /** disables pointer events and sets opacity to 0.5 */
  disabled?: boolean
  /** will highlight whole component with red color */
  warnWhenNoOptions?: boolean
} & (
  {
    /** can select multilple options, value is array */
    multiple: true,
    /** value, an array */
    value?: T[],
    /** will be fired when user change selection */
    onChange?: (value: T[]) => void
  } |
  {
    /** can select multilple options, value is single item */
    multiple?: false,
    /** value, single item */
    value?: T | null,
    /** will be fired when user change selection */
    onChange?: (value: T | null) => void
  }
)

/** dropdown menu */
export const FDropdown = <T,>(props: FDropdownProps<T>) => {
  const innerSelectedSingle = useStateObj<T | null>(null)
  const innerSelectedMultiple = useStateObj<T[]>([])
  const window = useWindowSize();
  const optionListRef = useRef<HTMLDivElement | null>(null)
  const state = (() => {
    const selectedSingle = {
      value: !props.multiple && props.value !== undefined ? props.value : innerSelectedSingle.value,
      setValue: (argValue: SetStateAction<T | null>) => {
        const newValue = _.isFunction(argValue) ? argValue(state.selectedSingle.value) : argValue;
        if (props.onChange !== undefined && !props.multiple) props.onChange(newValue);
        state.isOpen.setFalse();
        innerSelectedSingle.setValue(newValue);
      }
    }

    const selectedMultiple = {
      value: props.multiple && props.value !== undefined ? props.value : innerSelectedMultiple.value,
      setValue: (argValue: SetStateAction<T[]>) => {
        const newValue = _.isFunction(argValue) ? argValue(state.selectedMultiple.value) : argValue;
        if (props.onChange !== undefined && props.multiple) props.onChange(newValue);
        innerSelectedMultiple.setValue(newValue);
      }
    }

    return {
      selectedSingle,
      selectedMultiple,

      updateAbove: () => {
        if (window !== undefined && state.ref.current !== null) {
          const box = state.ref.current.getBoundingClientRect();
          const listBox = optionListRef.current?.getBoundingClientRect();
          if (box.bottom + listBox!.height > window.height - screenOffset) {
            state.isAbove.setTrue();
          } else {
            state.isAbove.setFalse();
          }
        }
      },
      isOpen: (() => {
        const v = useBoolean(false);
        const setValue = (argValue: SetStateAction<boolean>) => {
          v.setValue(prev => {
            state.updateAbove()
            return _.isFunction(argValue) ? argValue(prev) : argValue
          })
        }
        return {
          value: v.value,
          setValue,
          setFalse: () => setValue(false),
          setTrue: () => setValue(true),
          toggle: () => setValue(prev => !prev)
        }
      })(),
      isAbove: useBoolean(false),
      ref: useRef<HTMLDivElement>(null),
      optionListRef,
    }
  })()

  useEventListener('click', (e) => {
    if (_.isElement(e.target)) {
      let el = e.target as HTMLElement | null
      // if clicked outside
      while (el !== null) {
        if (el === state.ref.current) return
        el = el.parentElement
      }
      state.isOpen.setFalse()
    }
  })
  useFInterval(state.updateAbove, 300, state.isOpen.value)

  return (
    <div
      {..._.omit(props, omittedProps)}
      ref={state.ref}
      className={
        styles['wrapper'] + ' ' +
        (props.className ?? '') + ' ' +
        ((state.isOpen.value && !props.disabled && !props.loading) ? styles['open'] : '') + ' ' +
        (((props.disabled ?? false)) ? styles['disabled'] : '') + ' ' +
        (props.options.length === 0 && (props.warnWhenNoOptions ?? false) && !props.loading ? styles['warn-no-options'] : '')
      }
      style={{
        '--options-list-height': optionsListHeight + 'px',
        '--options-list-offset': optionsListOffset + 'px'
      } as CSSProperties}
    >
      <div onClick={state.isOpen.toggle} className={styles['value']}>
        {((!props.multiple && state.selectedSingle.value === null) || (props.multiple && state.selectedMultiple.value.length === 0)) && 
          <div className={styles['placeholder']}>
            {props.options.length === 1 && props.getOptionLabel(props.options[0])}
            {props.options.length !== 1 && (props.placeholder ?? 'Select')}
          </div>
        }
        {!props.multiple && state.selectedSingle.value !== null && props.getOptionLabel(state.selectedSingle.value)}
        {props.multiple && state.selectedMultiple.value.length !== 0 && (
          (state.selectedMultiple.value.length === 1 && props.getOptionLabel(state.selectedMultiple.value[0])) ||
          (state.selectedMultiple.value.length !== 1 && (
            (state.selectedMultiple.value.length === props.options.length && 'All selected') ||
            (state.selectedMultiple.value.length !== props.options.length && state.selectedMultiple.value.length + ' selected')
          ))
        )}
      </div>
      <div className={styles['divider']} />
      {((!props.multiple && state.selectedSingle.value !== null) || (props.multiple && state.selectedMultiple.value.length !== 0)) &&
        <AiOutlineClose
          className={styles['icon'] + ' ' + styles['sp1']}
          onClick={e => {
            if (!props.multiple) state.selectedSingle.setValue(null);
            if (props.multiple) state.selectedMultiple.setValue([]);
            state.isOpen.setFalse();
          }}
        />
      }
      {props.loading && <Spin className={styles['spin']} />}
      {!props.loading && <AiOutlineDown className={styles['icon'] + ' ' + styles['sp1']} onClick={state.isOpen.toggle} />}
      <div ref={state.optionListRef} className={styles['option-list'] + ' ' + (state.isAbove.value ? styles['above'] : '')}>
        {props.options.length === 0 &&
          <div className={styles['no-options']}>
            no options
          </div>
        }
        {props.options.length !== 0 &&
          <Scrollbars
            renderThumbVertical={props => <div {...props} className={styles['scroll-thumb']} />}
            style={{ width: '100%' }}
            autoHide
            autoHeight
            autoHeightMax={optionsListHeight}
          >
            {props.options.map((option, index) => (
              <div
                key={props.getOptionValue(option)}
                className={
                  styles['option-item'] + ' ' +
                  (!props.multiple && (state.selectedSingle.value !== null && props.getOptionValue(state.selectedSingle.value) === props.getOptionValue(option)) ? styles['active'] : '') + ' ' +
                  (props.multiple && state.selectedMultiple.value.find(v => props.getOptionValue(v) === props.getOptionValue(option)) ? styles['active-multiple'] : '')
                }
                onClick={() => {
                  if (!props.multiple) {
                    state.selectedSingle.setValue(option)
                  } else {
                    state.selectedMultiple.setValue(prev => {
                      if (prev.includes(option)) {
                        return prev.filter(v => v !== option)
                      }
                      return [...prev, option]
                    })
                  }
                }}
              >
                {props.multiple &&
                  <div className={styles['multiple-item']}>
                    <FCheckbox className={styles['multiple-item-checkbox']} value={state.selectedMultiple.value.includes(option)} />
                    {props.getOptionLabel(option)}
                  </div>
                }
                {!props.multiple && props.getOptionLabel(option)}
              </div>
            ))}
          </Scrollbars>
        }
      </div>
    </div>
  )
}

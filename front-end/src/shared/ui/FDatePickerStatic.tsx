import { HTMLProps } from "react"
import { useStateObj } from "@/shared/lib"
import styles from './FDatePickerStatic.module.scss'
import dayjs from 'dayjs'
import _ from 'lodash'

type FDatePickerStatcProps = Omit<HTMLProps<HTMLDivElement>, 'value' | 'onChange'> & {
  value?: dayjs.Dayjs
  onChange?: (value: dayjs.Dayjs) => void
}

export const FDatePickerStatic = (props: FDatePickerStatcProps) => {
  const innerValue = useStateObj(dayjs().startOf('d'));
  const selected: ReturnType<typeof useStateObj<dayjs.Dayjs>> = (() => {
    return {
      value: props.value?.startOf('d') ?? innerValue.value,
      setValue: value => {
        innerValue.setValue(prev => {
          const newValue = _.isFunction(value) ? value(prev) : value;
          if (props.onChange !== undefined) props.onChange(newValue);
          return newValue;
        })
      }
    }
  })()
  const pickerState = useStateObj<'date' | 'month' | 'year'>('date')
  const pageDate = useStateObj(dayjs().startOf('M').startOf('d'))
  const action = {
    moveLeft: () => {
      switch (pickerState.value) {
        case 'date':
          pageDate.setValue(prev => prev.subtract(1, 'M'));
          break;
        case 'month':
          break;
        case 'year':
          pageDate.setValue(prev => prev.subtract(18, 'y'))
      }
    },
    moveRight: () => {
      switch (pickerState.value) {
        case 'date':
          pageDate.setValue(prev => prev.add(1, 'M'));
          break;
        case 'month':
          break;
        case 'year':
          pageDate.setValue(prev => prev.add(18, 'y'))
      }
    },
    changeMonth: (month: number) => {
      pageDate.setValue(prev => {
        const newPage = prev.set('M', month).startOf('M');
        pickerState.setValue('date');
        return newPage
      })
    },
    changeYear: (year: number) => {
      pageDate.setValue(prev => {
        const newPage = prev.set('y', year).set('M', pageDate.value.get('M')).startOf('M');
        pickerState.setValue('date');
        return newPage;
      })
    }
  }
  return (
    <div {..._.omit(props, 'value', 'onChange')} className={(props.className ?? '') + ' ' + styles['wrapper']}>
      <div className={styles['header']}>
        <button onClick={action.moveLeft} className={styles['arrow'] + ' ' + (pickerState.value === 'month' ? styles['disabled'] : '')}>{'<'}</button>
        {pickerState.value === 'date' &&
          <div className={styles['month-year']}>
            <div className={styles['month']} onClick={() => pickerState.setValue('month')}>{pageDate.value.format('MMMM')}</div>
            <div className={styles['year']} onClick={() => pickerState.setValue('year')}>{pageDate.value.format('YYYY')}</div>
          </div>
        }
        {pickerState.value !== 'date' &&
          <div className={styles['ok-button']} onClick={() => pickerState.setValue('date')}>
            Back
          </div>
        }
        <button onClick={action.moveRight} className={styles['arrow'] + ' ' + (pickerState.value === 'month' ? styles['disabled'] : '')}>{'>'}</button>
      </div>
      <div className={styles['pick-area']}>
        {pickerState.value === 'date' &&
          <div className={styles['page-days']}>
            {(() => {
              const prevDaysCount = pageDate.value.get('d')
              const daysInMonth = pageDate.value.daysInMonth()
              return [...Array(42)].map((_v, i) => {
                const date = pageDate.value.subtract(prevDaysCount, 'd').add(i, 'd').set('y', pageDate.value.get('y'))
                return (
                  <div className={styles['day'] + ' ' + (date.isSame(selected.value) ? styles['active'] : '') + ' ' + ((i < prevDaysCount || i - prevDaysCount + 1 > daysInMonth) ? styles['excluded-day'] : '')} onClick={() => selected.setValue(date)}>
                    {date.get('D')}
                  </div>
                )
              })
            })()}
          </div>
        }
        {pickerState.value === 'month' &&
          <div className={styles['months']}>
            {[...Array(12)].map((v, index) => (
              <div className={styles['month'] + ' ' + (selected.value.get('month') === index ? styles['active'] : '') + ' ' + (pageDate.value.get('month') === index ? styles['visible-now'] : '')} onClick={() => action.changeMonth(index)}>
                {dayjs(0).set('M', index).format('MMMM')}
              </div>
            ))}
          </div>
        }
        {pickerState.value === 'year' &&
          <div className={styles['years']}>
            {[...Array(18)].map((v, index) => {
              const year = Math.floor(pageDate.value.get('year') / 18) * 18 + index;
              return (
                <div className={styles['year'] + ' ' + (selected.value.get('year') === year ? styles['active'] : '') + ' ' + (pageDate.value.get('year') === year ? styles['visible-now'] : '')} onClick={() => action.changeYear(year)}>
                  {year}
                </div>
              )
            })}
          </div>
        }
      </div>
    </div>
  )
}

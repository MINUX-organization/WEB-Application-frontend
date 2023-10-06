import { HTMLProps } from "react";
import { FButton, FDropdown, FTextInput } from "@/shared/ui";
import { useStateObj } from "@/shared/lib";
import { TAlgorithm } from "@/shared/types";
import { useQuery } from "react-query";
import { createCryptocurrency, getFullAlgorithms } from "../api";
import { useBoolean } from "usehooks-ts";
import { showNotifyInfo } from "@/shared/utils";
import { toast } from "react-toastify";
import styles from './CreateCryptocurrency.module.scss'
import _ from 'lodash'

const omittedProps = [
  'onAdd'
] as const

type CreateCryptocurrencyProps = Omit<HTMLProps<HTMLDivElement>, typeof omittedProps[number]> & {
  onAdd?: () => void
}

export const CreateCryptocurrency = (props: CreateCryptocurrencyProps) => {
  const algorithmListQuery = useQuery(['load algorithm list'], () => getFullAlgorithms({}))
  const shortName = useStateObj('');
  const fullName = useStateObj('');
  const algorithm = useStateObj<TAlgorithm | null>(null)
  const isAdding = useBoolean(false)

  const action = {
    reset: () => {
      shortName.setValue('');
      fullName.setValue('');
      algorithm.setValue(null);
    },
    add: () => {
      if (shortName.value === '') {showNotifyInfo('Short name must be entered'); return}
      if (fullName.value === '') {showNotifyInfo('Full name must be entered'); return}
      if (algorithm.value === null) {showNotifyInfo('Algorithm must be selected'); return}
      isAdding.setTrue();
      createCryptocurrency({
        name: shortName.value,
        fullName: fullName.value,
        algorithmId: algorithm.value.id
      }).then(res => {
        toast.info('cryptocurrency added')
        if (props.onAdd !== undefined) props.onAdd();
        action.reset();
      }).catch(e => {
        toast.error(e.message)
      }).finally(() => {
        isAdding.setFalse();
      })
    }
  }

  return (
    <div {..._.omit(props, omittedProps)} className={(props.className ?? '') + ' ' + styles['wrapper']}>
      <div className={styles['label']}>Add cryptocurrency</div>
      <div className={styles['field-label']}>Short name</div>
      <FTextInput className={styles['field-value']} value={shortName.value} onChange={value => shortName.setValue(value)} placeholder="Example: BTC" />
      <div className={styles['field-label']}>Full name</div>
      <FTextInput className={styles['field-value']} value={fullName.value} onChange={value => fullName.setValue(value)} placeholder="Example: Bitcoin" />
      <div className={styles['field-label']}>Algorithm</div>
      <FDropdown
        className={styles['field-value']}
        value={algorithm.value}
        onChange={value => algorithm.setValue(value)}
        options={algorithmListQuery.data?.data.algorithms ?? []}
        getOptionLabel={item => item.name}
        getOptionValue={item => item.id.toString()}
        loading={algorithmListQuery.isFetching}
        placeholder="Select algorithm"
      />
      <div className={styles['buttons']}>
        <FButton severity="bad" onClick={action.reset}>Reset</FButton>
        <FButton severity="good" loading={isAdding.value} onClick={action.add}>Add</FButton>
      </div>
    </div>
  )
}

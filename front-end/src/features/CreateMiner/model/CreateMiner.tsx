import { HTMLProps } from "react";
import { useStateObj } from "@/shared/lib";
import { FButton, FDropdown, FTextInput } from "@/shared/ui";
import { useBoolean } from "usehooks-ts";
import { createMiner, getAlgorithmList } from "../api";
import { useQuery } from "react-query";
import { TAlgorithm } from "@/shared/types";
import styles from './CreateMiner.module.scss'
import _ from 'lodash'

const omittedProps = [
  'onAdd'
] as const


type CreateMinerProps = Omit<HTMLProps<HTMLDivElement>, typeof omittedProps[number]> & {
  onAdd?: () => void
}
export const CreateMiner = (props: CreateMinerProps) => {
  const algorithmListQuery = useQuery(['load algorithm list'], () => getAlgorithmList({}))
  const name = useStateObj('');
  const fullName = useStateObj('');
  const isAdding = useBoolean(false);
  const algorithms = useStateObj<TAlgorithm[]>([]);

  const action = {
    reset: () => {
      name.setValue('')
      fullName.setValue('')
      algorithms.setValue([])
    },
    add: () => {
      if (name.value === '') { alert('name must be entered'); return}
      if (fullName.value === '') { alert('full name must be entered'); return}
      isAdding.setTrue();
      createMiner({
        name: name.value,
        fullName: fullName.value,
      }).then(res => {
        if (props.onAdd !== undefined) props.onAdd();
      }).catch(e => {
        alert(e.message);
      }).finally(() => {
        isAdding.setFalse();
      })
    }
  }

  return (
    <div {..._.omit(props, omittedProps)} className={(props.className ?? '') + ' ' + styles['wrapper']}>
      <div className={styles['field-label']}>Name</div>
      <FTextInput className={styles['field-value']} value={name.value} onChange={name.setValue} placeholder="Name" />
      <div className={styles['field-label']}>Full name</div>
      <FTextInput className={styles['field-value']} value={fullName.value} onChange={fullName.setValue} placeholder="Full name" />
      <div className={styles['field-label']}>Algorithms</div>
      <FDropdown
        className={styles['field-value']}
        multiple
        value={algorithms.value}
        onChange={value => algorithms.setValue(value)}
        options={algorithmListQuery.data?.list ?? []}
        getOptionLabel={item => item.name}
        getOptionValue={item => item.id.toString()}
        loading={algorithmListQuery.isFetching}
        placeholder="Select algorithms"
      />
      <div className={styles['buttons']}>
        <FButton severity="bad" onClick={action.reset}>Reset</FButton>
        <FButton severity="good" loading={isAdding.value} onClick={action.add}>Add</FButton>
      </div>
    </div>
  )
}

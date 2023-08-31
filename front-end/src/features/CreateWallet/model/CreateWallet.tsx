import { HTMLProps } from "react";
import { useQuery } from "react-query";
import { createWallet, getCryptocurrencyList } from "../api";
import { useStateObj } from "@shared/lib";
import { FButton, FDropdown, FTextInput } from "@shared/ui";
import { TCryptocurrency } from "@shared/types";
import { useBoolean } from "usehooks-ts";
import styles from './CreateWallet.module.scss'
import _ from 'lodash'

const omittedProps = [
  'onAdd'
] as const

type CreateWalletProps = Omit<HTMLProps<HTMLDivElement>, typeof omittedProps[number]> & {
  onAdd?: () => void
}

export const CreateWallet = (props: CreateWalletProps) => {
  const cryptocurrencyList = useQuery(['load cryptocurrency list'], () => getCryptocurrencyList({}))
  const cryptocurrency = useStateObj<TCryptocurrency | null>(null)
  const name = useStateObj('');
  const source = useStateObj('');
  const address = useStateObj('');
  const isAdding = useBoolean(false);

  const action = {
    reset: () => {
      cryptocurrency.setValue(null);
      name.setValue('');
      source.setValue('');
      address.setValue('')
    },
    add: () => {
      if (cryptocurrency.value === null) { alert('wallet\'s cryptocurrency must be selected'); return }
      if (name.value === '') { alert('wallet\'s name must be entered'); return }
      if (source.value === '') { alert('wallet\'s source must be entered'); return }
      if (address.value === '') { alert('wallet\'s address must be entered'); return }
      isAdding.setTrue();
      createWallet({
        cryptocurrencyId: cryptocurrency.value.id,
        address: address.value,
        name: name.value,
        source: source.value
      }).then(res => {
        if (props.onAdd !== undefined) props.onAdd();
        action.reset();
      }).catch(e => {
        alert(e.message);
      }).finally(() => {
        isAdding.setFalse();
      })
    }
  }

  return (
    <div {..._.omit(props, omittedProps)} className={(props.className ?? '') + ' ' + styles['wrapper']}>
      <div className={styles['field-label']}>Cryptocurrency</div>
      <div>
        <FDropdown
          className={styles['field-value']}
          value={cryptocurrency.value}
          onChange={value => cryptocurrency.setValue(value)}
          options={cryptocurrencyList.data?.list ?? []}
          getOptionLabel={item => item.name}
          getOptionValue={item => item.id.toString()}
          loading={cryptocurrencyList.isFetching}
          placeholder="Cryptocurrency"
        />
      </div>
      <div className={styles['field-label']}>Name</div>
      <FTextInput className={styles['field-value']} value={name.value} onChange={name.setValue} placeholder="Name" />
      <div className={styles['field-label']}>Source</div>
      <FTextInput className={styles['field-value']} value={source.value} onChange={source.setValue} placeholder="Source" />
      <div className={styles['field-label']}>Address</div>
      <FTextInput className={styles['field-value']} value={address.value} onChange={address.setValue} placeholder="Address" />
      <div className={styles['buttons']}>
        <FButton severity="bad" onClick={action.reset}>Reset</FButton>
        <FButton severity="good" loading={isAdding.value} onClick={action.add}>Add</FButton>
      </div>
    </div>
  )
}

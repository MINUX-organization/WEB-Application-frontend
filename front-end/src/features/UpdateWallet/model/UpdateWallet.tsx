import { HTMLProps } from "react";
import { useQuery } from "react-query";
import { updateWallet, getFullCryptocurrencies } from "../api";
import { useStateObj } from "@/shared/lib";
import { FButton, FDropdown, FTextInput } from "@/shared/ui";
import { TCryptocurrency, TWalletFilled } from "@/shared/types";
import { useBoolean } from "usehooks-ts";
import styles from './UpdateWallet.module.scss'
import _ from 'lodash'

const omittedProps = [
  'item',
  'onUpdate',
] as const

type UpdateWalletProps = Omit<HTMLProps<HTMLDivElement>, typeof omittedProps[number]> & {
  item: TWalletFilled
  onUpdate?: () => void
}

export const UpdateWallet = (props: UpdateWalletProps) => {
  const cryptocurrencyList = useQuery(['load cryptocurrency list'], () => getFullCryptocurrencies({}))
  const cryptocurrency = useStateObj<TCryptocurrency | null>(props.item.cryptocurrency)
  const name = useStateObj(props.item.name);
  const source = useStateObj(props.item.source);
  const address = useStateObj(props.item.address);
  const isAdding = useBoolean(false);

  const action = {
    reset: () => {
      cryptocurrency.setValue(props.item.cryptocurrency);
      name.setValue(props.item.name);
      source.setValue(props.item.source);
      address.setValue(props.item.address)
    },
    update: () => {
      if (cryptocurrency.value === null) { alert('wallet\'s cryptocurrency must be selected'); return }
      if (name.value === '') { alert('wallet\'s name must be entered'); return }
      if (source.value === '') { alert('wallet\'s source must be entered'); return }
      if (address.value === '') { alert('wallet\'s address must be entered'); return }
      isAdding.setTrue();
      updateWallet({
        id: props.item.id,
        cryptocurrencyId: cryptocurrency.value.id,
        address: address.value,
        name: name.value,
        source: source.value
      }).then(res => {
        if (props.onUpdate !== undefined) props.onUpdate();
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
          options={cryptocurrencyList.data?.data.cryptocurrencies ?? []}
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
        <FButton severity="good" loading={isAdding.value} onClick={action.update}>Update</FButton>
      </div>
    </div>
  )
}

import { HTMLProps, useMemo } from "react";
import { FButton, FDropdown, FTextInput } from "@/shared/ui";
import { useStateObj } from "@/shared/lib";
import { useBoolean, useMap } from "usehooks-ts";
import { createPool } from "../api";
import { showNotifyInfo } from "@/shared/utils";
import { TCryptocurrency } from "@/shared/types";
import { useQuery } from "react-query";
import { getFullCryptocurrencies } from "@/shared/api";
import styles from './CreatePool.module.scss'
import _ from 'lodash'
import { toast } from "react-toastify";

const omittedProps = [
  'onAdd'
] as const

type CreatePoolProps = Omit<HTMLProps<HTMLDivElement>, typeof omittedProps[number]> & {
  onAdd?: () => void
}

export const CreatePool = (props: CreatePoolProps) => {
  const domain = useStateObj('');
  const port = useStateObj('');
  const isAdding = useBoolean(false);
  const cryptocurrencyListQuery = useQuery(['load cryptocurrency list'], () => getFullCryptocurrencies({}))
  const cryptocurrency = useStateObj<TCryptocurrency | null>(null)
  const cryptocurrencySmart = useMemo(() => {
    if (cryptocurrency.value !== null) return cryptocurrency.value
    if (cryptocurrencyListQuery.data !== undefined && cryptocurrencyListQuery.data.data.cryptocurrencies.length === 1) {
      return cryptocurrencyListQuery.data.data.cryptocurrencies[0]
    }
    return null
  }, [cryptocurrencyListQuery.data, cryptocurrency])

  const action = {
    reset: () => {
      cryptocurrency.setValue(null);
      domain.setValue('');
      port.setValue('');
    },
    add: () => {
      if (cryptocurrencySmart === null) {toast.error('Cryptocurrency must be selected'); return;}
      if (domain.value === '') {toast.error('Domain must be entered'); return;}
      if (port.value === '') {toast.error('Port must be entered'); return;}
      const numPort = Number.parseInt(port.value);
      if (Number.isNaN(numPort)) {toast.error('Port must be a number'); return;}
      isAdding.setTrue();
      createPool({
        cryptocurrencyId: cryptocurrencySmart.id,
        host: domain.value,
        port: numPort
      }).then(res => {
        toast.info('pool added')
        if (props.onAdd !== undefined) props.onAdd();
        action.reset();
      }).catch(e => {
        // alert(e.message);
      }).finally(() => {
        isAdding.setFalse();
      })
    }
  }

  return (
    <div {..._.omit(props, omittedProps)} className={(props.className ?? '') + ' ' + styles['wrapper']}>
      <div className={styles['label']}>Add pool</div>
      <div className={styles['field-label']}>Cryptocurrency</div>
      <FDropdown
        className={styles['field-value']}
        value={cryptocurrencySmart}
        onChange={value => cryptocurrency.setValue(value)}
        options={cryptocurrencyListQuery.data?.data.cryptocurrencies ?? []}
        getOptionLabel={item => item.name}
        getOptionValue={item => item.id.toString()}
        loading={cryptocurrencyListQuery.isFetching}
        placeholder="Select cryptocurrency"
      />
      <div className={styles['field-label']}>Domain name</div>
      <FTextInput className={styles['field-value']} value={domain.value} onChange={domain.setValue} placeholder="Example: 2miner.com" />
      <div className={styles['field-label']}>Port</div>
      <FTextInput className={styles['field-value']} value={port.value} onChange={port.setValue} placeholder="Example: 4500" />
      <div className={styles['buttons']}>
        <FButton severity="bad" onClick={action.reset}>Reset</FButton>
        <FButton severity="good" loading={isAdding.value} onClick={action.add}>Add</FButton>
      </div>
    </div>
  )
}

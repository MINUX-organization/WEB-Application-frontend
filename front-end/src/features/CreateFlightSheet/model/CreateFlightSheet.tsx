import { HTMLProps, useMemo } from "react";
import { FButton, FContainer, FDropdown, FModal, FQuadCornerContainer, FTextInput } from "@shared/ui"; 
import { useFlightSheetAddOptions } from "../hooks";
import { useStateObj } from "@shared/lib";
import { TCryptocurrency, TMiner, TPool, TStateObj, TWallet } from "@shared/types";
import { createFlightSheet } from "../api";
import { useBoolean, useEffectOnce } from "usehooks-ts";
import { useBooleanUrl } from "@shared/lib/useBooleanUrl";
import { CreateCryptocurrency } from "@features/CreateCryptocurrency";
import { CreateWallet } from "@features/CreateWallet";
import { CreatePool } from "@features/CreatePool";
import { CreateMiner } from "@features/CreateMiner";
import styles from './CreateFlightSheet.module.scss'
import _ from 'lodash'

const useAddModal = (title: string, booleanUrlKey: string, ModalBody: (props: HTMLProps<HTMLDivElement> & { onAdd?: () => void }) => JSX.Element) => {
  return {
    title,
    isOpen: useBooleanUrl(booleanUrlKey),
    ModalBody
  }
}

const omittedProps = ['onAdd'] as const

type CreateFlightSheetProps = Omit<HTMLProps<HTMLDivElement>, typeof omittedProps[number]> & {
  onAdd?: () => void
  onSetup?: (refetchOptions: () => void) => void
}

export const CreateFlightSheet = (props: CreateFlightSheetProps) => { 
  const flightSheeAddOptions = useFlightSheetAddOptions()
  const name = useStateObj('')
  const cryptocurrency = useStateObj<TCryptocurrency | null>(null);
  const wallet = useStateObj<TWallet | null>(null);
  const pool = useStateObj<TPool | null>(null);
  const miner = useStateObj<TMiner | null>(null); 
  const isAdding = useBoolean(false);
  const modalAddCryptocurrency = useAddModal('Add cryptocurrency', 'create-flightsheet-create-crypto', CreateCryptocurrency)
  const modalAddWallet = useAddModal('Add wallet', 'create-flightsheet-create-wallet', CreateWallet)
  const modalAddPool = useAddModal('Add pool', 'create-flightsheet-create-pool', CreatePool)
  const modalAddMiner = useAddModal('Add miner', 'create-flightsheet-create-miner', CreateMiner)

  const cryptocurrencyOptions = useMemo(() => flightSheeAddOptions.calculateOptions({ cryptocurrency: null,                 miner: miner.value, pool: pool.value, wallet: wallet.value }).cryptocurrencyOptions, [flightSheeAddOptions,                       miner.value, pool.value, wallet.value])
  const minerOptions = useMemo(() => flightSheeAddOptions.calculateOptions({          cryptocurrency: cryptocurrency.value, miner: null,        pool: pool.value, wallet: wallet.value }).minerOptions,          [flightSheeAddOptions, cryptocurrency.value,              pool.value, wallet.value])
  const poolOptions = useMemo(() => flightSheeAddOptions.calculateOptions({           cryptocurrency: cryptocurrency.value, miner: miner.value, pool: null,       wallet: wallet.value }).poolOptions,           [flightSheeAddOptions, cryptocurrency.value, miner.value,             wallet.value])
  const walletOptions = useMemo(() => flightSheeAddOptions.calculateOptions({         cryptocurrency: cryptocurrency.value, miner: miner.value, pool: pool.value, wallet: null         }).walletOptions,         [flightSheeAddOptions, cryptocurrency.value, miner.value, pool.value              ])
      
  const fields: Array<{ label: string, stateObj: TStateObj<any>, options: Array<any>, placeholder: string, getOptionLabel: (item: any) => string, getKey: (item: any) => string, modalOpenState: ReturnType<typeof useAddModal>}> = [
    {label: 'Crypto', stateObj: cryptocurrency, options: cryptocurrencyOptions, placeholder: 'Select crypto', getOptionLabel: (item: TCryptocurrency) => item.name, getKey: (item: TCryptocurrency) => item.name + item.id, modalOpenState: modalAddCryptocurrency},
    {label: 'Wallet', stateObj: wallet,         options: walletOptions,         placeholder: 'Select wallet', getOptionLabel: (item: TWallet) => item.name,         getKey: (item: TWallet) => item.name + item.id,         modalOpenState: modalAddWallet},
    {label: 'Pool',   stateObj: pool,           options: poolOptions,           placeholder: 'Select pool',   getOptionLabel: (item: TPool) => item.host,           getKey: (item: TPool) => item.host + item.id,           modalOpenState: modalAddPool},
    {label: 'Miner',  stateObj: miner,          options: minerOptions,          placeholder: 'Select miner',  getOptionLabel: (item: TMiner) => item.name,          getKey: (item: TMiner) => item.name + item.id,          modalOpenState: modalAddMiner},
  ]

  const action = {
    reset: () => {
      cryptocurrency.setValue(null);
      wallet.setValue(null);
      pool.setValue(null);
      miner.setValue(null);
      name.setValue('');
    },
    createFlightSheet: () => {
      if (cryptocurrency.value === null) {alert('cryptocurrency must be selected'); return}
      if (wallet.value === null) {alert('wallet must be selected'); return}
      if (pool.value === null) {alert('pool must be selected'); return}
      if (miner.value === null) {alert('miner must be selected'); return}
      if (name.value === '') {alert('name must be entered'); return}
      isAdding.setTrue();
      createFlightSheet({
        cryptocurrency: cryptocurrency.value,
        miner: miner.value,
        name: name.value,
        pool: pool.value,
        wallet: wallet.value
      }).then(res => {
        if (props.onAdd !== undefined) props.onAdd();
      }).catch(e => {
        alert(e.message);
      }).finally(() => {
        action.reset();
        isAdding.setFalse();
      })
    }
  }

  useEffectOnce(() => {
    if (props.onSetup !== undefined) props.onSetup(flightSheeAddOptions.query.refetch);
  })

  return (
    <div {..._.omit(props, omittedProps)} className={(props.className ?? '') + ' ' + styles['wrapper']}>
      <FQuadCornerContainer className={styles['box']}>
        {fields.map(field => (
          <div key={field.label} className={styles['field']}>
            <div className={styles['field-header']}>
              <div className={styles['field-label']}>{field.label}</div>
              <div className={styles['field-add-button']} onClick={field.modalOpenState.isOpen.setTrue}>Add</div>
            </div>
            <FDropdown
              warnWhenNoOptions
              loading={flightSheeAddOptions.query.isFetching}
              options={field.options}
              value={field.stateObj.value}
              getOptionLabel={field.getOptionLabel}
              getOptionValue={field.getKey}
              placeholder={field.placeholder}
              onChange={value => field.stateObj.setValue(value)}
            />
            <FModal title={field.modalOpenState.title} open={field.modalOpenState.isOpen.value} onClose={field.modalOpenState.isOpen.setFalse}>
              <FContainer visibility={{ tc: false }} bodyProps={{ className: styles['modal-body']}}>
                <field.modalOpenState.ModalBody onAdd={() => {
                  field.modalOpenState.isOpen.setFalse();
                  flightSheeAddOptions.query.refetch();
                }} />
              </FContainer>
            </FModal>
          </div>
        ))}
        <div className={styles['flight-sheet-name']}>
          <div className={styles['flight-sheet-name-label']}>Name</div>
          <FTextInput value={name.value} onChange={name.setValue} placeholder="Write flight sheet's name..." />
        </div>
      </FQuadCornerContainer>

      <div className={styles['buttons']}> 
        <FButton severity="bad" onClick={action.reset}>Reset</FButton>
        <FButton loading={isAdding.value} severity="good" onClick={action.createFlightSheet}>Create flight sheet</FButton>
      </div>
    </div>
  )
}
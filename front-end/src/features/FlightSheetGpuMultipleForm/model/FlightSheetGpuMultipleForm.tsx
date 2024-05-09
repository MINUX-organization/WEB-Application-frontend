import { Dispatch, SetStateAction, useCallback, useEffect, useMemo } from "react";
import {
  FButton,
  FContainer,
  FModal,
  FSwitch,
  FTextInput,
} from "@/shared/ui";
import { useFlightSheetAddOptions } from "../hooks";
import { useStateObj } from "@/shared/lib";
import {
  TCryptocurrency,
  TFlightSheetConfigInput,
  TFlightSheetFilled,
  TMiner,
  TPool,
  TWallet,
} from "@/shared/types";
import { useBoolean } from "usehooks-ts";
import { CreateCryptocurrency } from "@/features/CreateCryptocurrency";
import { CreateWallet } from "@/features/CreateWallet";
import { CreatePool } from "@/features/CreatePool";
import { CreateMiner } from "@/features/CreateMiner";
import { toast } from "react-toastify";
import { createFlightSheetGpuMultiple } from "@/shared/api/createFlightSheetGpuMultiple";
import { editFlightSheetGpuMultiple } from "@/shared/api/editFlightSheetGpuMultiple";
import styles from "./FlightSheetGpuMultipleForm.module.scss";
import useAddModal from "../hooks/useAddModal";
import Field from "./Field";

type FlightSheetGpuFormProps = {
  flightSheet?: Extract<TFlightSheetFilled, { type: 'GPU-MULTIPLE' }>
  onSubmit: () => void;
};

export const FlightSheetGpuMultipleForm = ({ onSubmit, flightSheet }: FlightSheetGpuFormProps) => {
  const flightSheeAddOptions = useFlightSheetAddOptions();
  const name = useStateObj(flightSheet?.name ?? '');
  const additionalString = useStateObj(flightSheet?.additionalString ?? '');
  const miner = useStateObj<TMiner | null>(flightSheet?.miner ?? null);
  const isTriple = useStateObj(flightSheet?.configs.length === 3);

  const configs = useStateObj<TFlightSheetConfigInput[]>(
    flightSheet?.configs ?? [
      {
        cryptocurrency: null,
        pool: null,
        wallet: null
      },
      {
        cryptocurrency: null,
        pool: null,
        wallet: null
      }
    ]
  );

  const getConfigValue = useCallback(<T extends keyof TFlightSheetConfigInput,>(
    configs: TFlightSheetConfigInput[],
    index: number,
    name: T
  ): TFlightSheetConfigInput[T] => {
    return configs[index][name]
  }, []);

  const setConfigValue = useCallback(<T extends keyof TFlightSheetConfigInput>(
    setConfigs: Dispatch<SetStateAction<TFlightSheetConfigInput[]>>,
    index: number,
    name: T,
    value: TFlightSheetConfigInput[T] | null
  ) => {
    setConfigs((prev) => {
      const copy = structuredClone(prev);
      copy[index] = { ...copy[index], [name]: value }
      return copy;
    })
  }, []);

  const isSubmitting = useBoolean(false);

  const modalAddCryptocurrency = useAddModal(
    "Add cryptocurrency",
    "create-flightsheet-create-crypto",
    CreateCryptocurrency
  );
  const modalAddWallet = useAddModal(
    "Add wallet",
    "create-flightsheet-create-wallet",
    CreateWallet
  );
  const modalAddPool = useAddModal(
    "Add pool",
    "create-flightsheet-create-pool",
    CreatePool
  );
  const modalAddMiner = useAddModal(
    "Add miner",
    "create-flightsheet-create-miner",
    CreateMiner
  );

  useEffect(() => {
    if (isTriple.value) {
      if (configs.value.length < 3) {
        configs.setValue((prev) => (
          [
            ...prev,
            {
              cryptocurrency: null,
              pool: null,
              wallet: null
            }
          ]
        ))
      }
    } else {
      if (configs.value.length >= 3) {
        configs.setValue((prev) => prev.slice(0, 2))
      }
    }
  }, [isTriple.value])

  // const cryptocurrencyOptions = useMemo(pool
  //   () =>
  //     flightSheeAddOptions.calculateOptions({
  //       cryptocurrency: null,
  //       miner: miner.value,
  //       pool: pool.value,
  //       wallet: wallet.value,
  //     }).cryptocurrencyOptions,
  //   [flightSheeAddOptions, miner.value, pool.value, wallet.value]
  // );

  const cryptocurrencyOptions = flightSheeAddOptions.options.cryptocurrencyOptions

  // const minerOptions = useMemo(
  //   () =>
  //     flightSheeAddOptions.calculateOptions({
  //       cryptocurrency: cryptocurrency.value,
  //       miner: null,
  //       pool: pool.value,
  //       wallet: wallet.value,
  //     }).minerOptions,
  //   [flightSheeAddOptions, cryptocurrency.value, pool.value, wallet.value]
  // );

  const minerOptions = flightSheeAddOptions.options.minerOptions

  // const poolOptions = useMemo(
  //   () =>
  //     flightSheeAddOptions.calculateOptions({
  //       cryptocurrency: cryptocurrency.value,
  //       miner: miner.value,
  //       pool: null,
  //       wallet: wallet.value,
  //     }).poolOptions,
  //   [flightSheeAddOptions, cryptocurrency.value, miner.value, wallet.value]
  // );
  
  const poolOptions = flightSheeAddOptions.options.poolOptions

  // const walletOptions = useMemo(
  //   () =>
  //     flightSheeAddOptions.calculateOptions({
  //       cryptocurrency: cryptocurrency.value,
  //       miner: miner.value,
  //       pool: pool.value,
  //       wallet: null,
  //     }).walletOptions,
  //   [flightSheeAddOptions, cryptocurrency.value, miner.value, pool.value]
  // );

  const walletOptions = flightSheeAddOptions.options.walletOptions

  const rows = useMemo(() => {
    return configs.value.map((config, index) => ([
      {
        type: 'cryptocurrency',
        label: 'Crypto ' + (index + 1),
        getValue: () => getConfigValue(configs.value, index, 'cryptocurrency'),
        setValue: (value: TCryptocurrency | null) =>
          setConfigValue(configs.setValue, index, 'cryptocurrency', value),
        getSmartValue: () => (
          cryptocurrencyOptions.length === 1
          ? cryptocurrencyOptions[0]
          : getConfigValue(configs.value, index, 'cryptocurrency')
        ),
        modalOpen: modalAddCryptocurrency,
        options: cryptocurrencyOptions, 
        placeholder: "Select crypto",
        getOptionLabel: (item: TCryptocurrency) => item.name,
        getKey: (item: TCryptocurrency) => item.name + item.id,
      },
      {
        type: 'pool',
        label: 'Pool ' + (index + 1),
        getValue: () =>  getConfigValue(configs.value, index, 'pool'),
        setValue: (value: TPool | null) =>
          setConfigValue(configs.setValue, index, 'pool', value),
        getSmartValue: () => (
          poolOptions.length === 1
          ? poolOptions[0]
          : getConfigValue(configs.value, index, 'pool')
        ),
        modalOpen: modalAddPool,
        options: poolOptions,
        placeholder: "Select pool",
        getOptionLabel: (item: TPool) => item.host,
        getKey: (item: TPool) => item.host + item.id,
      },
      {
        type: 'wallet',
        label: 'Wallet ' + (index + 1),
        getValue: () => getConfigValue(configs.value, index, 'wallet'),
        setValue: (value: TWallet | null) =>
          setConfigValue(configs.setValue, index, 'wallet', value),
        getSmartValue: () => (
          walletOptions.length === 1
          ? walletOptions[0]
          : getConfigValue(configs.value, index, 'wallet')
        ),
        modalOpen: modalAddWallet,
        options: walletOptions,
        placeholder: "Select wallet",
        getOptionLabel: (item: TWallet) => item.name,
        getKey: (item: TWallet) => item.name + item.id,
      },
    ] as const));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configs.value, walletOptions, poolOptions, cryptocurrencyOptions])

  // const cryptocurrencySmart = useMemo(
  //   () =>
  //     cryptocurrencyOptions.length === 1
  //       ? cryptocurrencyOptions[0]
  //       : cryptocurrency.value,
  //   [cryptocurrency.value, cryptocurrencyOptions]
  // );
  // const poolSmart = useMemo(
  //   () => (poolOptions.length === 1 ? poolOptions[0] : pool.value),
  //   [pool.value, poolOptions]
  // );
  // const walletSmart = useMemo(
  //   () => (walletOptions.length === 1 ? walletOptions[0] : wallet.value),
  //   [wallet.value, walletOptions]
  // );

  const minerSmart = useMemo(
    () => (minerOptions.length === 1 ? minerOptions[0] : miner.value),
    [miner.value, minerOptions]
  );

  // const fields: Array<{
  //   label: string;
  //   stateObj: TStateObj<any>;
  //   smart: any;
  //   options: Array<any>;
  //   placeholder: string;
  //   getOptionLabel: (item: any) => string;
  //   getKey: (item: any) => string;
  //   modalOpenState: ReturnType<typeof useAddModal>;
  // }> = [
  //   {
  //     label: "Crypto",
  //     stateObj: cryptocurrency,
  //     smart: cryptocurrencySmart,
  //     options: cryptocurrencyOptions,
  //     placeholder: "Select crypto",
  //     getOptionLabel: (item: TCryptocurrency) => item.name,
  //     getKey: (item: TCryptocurrency) => item.name + item.id,
  //     modalOpenState: modalAddCryptocurrency,
  //   },
  //   {
  //     label: "Wallet",
  //     stateObj: wallet,
  //     smart: walletSmart,
  //     options: walletOptions,
  //     placeholder: "Select wallet",
  //     getOptionLabel: (item: TWallet) => item.name,
  //     getKey: (item: TWallet) => item.name + item.id,
  //     modalOpenState: modalAddWallet,
  //   },
  //   {
  //     label: "Pool",
  //     stateObj: pool,
  //     smart: poolSmart,
  //     options: poolOptions,
  //     placeholder: "Select pool",
  //     getOptionLabel: (item: TPool) => item.host,
  //     getKey: (item: TPool) => item.host + item.id,
  //     modalOpenState: modalAddPool,
  //   },
  //   {
  //     label: "Miner",
  //     stateObj: miner,
  //     smart: minerSmart,
  //     options: minerOptions,
  //     placeholder: "Select miner",
  //     getOptionLabel: (item: TMiner) => item.name,
  //     getKey: (item: TMiner) => item.name + item.id,
  //     modalOpenState: modalAddMiner,
  //   },
  // ];

  const action = {
    reset: () => {
      if (flightSheet) {
        configs.setValue(flightSheet.configs);
        isTriple.setValue(flightSheet.configs.length === 3);
        miner.setValue(flightSheet.miner);
        name.setValue(flightSheet.name);
        additionalString.setValue(flightSheet.additionalString);
      } else {
        configs.setValue([
          {
            cryptocurrency: null,
            pool: null,
            wallet: null
          },
          {
            cryptocurrency: null,
            pool: null,
            wallet: null
          },
        ])
        isTriple.setValue(false);
        miner.setValue(null);
        name.setValue("");
        additionalString.setValue('');
      }
    },
    submit: () => {
      // if (cryptocurrencySmart === null) {
      //   toast.error("Cryptocurrency must be selected");
      //   return;
      // }
      // if (walletSmart === null) {
      //   toast.error("Wallet must be selected");
      //   return;
      // }
      // if (poolSmart === null) {
      //   toast.error("Pool must be selected");
      //   return;
      // }

      
      if (rows.some((row) => (
        row.some((field) => field.getSmartValue() === null)
      ))) {
        toast.error('Some of your configs are incorrect');
        return;
      }

      // console.log('rows');
      // console.log((rows).map((row) => ({
      //   cryptocurrencyId: row.find((v) => v.type === 'cryptocurrency')?.getSmartValue()!.id!,
      //   poolId: row.find((v) => v.type === 'pool')?.getSmartValue()!.id!,
      //   walletId: row.find((v) => v.type === 'wallet')?.getSmartValue()!.id!
      // })))

      if (minerSmart === null) {
        toast.error("Miner must be selected");
        return;
      }
      if (name.value === "") {
        toast.error("Name must be entered");
        return;
      }
      isSubmitting.setTrue();

      if (flightSheet) {
        editFlightSheetGpuMultiple({
          id: flightSheet.id,
          newAdditionalString: additionalString.value,
          newMinerId: minerSmart.id,
          newName: name.value,
          newConfigs: (rows).map((row) => ({
            cryptocurrencyId: row.find((v) => v.type === 'cryptocurrency')?.getSmartValue()!.id!,
            poolId: row.find((v) => v.type === 'pool')?.getSmartValue()!.id!,
            walletId: row.find((v) => v.type === 'wallet')?.getSmartValue()!.id!
          }))
        })
        .then(() => {
          onSubmit?.();
        })
        .catch((e) => {
          
        })
        .finally(() => {
          isSubmitting.setFalse()
        })
      } else {
        createFlightSheetGpuMultiple({
          name: name.value,
          minerId: minerSmart.id,
          additionalString: additionalString.value,
          configs: (rows).map((row) => ({
            cryptocurrencyId: row.find((v) => v.type === 'cryptocurrency')?.getSmartValue()!.id!,
            poolId: row.find((v) => v.type === 'pool')?.getSmartValue()!.id!,
            walletId: row.find((v) => v.type === 'wallet')?.getSmartValue()!.id!
          }))
        })
          .then((res) => {
            onSubmit?.();
            action.reset();
          })
          .catch((e) => {})
          .finally(() => {
            isSubmitting.setFalse();
          });
      }

    },
  };

  return (
    <div
      className={styles["wrapper"]}
    >
      <FSwitch checked={isTriple.value} onChange={isTriple.setValue} label="Triple" />
      <div className={styles["box"]}>
        <div className={styles['rows']}>
          {rows.map((row, index) => (
            <div key={index} className={styles['row']}>
              {row.map((field) => {
                switch (field.type) {
                  case 'cryptocurrency':
                    return (
                      <Field
                        key={index + field.label}
                        label={field.label}
                        value={field.getSmartValue()}
                        onChange={field.setValue}
                        options={field.options}
                        placeholder={field.placeholder}
                        isOptionsLoading={flightSheeAddOptions.query.isFetching}
                        refetchOptions={flightSheeAddOptions.query.refetch}
                        getKey={field.getKey}
                        getOptionLabel={field.getOptionLabel}
                        modalOpenState={field.modalOpen}
                      />
                    )
                  case 'pool':
                    return (
                      <Field
                        key={index + field.label}
                        label={field.label}
                        value={field.getSmartValue()}
                        onChange={field.setValue}
                        options={field.options}
                        placeholder={field.placeholder}
                        isOptionsLoading={flightSheeAddOptions.query.isFetching}
                        refetchOptions={flightSheeAddOptions.query.refetch}
                        getKey={field.getKey}
                        getOptionLabel={field.getOptionLabel}
                        modalOpenState={field.modalOpen}
                      />
                    )
                  case 'wallet':
                    return (
                      <Field
                        key={index + field.label}
                        label={field.label}
                        value={field.getSmartValue()}
                        onChange={field.setValue}
                        options={field.options}
                        placeholder={field.placeholder}
                        isOptionsLoading={flightSheeAddOptions.query.isFetching}
                        refetchOptions={flightSheeAddOptions.query.refetch}
                        getKey={field.getKey}
                        getOptionLabel={field.getOptionLabel}
                        modalOpenState={field.modalOpen}
                      />
                    )
                  default:
                    return null
                }
              })}
            </div>
          ))}
        </div>
        <div className={styles['miner-field']}>
          <Field
            label="Miner"
            value={miner.value}
            onChange={miner.setValue}
            options={minerOptions}
            placeholder="Select miner"
            isOptionsLoading={flightSheeAddOptions.query.isFetching}
            refetchOptions={flightSheeAddOptions.query.refetch}
            getKey={(item) => item.id.toString()}
            getOptionLabel={(item) => item.name}
            modalOpenState={modalAddMiner}
            disableAddButton
          />
        </div>
        <div className={styles["flight-sheet-name"]}>
          <div className={styles["flight-sheet-name-label"]}>Name</div>
          <FTextInput
            value={name.value}
            onChange={name.setValue}
            placeholder="Write flight sheet's name..."
          />
        </div>
        <div className={styles["flight-sheet-additional"]}>
          <div className={styles["flight-sheet-name-label"]}>Additional arguments</div>
          <FTextInput
            value={additionalString.value}
            onChange={additionalString.setValue}
            placeholder="--cclk 1200,1300 --mclk 900"
            multiline
            minRows={6}
          />
        </div>
      </div>

      <div className={styles["buttons"]}>
        <FButton severity="bad" onClick={action.reset}>
          Reset
        </FButton>
        <FButton
          loading={isSubmitting.value}
          severity="good"
          onClick={action.submit}
        >
          {!!flightSheet ? (
            <div>
              Edit flight sheet
            </div>
          ) : (
            <div>
              Create flight sheet
            </div>
          )}
        </FButton>
      </div>

      {[modalAddCryptocurrency, modalAddMiner, modalAddPool, modalAddWallet].map((modal) => (
        <FModal
          key={modal.title}
          title={modal.title}
          isOpen={modal.isOpen.value}
          onClose={modal.isOpen.setFalse}
        >
          <FContainer
            visibility={{ tc: false }}
            bodyProps={{ className: styles["modal-body"] }}
          >
            <modal.ModalBody
              onAdd={() => {
                modal.isOpen.setFalse();
                flightSheeAddOptions.query.refetch();
              }}
            />
          </FContainer>
        </FModal>
      ))}
    </div>
  );
};

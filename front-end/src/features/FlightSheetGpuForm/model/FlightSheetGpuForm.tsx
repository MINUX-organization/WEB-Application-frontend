import { HTMLProps, useMemo } from "react";
import {
  FButton,
  FContainer,
  FDropdown,
  FModal,
  FTextInput,
} from "@/shared/ui";
import { useFlightSheetAddOptions } from "../hooks";
import { useStateObj } from "@/shared/lib";
import {
  TCryptocurrency,
  TFlightSheetFilled,
  TMiner,
  TPool,
  TStateObj,
  TWallet,
} from "@/shared/types";
import { createFlightSheet } from "@/shared/api";
import { useBoolean } from "usehooks-ts";
import { useBooleanUrl } from "@/shared/lib/useBooleanUrl";
import { CreateCryptocurrency } from "@/features/CreateCryptocurrency";
import { CreateWallet } from "@/features/CreateWallet";
import { CreatePool } from "@/features/CreatePool";
import { CreateMiner } from "@/features/CreateMiner";
import styles from "./FlightSheetGpuForm.module.scss";
import { toast } from "react-toastify";
import { editFlightSheetSimple } from "@/shared/api/editFlightSheetSimple";

const useAddModal = (
  title: string,
  booleanUrlKey: string,
  ModalBody: (
    props: HTMLProps<HTMLDivElement> & { onAdd?: () => void }
  ) => JSX.Element
) => {
  return {
    title,
    isOpen: useBooleanUrl(booleanUrlKey),
    ModalBody,
  };
};

type FlightSheetGpuFormProps = {
  flightSheet?: Extract<TFlightSheetFilled, { type: 'SIMPLE' }>
  onSubmit: () => void;
};

export const FlightSheetGpuForm = ({ onSubmit, flightSheet }: FlightSheetGpuFormProps) => {
  const flightSheeAddOptions = useFlightSheetAddOptions();
  const name = useStateObj(flightSheet?.name ?? '');
  const additionalString = useStateObj(flightSheet?.additionalString ?? '');

  const cryptocurrency = useStateObj<TCryptocurrency | null>(flightSheet?.cryptocurrency ?? null);
  const wallet = useStateObj<TWallet | null>(flightSheet?.wallet ?? null);
  const pool = useStateObj<TPool | null>(flightSheet?.pool ?? null);
  const miner = useStateObj<TMiner | null>(flightSheet?.miner ?? null);

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

  const cryptocurrencyOptions = useMemo(
    () =>
      flightSheeAddOptions.calculateOptions({
        cryptocurrency: null,
        miner: miner.value,
        pool: pool.value,
        wallet: wallet.value,
      }).cryptocurrencyOptions,
    [flightSheeAddOptions, miner.value, pool.value, wallet.value]
  );
  const minerOptions = useMemo(
    () =>
      flightSheeAddOptions.calculateOptions({
        cryptocurrency: cryptocurrency.value,
        miner: null,
        pool: pool.value,
        wallet: wallet.value,
      }).minerOptions,
    [flightSheeAddOptions, cryptocurrency.value, pool.value, wallet.value]
  );
  const poolOptions = useMemo(
    () =>
      flightSheeAddOptions.calculateOptions({
        cryptocurrency: cryptocurrency.value,
        miner: miner.value,
        pool: null,
        wallet: wallet.value,
      }).poolOptions,
    [flightSheeAddOptions, cryptocurrency.value, miner.value, wallet.value]
  );
  const walletOptions = useMemo(
    () =>
      flightSheeAddOptions.calculateOptions({
        cryptocurrency: cryptocurrency.value,
        miner: miner.value,
        pool: pool.value,
        wallet: null,
      }).walletOptions,
    [flightSheeAddOptions, cryptocurrency.value, miner.value, pool.value]
  );

  const cryptocurrencySmart = useMemo(
    () =>
      cryptocurrencyOptions.length === 1
        ? cryptocurrencyOptions[0]
        : cryptocurrency.value,
    [cryptocurrency.value, cryptocurrencyOptions]
  );
  const minerSmart = useMemo(
    () => (minerOptions.length === 1 ? minerOptions[0] : miner.value),
    [miner.value, minerOptions]
  );
  const poolSmart = useMemo(
    () => (poolOptions.length === 1 ? poolOptions[0] : pool.value),
    [pool.value, poolOptions]
  );
  const walletSmart = useMemo(
    () => (walletOptions.length === 1 ? walletOptions[0] : wallet.value),
    [wallet.value, walletOptions]
  );

  const fields: Array<{
    label: string;
    stateObj: TStateObj<any>;
    smart: any;
    options: Array<any>;
    placeholder: string;
    getOptionLabel: (item: any) => string;
    getKey: (item: any) => string;
    modalOpenState: ReturnType<typeof useAddModal>;
  }> = [
    {
      label: "Crypto",
      stateObj: cryptocurrency,
      smart: cryptocurrencySmart,
      options: cryptocurrencyOptions,
      placeholder: "Select crypto",
      getOptionLabel: (item: TCryptocurrency) => item.name,
      getKey: (item: TCryptocurrency) => item.name + item.id,
      modalOpenState: modalAddCryptocurrency,
    },
    {
      label: "Wallet",
      stateObj: wallet,
      smart: walletSmart,
      options: walletOptions,
      placeholder: "Select wallet",
      getOptionLabel: (item: TWallet) => item.name,
      getKey: (item: TWallet) => item.name + item.id,
      modalOpenState: modalAddWallet,
    },
    {
      label: "Pool",
      stateObj: pool,
      smart: poolSmart,
      options: poolOptions,
      placeholder: "Select pool",
      getOptionLabel: (item: TPool) => item.host,
      getKey: (item: TPool) => item.host + item.id,
      modalOpenState: modalAddPool,
    },
    {
      label: "Miner",
      stateObj: miner,
      smart: minerSmart,
      options: minerOptions,
      placeholder: "Select miner",
      getOptionLabel: (item: TMiner) => item.name,
      getKey: (item: TMiner) => item.name + item.id,
      modalOpenState: modalAddMiner,
    },
  ];

  const action = {
    reset: () => {
      if (flightSheet) {
        cryptocurrency.setValue(flightSheet.cryptocurrency);
        wallet.setValue(flightSheet.wallet);
        pool.setValue(flightSheet.pool);
        miner.setValue(flightSheet.miner);
        name.setValue(flightSheet.name);
        additionalString.setValue(flightSheet.additionalString);
      } else {
        cryptocurrency.setValue(null);
        wallet.setValue(null);
        pool.setValue(null);
        miner.setValue(null);
        name.setValue("");
        additionalString.setValue('');
      }
    },
    submit: () => {
      if (cryptocurrencySmart === null) {
        toast.error("Cryptocurrency must be selected");
        return;
      }
      if (walletSmart === null) {
        toast.error("Wallet must be selected");
        return;
      }
      if (poolSmart === null) {
        toast.error("Pool must be selected");
        return;
      }
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
        editFlightSheetSimple({
          id: flightSheet.id,
          newAdditionalString: additionalString.value,
          newCryptocurrencyId: cryptocurrencySmart.id,
          newMinerId: minerSmart.id,
          newName: name.value,
          newPoolId: poolSmart.id,
          newWalletId: walletSmart.id
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
        createFlightSheet({
          name: name.value,
          cryptocurrencyId: cryptocurrencySmart.id,
          minerId: minerSmart.id,
          poolId: poolSmart.id,
          walletId: walletSmart.id,
          additionalString: additionalString.value
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
      <div className={styles["box"]}>
        {fields.map((field) => (
          <div key={field.label} className={styles["field"]}>
            <div className={styles["field-header"]}>
              <div className={styles["field-label"]}>{field.label}</div>
              <div
                className={styles["field-add-button"]}
                onClick={field.modalOpenState.isOpen.setTrue}
              >
                Add
              </div>
            </div>
            <FDropdown
              warnWhenNoOptions
              loading={flightSheeAddOptions.query.isFetching}
              options={field.options}
              value={field.smart}
              getOptionLabel={field.getOptionLabel}
              getOptionValue={field.getKey}
              placeholder={field.placeholder}
              onChange={(value) => field.stateObj.setValue(value)}
            />
            <FModal
              title={field.modalOpenState.title}
              open={field.modalOpenState.isOpen.value}
              onClose={field.modalOpenState.isOpen.setFalse}
            >
              <FContainer
                visibility={{ tc: false }}
                bodyProps={{ className: styles["modal-body"] }}
              >
                <field.modalOpenState.ModalBody
                  onAdd={() => {
                    field.modalOpenState.isOpen.setFalse();
                    flightSheeAddOptions.query.refetch();
                  }}
                />
              </FContainer>
            </FModal>
          </div>
        ))}
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
    </div>
  );
};
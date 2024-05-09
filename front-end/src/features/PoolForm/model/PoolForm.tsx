import { useMemo } from 'react';
import { FButton, FDropdown, FTextInput } from '@/shared/ui';
import { useStateObj } from '@/shared/lib';
import { useBoolean } from 'usehooks-ts';
import { createPool } from '@/shared/api';
import { TPool } from '@/shared/types';
import { useQuery } from 'react-query';
import { getFullCryptocurrencies } from '@/shared/api';
import styles from './PoolForm.module.scss';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import _ from 'lodash';
import { editPool } from '@/shared/api/editPool';

type PoolFormProps = {
  className?: string;
  onSubmit?: () => void;
  pool?: TPool;
};

export function PoolForm({ className, onSubmit, pool }: PoolFormProps) {
  const host = useStateObj(pool?.host ?? '');
  const port = useStateObj(pool?.port.toString() ?? '');
  const isSubmitting = useBoolean(false);

  const { data: cryptocurrencies, isLoading: isLoadingCryptocurrencies } =
    useQuery({
      queryKey: ['get-full-cryptocurrencies'],
      queryFn: () =>
        getFullCryptocurrencies({})
          .then((res) => res.data.cryptocurrencies)
          .then((cryptocurrencies) => _.sortBy(cryptocurrencies, 'id')),
    });

  const getCryptocurrencyById = (id: number) => {
    return cryptocurrencies?.find((item) => item.id === id);
  };

  const cryptocurrencyId = useStateObj<number | null>(
    pool?.cryptocurrencyId ?? null
  );
  const cryptocurrencyIdSmart = useMemo(() => {
    if (cryptocurrencyId.value !== null) return cryptocurrencyId.value;
    if (cryptocurrencies !== undefined && cryptocurrencies.length === 1) {
      return cryptocurrencies[0].id;
    }
    return null;
  }, [cryptocurrencies, cryptocurrencyId]);

  const action = {
    reset: () => {
      cryptocurrencyId.setValue(pool?.cryptocurrencyId ?? null);
      host.setValue(pool?.host ?? '');
      port.setValue(pool?.port.toString() ?? '');
    },

    submit: () => {
      if (cryptocurrencyIdSmart === null) {
        toast.error('Cryptocurrency must be selected');
        return;
      }
      if (host.value === '') {
        toast.error('Domain must be entered');
        return;
      }
      if (port.value === '') {
        toast.error('Port must be entered');
        return;
      }
      const numPort = Number.parseInt(port.value);
      if (Number.isNaN(numPort)) {
        toast.error('Port must be a number');
        return;
      }
      isSubmitting.setTrue();

      if (pool) {
        editPool({
          id: pool.id,
          newCryptocurrencyId: cryptocurrencyIdSmart,
          newHost: host.value,
          newPort: numPort,
        })
          .then((res) => {
            toast.info('pool updated');
            onSubmit?.();
          })
          .catch((e) => {
            toast.error(e.message);
          })
          .finally(() => {
            isSubmitting.setFalse();
          });
        return;
      }

      createPool({
        cryptocurrencyId: cryptocurrencyIdSmart,
        host: host.value,
        port: numPort,
      })
        .then((res) => {
          toast.info('pool added');
          onSubmit?.();
          action.reset();
        })
        .catch((e) => {
          toast.error(e.message);
        })
        .finally(() => {
          isSubmitting.setFalse();
        });
    },
  };

  return (
    <div className={clsx(styles['pool-form'], className)}>
      {!pool && <div className={styles['pool-form__title']}>Add pool</div>}
      <div className={styles['pool-form__field-label']}>Cryptocurrency</div>
      <FDropdown
        className={styles['pool-form__field-value']}
        value={cryptocurrencyIdSmart}
        onChange={(value) => cryptocurrencyId.setValue(value)}
        options={cryptocurrencies?.map((v) => v.id) ?? []}
        getOptionLabel={(id) =>
          getCryptocurrencyById(id)?.fullName ?? id.toString()
        }
        getOptionValue={(id) => id.toString()}
        loading={isLoadingCryptocurrencies}
        placeholder="Select cryptocurrency"
      />
      <div className={styles['pool-form__field-label']}>Domain name</div>
      <FTextInput
        className={styles['pool-form__field-value']}
        value={host.value}
        onChange={host.setValue}
        placeholder="Example: 2miner.com"
      />
      <div className={styles['pool-form__field-label']}>Port</div>
      <FTextInput
        className={styles['pool-form__field-value']}
        value={port.value}
        onChange={port.setValue}
        placeholder="Example: 4500"
      />
      <div className={styles['pool-form__buttons']}>
        <FButton severity="bad" onClick={action.reset}>
          Reset
        </FButton>
        <FButton
          severity="good"
          loading={isSubmitting.value}
          onClick={action.submit}
        >
          {pool ? 'Edit' : 'Add'}
        </FButton>
      </div>
    </div>
  );
}

import { getFullCryptocurrencies } from '@/shared/api';
import { useQuery } from 'react-query';
import st from './PoolList.module.scss';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { FModal } from '@/shared/ui';
import { TPool } from '@/shared/types';
import clsx from 'clsx';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import _ from 'lodash';
import { getFullPools } from '@/shared/api/getFullPools';
import { deletePool } from '@/shared/api/deletePool';
import { PoolForm } from '@/features/PoolForm';

type CryptocurrencyListProps = {
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
};

export function PoolList({
  onEdit,
  onDelete,
  className,
}: CryptocurrencyListProps) {

  const { data: pools, status, error, refetch } = useQuery({
    queryKey: ['get-full-pools'],
    queryFn: () => getFullPools({})
      .then((res) => res.data.pools)
      .then((pools) => _.sortBy(pools, 'id'))
    })
  
  const { data: cryptocurrencies } = useQuery({
    queryKey: ['get-full-cryptocurrencies'],
    queryFn: () => getFullCryptocurrencies({}).then((res) => res.data.cryptocurrencies),
  });

  const getCryptocurrencyById = (id: number) => {
    return cryptocurrencies?.find((item) => item.id === id);
  };

  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [selected, setSelected] = useState<TPool | null>(null);

  const handleDelete = (id: number) => {
    if (
      window.confirm(
        `Are you sure you want to delete pool with ID: ${id}`
      )
    ) {
      setDeletingId(id);
      deletePool({ id })
        .then(() => {
          refetch();
          onDelete?.();
          toast.success(`Pool with ID: ${id} successfully deleted`);
        })
        .catch((e) => {
          toast.error(e.message);
        })
        .finally(() => {
          setDeletingId(null);
        });
    }
  };

  const handleEdit = () => {
    refetch();
    setSelected(null);
    onEdit?.();
  };

  return (
    <div className={clsx(st['pool-list'], className)}>
      {{
        idle: () => null,
        error: () => (
          <div className={st['pool-list__error-message']}>
            {(error as any)?.message}
          </div>
        ),
        loading: () => (
          <div className={st['pool-list__loading-spinner']}>
            Loading
          </div>
        ),
        success: () =>
          pools && (
            <div className={st['pool-list__list']}>
              <div className={st['pool-list__list-header']}>
                <div>ID</div>
                <div>Cryptocurrency</div>
                <div>Host</div>
                <div>port</div>
                <div></div>
              </div>
              {pools.map((pool) => (
                <div
                  key={pool.id}
                  className={st['pool-list__list-item']}
                >
                  <div>{pool.id}</div>
                  <div>{getCryptocurrencyById(pool.cryptocurrencyId)?.fullName}</div>
                  <div>{pool.host}</div>
                  <div>{pool.port}</div>
                  <div className={st['pool-list__actions']}>
                    <AiOutlineEdit
                      className={st['pool-list__icon-button']}
                      onClick={() => setSelected(pool)}
                    />
                    <AiOutlineDelete
                      className={st['pool-list__icon-button']}
                      data-severity="bad"
                      onClick={() => handleDelete(pool.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ),
      }[status]()}
      <FModal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title="Edit pool"
        isBlack
      >
        {selected && (
          <PoolForm pool={selected} onSubmit={handleEdit} />
        )}
      </FModal>
    </div>
  );
}

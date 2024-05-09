import { getFullAlgorithms, getFullCryptocurrencies } from '@/shared/api';
import { useQuery } from 'react-query';
import st from './CryptocurrencyList.module.scss';
import { deleteCryptocurrency } from '@/shared/api/deleteCryptocurrency';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { FModal } from '@/shared/ui';
import { CryptocurrencyForm } from '@/features/CryptocurrencyForm';
import { TCryptocurrency } from '@/shared/types';
import clsx from 'clsx';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import _ from 'lodash';

type CryptocurrencyListProps = {
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
};

export function CryptocurrencyList({
  onEdit,
  onDelete,
  className,
}: CryptocurrencyListProps) {
  const {
    data: cryptocurrencies,
    status,
    error,
    refetch,
  } = useQuery({
    queryKey: ['get-full-cryptocurrencies'],
    queryFn: () =>
      getFullCryptocurrencies({})
      .then((res) => res.data.cryptocurrencies)
      .then((cryptocurrencies) => _.sortBy(cryptocurrencies, 'id')),
  });

  const { data: algorithms } = useQuery({
    queryKey: ['get-full-algorithms'],
    queryFn: () => getFullAlgorithms({}).then((res) => res.data.algorithms),
  });

  const getAlgorithmById = (id: number) => {
    console.log(algorithms);
    return algorithms?.find((item) => item.id === id);
  };

  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [selected, setSelected] = useState<TCryptocurrency | null>(null);

  const handleDelete = (id: number) => {
    if (
      window.confirm(
        `Are you sure you want to delete cryptocurrency with ID: ${id}`
      )
    ) {
      setDeletingId(id);
      deleteCryptocurrency({ id })
        .then(() => {
          refetch();
          onDelete?.();
          toast.success(`Cryptocurrency with ID: ${id} successfully deleted`);
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
    <div className={clsx(st['cryptocurrency-list'], className)}>
      {{
        idle: () => null,
        error: () => (
          <div className={st['cryptocurrency-list__error-message']}>
            {(error as any)?.message}
          </div>
        ),
        loading: () => (
          <div className={st['cryptocurrency-list__loading-spinner']}>
            Loading
          </div>
        ),
        success: () =>
          cryptocurrencies && (
            <div className={st['cryptocurrency-list__list']}>
              <div className={st['cryptocurrency-list__list-header']}>
                <div>ID</div>
                <div>Full name (short name)</div>
                <div>Algorithm</div>
                <div></div>
              </div>
              {cryptocurrencies.map((cryptocurrency) => (
                <div
                  key={cryptocurrency.id}
                  className={st['cryptocurrency-list__list-item']}
                >
                  <div>{cryptocurrency.id}</div>
                  <div>
                    {cryptocurrency.fullName} ({cryptocurrency.name})
                  </div>
                  <div>
                    {getAlgorithmById(cryptocurrency.algorithmId)?.name ??
                      cryptocurrency.algorithmId}
                  </div>
                  <div className={st['cryptocurrency-list__actions']}>
                    <AiOutlineEdit
                      className={st['cryptocurrency-list__icon-button']}
                      onClick={() => setSelected(cryptocurrency)}
                    />
                    <AiOutlineDelete
                      className={st['cryptocurrency-list__icon-button']}
                      data-severity="bad"
                      onClick={() => handleDelete(cryptocurrency.id)}
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
        title="Edit Cryptocurrency"
        isBlack
      >
        {selected && (
          <CryptocurrencyForm cryptocurrency={selected} onSubmit={handleEdit} />
        )}
      </FModal>
    </div>
  );
}

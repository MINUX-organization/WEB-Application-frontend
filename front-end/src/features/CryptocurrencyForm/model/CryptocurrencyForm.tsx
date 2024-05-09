import { useEffect, useMemo } from 'react';
import { FButton, FDropdown, FTextInput } from '@/shared/ui';
import { useStateObj } from '@/shared/lib';
import { TCryptocurrency } from '@/shared/types';
import { useQuery } from 'react-query';
import { createCryptocurrency, getFullAlgorithms } from '@/shared/api';
import { useBoolean } from 'usehooks-ts';
import { showNotifyInfo } from '@/shared/utils';
import { toast } from 'react-toastify';
import st from './CryptocurrencyForm.module.scss';
import { editCryptocurrency } from '@/shared/api/editCryptocurrency';

type CryptocurrencyProps = {
  onSubmit: () => void;
  cryptocurrency?: TCryptocurrency;
};

export function CryptocurrencyForm({
  onSubmit,
  cryptocurrency,
}: CryptocurrencyProps) {
  const algorithmListQuery = useQuery(['get-full-algorithms-raw'], () =>
    getFullAlgorithms({})
  );

  const getAlgorithmById = (id: number) => {
    return algorithmListQuery.data?.data.algorithms.find(
      (item) => item.id === id
    );
  };

  const algorithmId = useStateObj<number | null>(
    cryptocurrency?.algorithmId ?? null
  );
  const algorithmIdSmart = useMemo(() => {
    if (algorithmId.value !== null) return algorithmId.value;
    if (
      algorithmListQuery.data !== undefined &&
      algorithmListQuery.data.data.algorithms.length === 1
    ) {
      return algorithmListQuery.data.data.algorithms[0].id;
    }
    return null;
  }, [algorithmId, algorithmListQuery.data]);
  const name = useStateObj(cryptocurrency?.name ?? '');
  const fullName = useStateObj(cryptocurrency?.fullName ?? '');
  const isSubmitting = useBoolean(false);

  const action = {
    reset: () => {
      name.setValue(cryptocurrency?.name ?? '');
      fullName.setValue(cryptocurrency?.fullName ?? '');
      algorithmId.setValue(cryptocurrency?.algorithmId ?? null);
    },
    submit: () => {
      if (name.value === '') {
        showNotifyInfo('Short name must be not empty');
        return;
      }
      if (fullName.value === '') {
        showNotifyInfo('Full name must be not empty');
        return;
      }
      if (algorithmIdSmart === null) {
        showNotifyInfo('Algorithm must be selected');
        return;
      }
      isSubmitting.setTrue();

      if (cryptocurrency) {
        editCryptocurrency({
          id: cryptocurrency.id,
          newName: name.value,
          newFullName: fullName.value,
          newAlgorithmId: algorithmIdSmart,
        })
          .then((res) => {
            toast.info('Cryptocurrency updated');
            onSubmit();
            action.reset();
          })
          .catch((e) => {
            toast.error(e.message);
          })
          .finally(() => {
            isSubmitting.setFalse();
          });
        return;
      }

      createCryptocurrency({
        name: name.value,
        fullName: fullName.value,
        algorithmId: algorithmIdSmart,
      })
        .then((res) => {
          toast.info('Cryptocurrency added');
          onSubmit();
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

  useEffect(() => {
    action.reset();
  }, [cryptocurrency])

  return (
    <div className={st['cryptocurrency-form']}>
      {!cryptocurrency && (
        <div className={st['cryptocurrency-form__title']}>
          Add cryptocurrency
        </div>
      )}
      <div className={st['cryptocurrency-form__field-label']}>Short name</div>
      <FTextInput
        className={st['cryptocurrency-form__field-value']}
        value={name.value}
        onChange={(value) => name.setValue(value)}
        placeholder="Example: BTC"
      />
      <div className={st['cryptocurrency-form__field-label']}>Full name</div>
      <FTextInput
        className={st['cryptocurrency-form__field-value']}
        value={fullName.value}
        onChange={(value) => fullName.setValue(value)}
        placeholder="Example: Bitcoin"
      />
      <div className={st['cryptocurrency-form__field-label']}>Algorithm</div>
      <FDropdown
        className={st['cryptocurrency-form__field-value']}
        value={algorithmIdSmart}
        onChange={(value) => algorithmId.setValue(value)}
        options={
          algorithmListQuery.data?.data.algorithms.map((v) => v.id) ?? []
        }
        getOptionLabel={(id) => getAlgorithmById(id)?.name ?? id.toString()}
        getOptionValue={(id) => id.toString()}
        loading={algorithmListQuery.isFetching}
        placeholder="Select algorithm"
      />
      <div className={st['cryptocurrency-form__buttons']}>
        <FButton severity="bad" onClick={action.reset}>
          Reset
        </FButton>
        <FButton
          severity="good"
          loading={isSubmitting.value}
          onClick={action.submit}
        >
          {cryptocurrency ? 'Edit' : 'Add'}
        </FButton>
      </div>
    </div>
  );
}

import { HTMLProps } from 'react';
import styles from './CtyptoPool.module.scss';
import { CryptocurrencyForm } from '@/features/CryptocurrencyForm';
import { CryptocurrencyList } from '@/widgets/CryptocurrencyList';
import { useQueryClient } from 'react-query';
import clsx from 'clsx';

export const CryptoPool = ({
  className,
  ...props
}: HTMLProps<HTMLDivElement>) => {
  const queryClient = useQueryClient();
  const handleAddCryptocurrency = () => {
    queryClient.invalidateQueries('get-full-cryptocurrencies');
  };

  return (
    <div {...props} className={clsx(styles['crypto-pool'], className)}>
      <div className={styles['crypto-pool__cryptocurrency-group']}>
        <CryptocurrencyForm onSubmit={handleAddCryptocurrency} />
        <CryptocurrencyList className="mt-4" />
      </div>
      <div className={styles['crypto-pool__pool-group']}>
        {/* <CreatePool/> */}
        {/* <PoolForm /> */}
        {/* <PoolList /> */}
      </div>
    </div>
  );
};

import { useDynamicDataStore } from '@/shared/stores'
import { Fragment } from 'react';
import styles from './Monitoring.module.scss'
import NaImage from '@/shared/components/NaImage'

export const Coins = () => {
  const coinsValue = useDynamicDataStore((state) => state.data.calculations.coinsValue);

  return (
    <div className={styles['coins']}>
      <div className={styles['coins-inner']}>
        <div className={styles['coins-header-wrapper']}>
          <div className={styles['coins-header']}>
            <div>Coin</div>
            <div>Algorithm</div>
            <div>Value</div>
          </div>
        </div>
        <div className={styles['coins-body-wrapper']}>
          <div className={styles['coins-body']}>
            {coinsValue.length === 0 && (
              <NaImage className={styles['coins-na-image']} />
            )}
            {coinsValue.map((item, index) => (
              <Fragment key={index}>
                <div>{item.coin}</div>
                <div>{item.algorithm}</div>
                <div>{item.value.toFixed(3)} <span className={styles['unit']}>{item.measurement}</span></div> 
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
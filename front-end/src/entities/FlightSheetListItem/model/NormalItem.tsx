import { TFlightSheetFilled } from '@/shared/types';
import { FContainer } from '@/shared/ui';
import { AiOutlineClose, AiOutlineDown } from 'react-icons/ai';
import { useBoolean, useElementSize } from 'usehooks-ts';
import { CSSProperties } from 'react';
import { useBooleanUrl } from '@/shared/lib/useBooleanUrl';
import { deleteFlightSheet } from '@/shared/api';
import { toast } from 'react-toastify';
import Tridot from '../ui/Tridot';
import GpuListModal from './GpuListModal';
import styles from './NormalItem.module.scss';

type NormalItemProps = {
  item: Extract<TFlightSheetFilled, { type: 'normal' }>;
  onDelete: () => void;
  onUpdate: () => void
};

export default function NormalItem({
  item,
  onDelete,
  onUpdate
}: NormalItemProps) {
  const isOpen = useBooleanUrl(
    "flight-sheet-open-" + item.id + "-" + item.name
  );
  const isExpanded = useBoolean(false);
  const [extraDataRef, extraDataSize] = useElementSize();

  const handleDelete = () => {
    if (window.confirm("are you sure you want to delete flight sheet?")) {
      deleteFlightSheet({
        id: item.id,
      })
        .then((res) => {
          toast.info("Flight sheet deleted");
          onDelete?.();
        })
        .catch((e) => {});
    }
  }

  const onUpdateInner = () => {
    isOpen.setFalse();
    onUpdate();
  }

  return (
    <div
      className={styles["wrapper"] + " " +
      (isExpanded.value ? styles["open"] : "")
    }
    style={{ "--inner-height": extraDataSize.height + "px" } as CSSProperties}
    >
      <FContainer
        visibility={{ l: false, t: false, r: false, b: false }}
        bodyProps={{ className: styles['container-body'] }}
        className={
          styles['container'] + ' ' + styles['sp1'] + ' ' + styles['sp2']
        }
      >
        <div className={styles['common-data']}>
          <div className={styles['name']}>
            <span className="flex-grow">{item.name}</span>
            <Tridot className={styles['tridot']} onClick={isOpen.setTrue} />
            <AiOutlineClose
              onClick={handleDelete}
              className={styles['delete-button']}
            />
          </div>
          <div className={styles['additional-arguments']}>
            <span>Additional arguments:</span>{' '}
            <span style={{ color: 'gray' }}>{item.additionalString}</span>
          </div>
          <div className="flex w-full">
            <div className={styles['fields']}>
              {[
                { label: 'Coin', value: item.cryptocurrency.name },
                { label: 'Wallet', value: item.wallet.name },
                { label: 'Pool', value: item.pool.host },
                { label: 'Miner', value: item.miner.name },
              ].map((item) => (
                <div key={item.label} className={styles['field']}>
                  <div className={styles['label']}>{item.label}</div>
                  <div className={styles['value']}>{item.value}</div>
                </div>
              ))}
            </div>
            <AiOutlineDown
              className={styles['dropdown-icon']}
              onClick={isExpanded.toggle}
            />
          </div>
        </div>
        <div className={styles['extra-data-wrapper']}>
          <div ref={extraDataRef} className={styles['extra-data']}>
            <div className={styles['field']}>
              <div className={styles['label']}>Wallet Address</div>
              <div className={styles['value']}>{item.wallet.address}</div>
            </div>
            <div className={styles['field']}>
              <div className={styles['label']}>Pool Host</div>
              <div className={styles['value']}>{item.pool.host}</div>
            </div>
            <div className={styles['field']}>
              <div className={styles['label']}>Algorithm</div>
              <div className={styles['value']}>{item.algorithm.name}</div>
            </div>
          </div>
        </div>
      </FContainer>
      <div className={styles['outside-buttons']}>
        <AiOutlineClose
          onClick={handleDelete}
          className={styles['delete-button']}
        />
        <Tridot className={styles['tridot']} onClick={isOpen.setTrue} />
      </div>
      <GpuListModal isOpen={isOpen} itemId={item.id} onUpdate={onUpdateInner} />
    </div>
  );
}

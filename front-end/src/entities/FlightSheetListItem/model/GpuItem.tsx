import { TFlightSheetFilled } from '@/shared/types';
import { FContainer, FModal } from '@/shared/ui';
import { AiOutlineDown } from 'react-icons/ai';
import { useBoolean, useElementSize } from 'usehooks-ts';
import { CSSProperties } from 'react';
import { useBooleanUrl } from '@/shared/lib/useBooleanUrl';
import { deleteFlightSheet } from '@/shared/api';
import { toast } from 'react-toastify';
import { FlightSheetGpuForm } from '@/features/FlightSheetGpuForm';
import GpuListModal from './GpuListModal';
import styles from './GpuItem.module.scss';
import ItemButtons from '../ui/Itembuttons';

type GpuItemProps = {
  item: Extract<TFlightSheetFilled, { type: 'SIMPLE' }>;
  onDelete: () => void;
  onUpdate: () => void
};

export default function GpuItem({
  item,
  onDelete,
  onUpdate
}: GpuItemProps) {
  const isOpen = useBooleanUrl(
    "flight-sheet-open-" + item.id + "-" + item.name
  );
  const isExpanded = useBoolean(false);
  const isEditing = useBoolean(false);
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
          <div className='flex gap-2 items-center mb-2 w-full'>
            <span className="flex-grow">{item.name}</span>
            <div className={styles['inner-buttons']}>
              <ItemButtons
                direction='horizontal'
                onDeleteClick={handleDelete}
                onTridotClick={isOpen.setTrue}
                onEditClick={isEditing.setTrue}
              />
            </div>
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
        <ItemButtons
          onDeleteClick={handleDelete}
          onTridotClick={isOpen.setTrue}
          onEditClick={isEditing.setTrue}
          direction='vertical'
        />
      </div>
      <GpuListModal isOpen={isOpen} itemId={item.id} onUpdate={onUpdateInner} />
      <FModal title="Edit flight sheet" open={isEditing.value} onClose={isEditing.setFalse}>
        <div className='bg-black p-8'>
          <FlightSheetGpuForm flightSheet={item} onSubmit={onUpdate} />
        </div>
      </FModal>
    </div>
  );
}

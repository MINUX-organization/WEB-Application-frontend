import { TFlightSheetFilled } from '@/shared/types';
import { FContainer, FModal } from '@/shared/ui';
import { AiOutlineDown } from 'react-icons/ai';
import { useBoolean, useElementSize } from 'usehooks-ts';
import { CSSProperties } from 'react';
import { useBooleanUrl } from '@/shared/lib/useBooleanUrl';
import { toast } from 'react-toastify';
import GpuSelectorModal from './GpuSelectorModal';
import styles from './GpuMultipleItem.module.scss';
import ItemButtons from '../ui/Itembuttons';
import { FlightSheetGpuMultipleForm } from '@/features/FlightSheetGpuMultipleForm';
import { deleteFlightSheetGpuMultiple } from '@/shared/api';

type GpuMultipleItemProps = {
  item: Extract<TFlightSheetFilled, { type: 'GPU-MULTIPLE' }>;
  onDelete: () => void;
  onUpdate: () => void;
};

export default function GpuMultipleItem({
  item,
  onDelete,
  onUpdate,
}: GpuMultipleItemProps) {
  const isOpen = useBooleanUrl(
    'flight-sheet-open-' + item.id + '-' + item.name
  );
  const isExpanded = useBoolean(false);
  const isEditing = useBoolean(false);
  const [extraDataRef, extraDataSize] = useElementSize();

  const handleDelete = () => {
    if (window.confirm('are you sure you want to delete flight sheet?')) {
      deleteFlightSheetGpuMultiple({
        id: item.id,
      })
        .then((res) => {
          toast.info('Flight sheet deleted');
          onDelete?.();
        })
        .catch((e) => {});
    }
  };

  const onUpdateInner = () => {
    isOpen.setFalse();
    onUpdate();
  };

  return (
    <div
      className={
        styles['wrapper'] + ' ' + (isExpanded.value ? styles['open'] : '')
      }
      style={{ '--inner-height': extraDataSize.height + 'px' } as CSSProperties}
    >
      <FContainer
        visibility={{ l: false, t: false, r: false, b: false }}
        bodyProps={{ className: styles['container-body'] }}
        className={
          styles['container'] + ' ' + styles['sp1'] + ' ' + styles['sp2']
        }
      >
        <div className={styles['common-data']}>
          <div className="flex gap-4 items-center mb-2 w-full">
            <span className="flex-grow text-3xl">{item.name}</span>
            <div className="text-gray-500">GPU-MULTIPLE</div>
            <div className={styles['inner-buttons']}>
              <ItemButtons
                direction="horizontal"
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
              <div key={item.miner.id} className={styles['field']}>
                <div className={styles['label']}>Miner</div>
                <div className={styles['value']}>{item.miner.name}</div>
              </div>
            </div>
            <AiOutlineDown
              className={styles['dropdown-icon']}
              onClick={isExpanded.toggle}
            />
          </div>
        </div>
        <div className={styles['extra-data-wrapper']}>
          <div ref={extraDataRef} className={styles['extra-data']}>
            <div className={styles['extra-data__config-list']}>
              {item.configs.map((config) => (
                <div className={styles['extra-data__config-list__item']}>
                  {[
                    { label: 'Coin', value: config.cryptocurrency.name },
                    { label: 'Wallet', value: config.wallet.name },
                    { label: 'Pool', value: config.pool.host },
                    { label: 'Wallet Address', value: config.wallet.address },
                    { label: 'Pool Host', value: config.pool.host },
                    { label: 'Algorithm', value: config.algorithm.name },
                  ].map((item) => (
                    <div key={item.label} className={styles['field']}>
                      <div className={styles['label']}>{item.label}</div>
                      <div className={styles['value']}>{item.value}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </FContainer>
      <div className={styles['outside-buttons']}>
        <ItemButtons
          onDeleteClick={handleDelete}
          onTridotClick={isOpen.setTrue}
          onEditClick={isEditing.setTrue}
          direction="vertical"
        />
      </div>
      <GpuSelectorModal flightSheetType='multiple' isOpen={isOpen} itemId={item.id} onUpdate={onUpdateInner} />
      <FModal
        title="Edit flight sheet"
        isOpen={isEditing.value}
        onClose={isEditing.setFalse}
      >
        <div className="bg-black p-8">
          <FlightSheetGpuMultipleForm flightSheet={item} onSubmit={onUpdate} />
        </div>
      </FModal>
    </div>
  );
}

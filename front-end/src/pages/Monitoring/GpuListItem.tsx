import { GpuDynamic } from '@/shared/stores/types/GpuDynamic';
import { CSSProperties, useState } from 'react';
import { useElementSize } from 'usehooks-ts';
import st from './GpuListItem.module.scss';
import clsx from 'clsx';

type GpuListitemProps = { item: GpuDynamic };

export default function GpuListItem({ item }: GpuListitemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownRef, size] = useElementSize();

  return (
    <div className={st['gpu-list-item']}>
      <div
        className={st['gpu-list-item__inner']}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className={st['gpu-list-item__id-and-fullname']}>
          <div className={st['gpu-list-item__id']} title={item.id.toString()}>
            {item.id}
          </div>
          <div className={st['gpu-list-item__fullname']}>{item.fullName}</div>
        </div>

        <div>{item.shares.accepted}</div>
        <div>{item.shares.rejected}</div>
        <div>
          {item.hashrate.value?.toFixed(3)}
          <span className={st['gpu-list-item__unit']}>
            {item.hashrate.measurement}
          </span>
        </div>
        <div>
          {item.temperature}
          <span className={st['gpu-list-item__unit']}>°C</span>
        </div>
        <div>
          {item.fanSpeed}
          <span className={st['gpu-list-item__unit']}>%</span>
        </div>
        <div>
          {item.powerUsage}
          <span className={st['gpu-list-item__unit']}>W</span>
        </div>
      </div>
      <div
        className={clsx(
          st['gpu-list-item__dropdown'],
          isOpen && st['gpu-list-item__dropdown--open']
        )}
        style={
          {
            '--gpu-dropdown-width': `${size.width}px`,
            '--gpu-dropdown-height': `${size.height}px`,
          } as CSSProperties
        }
      >
        <div ref={dropdownRef} className={st['gpu-list__dropdown-dropdown']}>
          <div className={st['gpu-list__dropdown-first-item']}>
            <div className={st['gpu-list__dropdown-item-label']}>Crypto</div>
            <div className={st['gpu-list__dropdown-item-value']}>
              {item.cryptocurrency ?? 'Null'}
            </div>
            <div className={st['gpu-list__dropdown-item-label']}>Miner</div>
            <div className={st['gpu-list__dropdown-item-value']}>
              {item.miner.fullName ?? 'Null'}
            </div>
          </div>
          <div className={st['gpu-list__dropdown-second-item']}>
            <div className={st['gpu-list__dropdown-item-label']}>
              Miner up time
            </div>
            <div className={st['gpu-list__dropdown-item-value']}>
              {item.minerUpTime ?? 'Null'}
            </div>
          </div>
          <div className={st['gpu-list__dropdown-third-item']}>
            <div className={st['gpu-list__dropdown-item-label']}>
              Flight sheet
            </div>
            <div className={st['gpu-list__dropdown-item-value']}>
              {item.flightSheetName ??
                item.flightSheetWithCustomMinerName ??
                '-'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

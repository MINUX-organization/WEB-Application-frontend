import { GpuDynamic } from '@/shared/stores/types/GpuDynamic';
import { CSSProperties, useMemo, useState } from 'react';
import { useElementSize } from 'usehooks-ts';
import st from './GpuListItem.module.scss';
import clsx from 'clsx';

type GpuListitemProps = { item: GpuDynamic };

export default function GpuListItem({ item }: GpuListitemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownRef, size] = useElementSize();

  const configs = useMemo(() => {
    const arr = [item.crypto[1], item.crypto[2], item.crypto[3]];
    return arr.filter((item) => item.algorithm);
  }, [item.crypto]);

  return (
    <div className={st['gpu-list-item']}>
      <div
        className={st['gpu-list-item__inner']}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className={st['gpu-list-item__inner-line']}>
          <div className={st['gpu-list-item__id-and-fullname']}>
            <div className={st['gpu-list-item__id']} title={item.id.toString()}>
              {item.id}
            </div>
            <div className={st['gpu-list-item__fullname']}>{item.fullName}</div>
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
          {configs[0] && (
            <>
              <div>
                {configs[0].cryptocurrency}
              </div>
              <div className={st['gpu-list-item__good-value']}>
                {configs[0].shares.accepted}
              </div>
              <div className={st['gpu-list-item__bad-value']}>
                {configs[0].shares.rejected}
              </div>
              <div>
                {configs[0].hashrate.value?.toFixed(3)}
                <span className={st['gpu-list-item__unit']}>
                  {configs[0].hashrate.measurement}
                </span>
              </div>
            </>
          )}
        </div>
        <div className={st['gpu-list-item__inner-configs']}>
          {configs.slice(1).map((config) => (
            <>
              <div className={st['gpu-list-item__inner-configs-item-label']}>
              </div>
              <div>
                {config.cryptocurrency}
              </div>
              <div className={st['gpu-list-item__good-value']}>
                {config.shares.accepted}
              </div>
              <div className={st['gpu-list-item__bad-value']}>
                {config.shares.rejected}
              </div>
              <div>
                {config.hashrate.value?.toFixed(3)}
                <span className={st['gpu-list-item__unit']}>
                  {config.hashrate.measurement}
                </span>
              </div>
            </>
          ))}
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
        <div
          ref={dropdownRef}
          className={st['gpu-list-item__dropdown-dropdown']}
        >
          <div className={st['gpu-list-item__dropdown-info']}>
            <div className={st['gpu-list-item__dropdown-first-item']}>
              <div className={st['gpu-list-item__dropdown-item-label']}>
                Miner
              </div>
              <div className={st['gpu-list-item__dropdown-item-value']}>
                {item.miner.fullName ?? 'Null'}
              </div>
            </div>
            <div className={st['gpu-list-item__dropdown-second-item']}>
              <div className={st['gpu-list-item__dropdown-item-label']}>
                Miner up time
              </div>
              <div className={st['gpu-list-item__dropdown-item-value']}>
                {item.minerUpTime ?? 'Null'}
              </div>
            </div>
            <div className={st['gpu-list-item__dropdown-third-item']}>
              <div className={st['gpu-list-item__dropdown-item-label']}>
                Flight sheet
              </div>
              <div className={st['gpu-list-item__dropdown-item-value']}>
                {item.flightSheetName ??
                  item.flightSheetWithCustomMinerName ??
                  '-'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

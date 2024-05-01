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
  }, [item.crypto])

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
        {/* <div>{item.shares.accepted}</div>
        <div>{item.shares.rejected}</div>
        <div>
          {item.hashrate.value?.toFixed(3)}
          <span className={st['gpu-list-item__unit']}>
            {item.hashrate.measurement}
          </span>
        </div> */}
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
      {configs.length !== 0 && (
        <div className={st['gpu-list-item__configs-table']}>
          <table>
            <thead>
              <tr>
                <th><div>Cryptocurrency</div></th>
                <th><div>Algorithm</div></th>
                <th><div>Accepted</div></th>
                <th><div>Rejected</div></th>
                <th><div>Hashrate</div></th>
              </tr>
            </thead>
            <tbody>
              {configs.map((config, index) => (
                <tr key={index}>
                  <td><div>{config.cryptocurrency ?? '-'}</div></td>
                  <td><div>{config.algorithm ?? '-'}</div></td>
                  <td><div data-type="number" data-severity="good">
                    {config.shares.accepted ?? '-'}
                  </div></td>
                  <td><div data-type="number" data-severity="bad">
                    {config.shares.rejected ?? '-'}
                  </div></td>
                  <td>
                    <div data-type="number">
                      {config.hashrate.value?.toFixed(3) ?? '-'}{' '}
                      {config.hashrate.measurement && (
                        <span className={st['gpu-list-item__unit']}>
                          {config.hashrate.measurement}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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
        <div ref={dropdownRef} className={st['gpu-list-item__dropdown-dropdown']}>
          {/* <div className={st['gpu-list-item__dropdown-configs']}>
            {configs.length === 0 && (
              <div className={st['gpu-list-item__dropdown-no-configs-message']}>
                Mining nothing
              </div>
            )}
            {configs.length !== 0 && (
              <div className={st['gpu-list-item__dropdown-configs-table']}>
                <table>
                  <thead>
                    <tr>
                      <th><div>Cryptocurrency</div></th>
                      <th><div>Algorithm</div></th>
                      <th><div>Accepted</div></th>
                      <th><div>Rejected</div></th>
                      <th><div>Hashrate</div></th>
                    </tr>
                  </thead>
                  <tbody>
                    {configs.map((config, index) => (
                      <tr key={index}>
                        <td><div>{config.cryptocurrency ?? '-'}</div></td>
                        <td><div>{config.algorithm ?? '-'}</div></td>
                        <td><div data-type="number">{config.shares.accepted ?? '-'}</div></td>
                        <td><div data-type="number">{config.shares.rejected ?? '-'}</div></td>
                        <td>
                          <div data-type="number">
                            {config.hashrate.value?.toFixed(3) ?? '-'}{' '}
                            {config.hashrate.measurement && (
                              <span className={st['gpu-list-item__unit']}>
                                {config.hashrate.measurement}
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div> */}
          <div className={st['gpu-list-item__dropdown-info']}>
            <div className={st['gpu-list-item__dropdown-first-item']}>
              {/* <div className={st['gpu-list__dropdown-item-label']}>Crypto</div>
              <div className={st['gpu-list__dropdown-item-value']}>
                {item.cryptocurrency ?? 'Null'}
              </div> */}
              <div className={st['gpu-list-item__dropdown-item-label']}>Miner</div>
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

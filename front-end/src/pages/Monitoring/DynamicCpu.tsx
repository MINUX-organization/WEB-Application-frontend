import { useDynamicDataStore } from '@/shared/stores'
import { useCallback } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { useQuery } from 'react-query'
import { getCpuData } from '@/shared/api/getCpuData'
import { valueOrNA } from '@/shared/utils'
import styles from './Monitoring.module.scss'

export const DynamicCpu = () => {
  const { data } = useQuery((['load cpu full name']), getCpuData);
  const cpuDynamic = useDynamicDataStore((state) => state.data.cpu);
  const below950px = useMediaQuery('(max-width: 950px)');

  const DynamicCpuItem = useCallback((props: { label: string, value: string | number, unit?: string }) => {
    const unitSmart = props.unit === '' ? undefined : props.unit;
    return (
      <div className={styles['cpu-stat-item']}>
        <span className={styles['label']}>{props.label}</span>
        <span className={styles['value']}>{props.value} {unitSmart !== undefined && <span className={styles['unit']}>{unitSmart}</span>}</span>
      </div>
    );
  }, []);

  return (
    <div className={styles['cpu']}>
      <div className={styles['cpu-header-wrapper']}>
        <div className={styles['cpu-header']}>
          <div>CPU</div>
          <div className='text'>{valueOrNA((data?.data.cpu.information.manufacturer))} {(data?.data.cpu.information.modelName ?? '')}</div>
        </div> 
      </div>
      {!below950px && (
        <div className={styles['cpu-bottom-grid']}>
          <div className={styles['cpu-grid-item-wrapper']}>
            <div className={styles['cpu-grid-item']}>
              <DynamicCpuItem label="Shares accepted:" value={valueOrNA(cpuDynamic.shares.accepted)} />
              <DynamicCpuItem label="Shares rejected:" value={valueOrNA(cpuDynamic.shares.rejected)} />
            </div>
          </div>
          <div className={styles['cpu-grid-item-wrapper']}>
            <div className={styles['cpu-grid-item']}>
              <DynamicCpuItem label="Hashrate:" value={valueOrNA(cpuDynamic.hashrate.value)} unit={cpuDynamic.hashrate.measurement ?? "H/s"} />
              <DynamicCpuItem label="Power:" value={valueOrNA(cpuDynamic.powerUsage)} unit="Watt" />
            </div>
          </div>
          <div className={styles['cpu-grid-item-wrapper']}>
            <div className={styles['cpu-grid-item']}>
              <DynamicCpuItem label="Clock Speed:" value={valueOrNA(cpuDynamic.clockSpeed === null ? null : cpuDynamic.clockSpeed.toFixed(0))} unit="Mhz" />
              <DynamicCpuItem label="Temperature:" value={valueOrNA(cpuDynamic.temperature)} unit="°C" />
            </div>
          </div>
        </div>
      )}
      {below950px && (
        <div className={styles['cpu-stats-list-wrapper']}>
          <div className={styles['cpu-stats-list']}>
            <DynamicCpuItem label="Shares accepted:" value={valueOrNA(cpuDynamic.shares.accepted)} />
            <DynamicCpuItem label="Shares rejected:" value={valueOrNA(cpuDynamic.shares.rejected)} />
            <DynamicCpuItem label="Hashrate:" value={valueOrNA(cpuDynamic.hashrate.value)} unit={cpuDynamic.hashrate.measurement ?? "H/s"} />
            <DynamicCpuItem label="Power:" value={valueOrNA(cpuDynamic.powerUsage)} unit="Watt" />
            <DynamicCpuItem label="Clock Speed:" value={valueOrNA(cpuDynamic.clockSpeed === null ? null : cpuDynamic.clockSpeed.toFixed(0))} unit="Mhz" />
            <DynamicCpuItem label="Temperature:" value={valueOrNA(cpuDynamic.temperature)} unit="°C" />
          </div>
        </div>
      )}
    </div>
  )
}

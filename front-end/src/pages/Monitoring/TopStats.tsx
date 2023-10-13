import { useDynamicDataStore } from '@/shared/stores'
import { Typography } from 'antd'
import { ReactNode, useCallback } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import styles from './Monitoring.module.scss'

export const TopStats = () => {
  const calculations = useDynamicDataStore(state => state.data.calculations)
  const below1700px = useMediaQuery('(max-width: 1700px)');

  const TopStatsItem = useCallback((props: { label: string, value: ReactNode, unit?: string }) => {
    return (
      <div className={styles['label-with-value-wrapper']}>
        <div className={styles['label-with-value']}>
          <Typography.Paragraph className={styles['label']} ellipsis={{ rows: 2, symbol: '...'}}>{props.label}</Typography.Paragraph>
          <div className={styles['value']}>
            {props.value}
            {props.unit !== undefined && <span className={styles['unit']}>{props.unit}</span>}
          </div>
        </div>
      </div>
    )
  }, [])

  if (!below1700px) {
    return (
      <>
        <div className={styles['top-stats-group']}>
          <TopStatsItem label={"Working\nMiners"} value={calculations.workingMiners} />
          <TopStatsItem label={"Working\nAlgorithms"} value={calculations.workingAlgorithms} />
        </div>
        <div className={styles['top-stats-group']}>
          <TopStatsItem label={"Total\nPower Usage"} value={calculations.totalPower} unit="W" />
          <TopStatsItem label={"Total\nRam Usage"} value={calculations.totalRam} unit="Mb" />
        </div>
        <div className={styles['top-stats-group']}>
          <TopStatsItem label={"Total\nShares Accepted"} value={<span style={{ color: 'rgb(67, 192, 155)' }}>{calculations.totalSharesAccepted}</span>} />
          <TopStatsItem label={"Total\nShares Rejected"} value={<span style={{ color: 'rgb(252, 78, 78)' }}>{calculations.totalSharesRejected}</span>} />
        </div>
      </>
    )
  }

  return (
    <>
      <TopStatsItem label={"Working\nMiners"} value={calculations.workingMiners} />
      <TopStatsItem label={"Working\nAlgorithms"} value={calculations.workingAlgorithms} />
      <TopStatsItem label={"Total\nPower Usage"} value={calculations.totalPower} unit="W" />
      <TopStatsItem label={"Total\nRam Usage"} value={calculations.totalRam} unit="Mb" />
      <TopStatsItem label={"Total\nShares Accepted"} value={<span style={{ color: 'rgb(67, 192, 155)' }}>{calculations.totalSharesAccepted}</span>} />
      <TopStatsItem label={"Total\nShares Rejected"} value={<span style={{ color: 'rgb(252, 78, 78)' }}>{calculations.totalSharesRejected}</span>} />
    </>
  )
}

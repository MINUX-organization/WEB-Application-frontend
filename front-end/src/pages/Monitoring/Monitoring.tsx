import { Footer } from './Footer'
import { GpuList } from './GpuList'
import { Coins } from './Coins'
import { DynamicCpu } from './DynamicCpu'
import { TopStats } from './TopStats'
import styles from './Monitoring.module.scss'

export default function Monitoring() {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        <TopStats />
        <DynamicCpu />
        <Coins/>
      </div>
      <GpuList />
      <Footer />
    </div>
  )
}

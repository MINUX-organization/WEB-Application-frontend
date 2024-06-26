import TotalGpus from '@/entities/totalValues/TotalGpus'
import TotalNvidia from '@/entities/totalValues/TotalNvidia'
import TotalAmd from '@/entities/totalValues/TotalAmd'
import './gpu.scss'

export default function Gpu() {
  return (
    <div className='gpus-table'> 
      <div className='grid-gpus-container'>
        <TotalGpus/>
        <TotalNvidia/>
        <TotalAmd/>
        <div className='grid-gpus-subgrid'>
          <span>Accepted</span>
          <span>Rejected</span>
          <span>Hashrate</span>
          <span>Temp</span> 
          <span>Fan</span> 
          <span>Power</span> 
        </div>
      </div> 
      <div className='gpus-scroll-container'> 
        {/* <GpuItems/> */}
      </div>
    </div>
  )
}
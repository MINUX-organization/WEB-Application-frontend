import './gpuitems.scss' 
import GpuItem from './GpuItem'
import NaImage from '@/shared/components/NaImage' 
import { useDynamicDataStore } from '@/shared/stores'

export default function GpuItems() { 
    const gpuDynamicData = useDynamicDataStore((state) => state.data.gpus)
    if (gpuDynamicData.length !== 0) {
        return (
            <>
                {gpuDynamicData.map((item, index) => (
                    <GpuItem key={item.uuid} item={item} index={index+1}/>
                ))}
            </>
        )
    } 
  return ( 
    <div className='flex justify-center mt-10'>
       <NaImage width='200px' alt={true}/> 
    </div>
  )
}
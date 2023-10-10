import './gpuitems.scss' 
import GpuItem from './GpuItem'
import NaImage from '@/shared/components/NaImage' 
import { useDynamicDataStore } from '@/shared/stores'

export default function GpuItems() { 
  const gpus = useDynamicDataStore((state) => state.data.gpus)
  return (
    <>
      {gpus.length === 0 &&
        <div className='flex justify-center mt-10'>
          <NaImage width='200px' alt={true}/> 
        </div>
      }
      {[...gpus].sort((a,b) => a.id - b.id).map((item) => (
        <GpuItem key={item.uuid} item={item} />
      ))}
    </>
  )
}

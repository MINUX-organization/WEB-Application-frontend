import Miners from './Miners'
import Algorithms from './Algorithms'
import './index.scss' 

export default function WorkerWidget() {
  return (
    <div className='flex-container-worker'> 
      <Miners/> 
      <Algorithms/> 
    </div>
  )
}

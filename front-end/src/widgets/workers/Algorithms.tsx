import { useDynamicDataStore } from '@/shared/stores';
import BoxWithBorder from '@/shared/components/BoxWithBorder'; 
import '@/shared/styles/widgets-first-level.scss' 

const name: string = 'Working algorithms'; 

export default function Algorithms() { 
  const workingAlgorithms = useDynamicDataStore((state) => state.data.calculations.workingAlgorithms)

  return (
    <BoxWithBorder name={name} count={workingAlgorithms}/>
  )
}
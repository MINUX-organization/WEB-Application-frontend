import './boxComponent.scss' 
import BoxComponent from './BoxComponent' 
import { getCalculationsData } from '@shared/api/getCalculationsData'
import { useQuery } from 'react-query'
import { valueOrZero } from '@shared/utils'

export default function TotalGpus() { 
  const { data } = useQuery(['load calculations data'], getCalculationsData)
  return (
    <BoxComponent name='GPUs' count={valueOrZero(data?.gpusCount)} color='#D9D9D9'/>
  )
}
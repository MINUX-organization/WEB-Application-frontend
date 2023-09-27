import './boxComponent.scss' 
import BoxComponent from './BoxComponent' 
import { useQuery } from 'react-query'
import { getCalculationsData } from '@shared/api/getCalculationsData'
import { valueOrZero } from '@shared/utils'

export default function TotalNvidia() {
  const { data } = useQuery(['load calculations data'], getCalculationsData)
  return (
    <BoxComponent name='Nvidia' count={valueOrZero(data?.calculations.gpusNvidia)} color='#43C09B'/>
  )
}
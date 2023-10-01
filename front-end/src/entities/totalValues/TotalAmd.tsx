 import './boxComponent.scss' 
import BoxComponent from './BoxComponent' 
import { useQuery } from 'react-query'
import { getCalculationsData } from '@/shared/api/getCalculationsData'
import { valueOrZero } from '@/shared/utils'

export default function TotalAmd() {
    const { data } = useQuery(['load calculations data'], getCalculationsData)
  return (
    <BoxComponent name='AMD' count={valueOrZero(data?.data.calculations.gpusAmd)} color='#FC4E4E'/>
  )
}
 import './boxComponent.scss' 
import BoxComponent from './BoxComponent' 
import { useQuery } from 'react-query'
import { getCalculationsData } from '@shared/api/getCalculationsData'
import { valueOrZero } from '@shared/utils'

export default function TotalRadeon() {
    const { data } = useQuery(['load calculations data'], getCalculationsData)
  return (
    <BoxComponent name='AMD' count={valueOrZero(data?.gpusRadeon)} color='#FC4E4E'/>
  )
}
 import valueOrZero from '@/shared/utils/valueOrZero'
import './boxComponent.scss'

type Props = {
  name: string
  count: number | undefined
  color?: string
}

export default function BoxComponent({name, count, color}: Props) { 
  return (
    <div className='border-total' style={{borderColor: color}}>
      <span>{name}</span>
      <span>{valueOrZero(count)}</span>
    </div>
  )
}

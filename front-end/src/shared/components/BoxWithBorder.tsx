import React from 'react' 
import valueOrZero from '@/shared/utils/valueOrZero'

type Props = {
  name: string,
  count?: string | number
  value?: string | number
  color1?: string
  color2?: string
}

export default function BoxWithBorder({name, count, value, color1, color2}: Props) {
  return ( 
      <div className='border-line'>
        <div className='flex-conteiner-first-level'>
            <span className='text-first-level'>{name}</span>
            <span className={`text-first-level1 ${color1}`}>{valueOrZero(count)} 
              {value ? <span className={color2}>&nbsp;{valueOrZero(value)}</span> : ''}
            </span> 
        </div> 
      </div> 
  )
}
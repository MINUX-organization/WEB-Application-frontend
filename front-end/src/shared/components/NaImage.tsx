import na from '@/shared/images/na.svg'
import naAlt from '@/shared/images/naAlt.svg'
import '@/app/values.scss'

type Props = {
    width: string, 
    alt?: boolean
}

export default function NaImage({width, alt}: Props) {
  return (
    <div style={{width: width, height: 'auto'}}>
        <img className='img-no-drag' src={alt ? naAlt : na} alt='n/a'/>
    </div>
  )
}
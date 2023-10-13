import na from '@/shared/images/na.svg'
import naAlt from '@/shared/images/naAlt.svg'
import '@/app/values.scss'

type NaImagProps = {
  width?: string | number,
  className?: string
  style?: CSSStyleSheet
  alt?: boolean
}

export default function NaImage(props: NaImagProps) {
  return (
    <div className={props.className} style={{width: props.width, height: 'auto', ...props.style}}>
      <img className='img-no-drag' src={props.alt ? naAlt : na} alt='n/a'/>
    </div>
  )
}

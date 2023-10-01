import { HTMLProps } from "react";
import logo from '@/shared/images/logo.svg'

export const Logo = (props: HTMLProps<HTMLImageElement>) => {
  return (
    <img {...props} src={logo} alt={'Minux logo'}/>
  )
}

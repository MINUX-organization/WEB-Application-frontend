import { TWalletFilled } from "@shared/types"
import { HTMLProps } from "react"
import { WalletListItem } from "./WalletListItem"
import { FQuadContainer } from "@shared/ui"
import styles from './WalletList.module.scss'
import _ from 'lodash'

const omittedProps = [
  'list',
  'onUpdate'
] as const

type WalletListProps = Omit<HTMLProps<HTMLDivElement>, typeof omittedProps[number]> & {
  list: TWalletFilled[]
  onUpdate?: () => void
}

export const WalletList = (props: WalletListProps) => {
  return (
    <FQuadContainer {..._.omit(props, omittedProps)} filled className={(props.className ?? '') + ' ' + styles['wrapper']} bodyProps={{ className: styles['table-wrapper']}}>
      <table>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Name</th>
            <th>Source</th>
            <th>Address</th>
            <th></th> 
          </tr>
        </thead>
        <tbody>
          {props.list.map(item => <WalletListItem key={item.address} item={item} onUpdate={() => props.onUpdate !== undefined ? props.onUpdate() : null} />)}
        </tbody>
      </table>
    </FQuadContainer>
  )
}

import { TWalletFilled } from "@/shared/types"
import { HTMLProps } from "react"
import { deleteWallet } from "../api"
import { useBoolean } from "usehooks-ts"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import { useBooleanUrl } from "@/shared/lib/useBooleanUrl"
import { FContainer, FModal } from "@/shared/ui"
import { UpdateWallet } from "@/features/UpdateWallet"
import styles from './WalletList.module.scss'
import _ from 'lodash'

const omittedProps = [
  'item',
  'onUpdate'
] as const

type WalletListItemProps = Omit<HTMLProps<HTMLTableRowElement>, typeof omittedProps[number]> & {
  item: TWalletFilled
  onUpdate?: () => void
}

export const WalletListItem = (props: WalletListItemProps) => {
  const isDeleting = useBoolean(false);
  const isEditModalOpen = useBooleanUrl(props.item.id + 'edit')

  const action = {
    delete: () => {
      // eslint-disable-next-line no-restricted-globals
      if (confirm('are you sure you want to delete wallet?')) {
        isDeleting.setTrue();
        deleteWallet({ id: props.item.id }).then(res => {
          if (props.onUpdate !== undefined) props.onUpdate();
        }).catch(e => {
          alert(e.message)
        }).finally(() => {
          isDeleting.setFalse();
        })
      }
    },
    update: () => {
      isEditModalOpen.setFalse();
      if (props.onUpdate !== undefined) props.onUpdate();
    }
  }
  return (
    <tr {..._.omit(props, omittedProps)} className={styles['wrapper-item'] + ' ' + (isDeleting.value ? styles['deleting'] : '')}>
      <td>{props.item.cryptocurrency.name}</td>
      <td>{props.item.name}</td>
      <td>{props.item.source}</td>
      <td>{props.item.address}</td>
      <td>
        <div className={styles['actions']}>
          <AiOutlineEdit className={styles['icon'] + ' ' + styles['sp1']} onClick={isEditModalOpen.setTrue} />
          <AiOutlineDelete className={styles['icon'] + ' ' + styles['sp1']} onClick={action.delete} />
        </div>
      </td>
      <FModal title="Update wallet" isOpen={isEditModalOpen.value} onClose={isEditModalOpen.setFalse}>
        <FContainer bodyProps={{ className: styles['modal-container']}} visibility={{ tc: false }}>
          <UpdateWallet item={props.item} onUpdate={action.update} />
        </FContainer>
      </FModal>
    </tr>
  )
}

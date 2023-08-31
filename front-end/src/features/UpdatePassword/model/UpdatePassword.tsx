import { HTMLProps } from "react"
import { FButton, FTextInput } from "@shared/ui"
import { useStateObj } from "@shared/lib"
import { updatePassword } from "../api"
import { useBoolean } from "usehooks-ts"
import styles from './UpdatePassword.module.scss'
import _ from 'lodash'

const omittedProps = [
  'onUpdate'
] as const


type UpdatePasswordProps = Omit<HTMLProps<HTMLDivElement>, typeof omittedProps[number]> & {
  onUpdate?: () => void
}

export const UpdatePassword = (props: UpdatePasswordProps) => {
  const oldPassword = useStateObj('')
  const newPassword = useStateObj('')
  const isUpdating = useBoolean(false)

  const action = {
    reset: () => {
      oldPassword.setValue('');
      newPassword.setValue('');
    },
    update: () => {
      if (oldPassword.value === '') {alert('old password should be entered'); return}
      if (newPassword.value === '') {alert('new password should be entered'); return}
      isUpdating.setTrue();
      updatePassword({
        oldPassword: oldPassword.value,
        newPassword: newPassword.value
      }).then(res => {
        action.reset()
        if (props.onUpdate !== undefined) props.onUpdate()
      }).catch(e => {
        alert(e.message);
      }).finally(() => {
        isUpdating.setFalse();
      })
    }
  }

  return (
    <div {..._.omit(props, omittedProps)} className={(props.className ?? '') + ' ' + styles['wrapper']}>
      <FTextInput title="Old password" value={oldPassword.value} onChange={oldPassword.setValue} />
      <FTextInput title="New password" value={newPassword.value} onChange={newPassword.setValue} />
      <div className={styles['buttons']}>
        <FButton severity='bad' onClick={action.reset}>Reset</FButton>
        <FButton severity='good' loading={isUpdating.value} onClick={action.update}>Apply</FButton>
      </div>
    </div>
  )
}

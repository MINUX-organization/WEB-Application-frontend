import { HTMLProps } from "react"
import { FButton, FTextInput } from "@/shared/ui"
import { useStateObj } from "@/shared/lib"
import { useBoolean } from "usehooks-ts"
import { updateName } from "../api"
import styles from './UpdateName.module.scss'
import _ from 'lodash'
import { showNotifyInfo } from "@/shared/utils"

const omittedProps = [
  'onUpdate'
] as const

type UpdateNameProps = Omit<HTMLProps<HTMLDivElement>, typeof omittedProps[number]> & {
  onUpdate?: () => void
}

export const UpdateName = (props: UpdateNameProps) => {
  const name = useStateObj('')
  const isUpdating = useBoolean(false)

  const action = {
    reset: () => {
      name.setValue('');
    },
    update: () => {
      if (name.value === '') { showNotifyInfo('New name must be entered'); return }
      isUpdating.setTrue();
      updateName({
        name: name.value
      }).then(res => {
        action.reset();
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
      <FTextInput title="New name" value={name.value} onChange={name.setValue} />
      <div className={styles['buttons']}>
        <FButton severity='bad' onClick={action.reset}>Reset</FButton>
        <FButton severity='good' loading={isUpdating.value} onClick={action.update}>Apply</FButton>
      </div>
    </div>
  )
}

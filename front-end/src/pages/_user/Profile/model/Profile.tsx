import { HTMLProps } from "react";
import { FQuadContainer } from "@/shared/ui";
import { UpdatePassword } from "@/features/UpdatePassword";
import { UpdateName } from "@/features/UpdateName";
import styles from './Profile.module.scss'

export const Profile = (props: HTMLProps<HTMLDivElement>) => {
  return (
    <div {...props} className={(props.className ?? '') + ' ' + styles['wrapper']}>
      <FQuadContainer filled visibility={{ ll: false, rl: false }} className={styles['password']} bodyProps={{ className: styles['password-inner']}}>
        <span>Change password</span>
        <UpdatePassword />
      </FQuadContainer>
      <FQuadContainer filled visibility={{ ll: false, rl: false }} className={styles['name']} bodyProps={{ className: styles['name-inner']}}>
        <span>Change name</span>
        <UpdateName />
      </FQuadContainer>
    </div>
  )
}

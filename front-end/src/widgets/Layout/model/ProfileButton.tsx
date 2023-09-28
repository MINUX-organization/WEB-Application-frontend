import { FQuadContainer } from "@shared/ui"
import { HTMLProps, useRef } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useSessionId } from "@app/AuthProvider"
import { useBoolean, useEventListener } from "usehooks-ts"
import profile from '@shared/images/profile.png'
import styles from './ProfileButton.module.scss'

const links = [
  { url: '/user/profile', title: 'Profile' },
  { url: '/user/wallets', title: 'Wallets' },
  { url: '/user/crypto-pool', title: 'Crypto/Pool' },
  { url: '/user/vpn-proxy', title: 'VPN/Proxy' },
  { url: '/user/feedback', title: 'Feedback' },
  // { url: '/logout', title: 'Logout' },
]

type ProfileButtonProps = HTMLProps<HTMLDivElement>

export const ProfileButton = (props: ProfileButtonProps) => {
  const location = useLocation()
  const sessionId = useSessionId()
  const isOpen = useBoolean(false)
  const ref = useRef<HTMLDivElement>(null)

  useEventListener('click', isOpen.setFalse)

  return (
    <div
      {...props}
      onClick={e => e.stopPropagation()}
      className={(props.className ?? '') + ' ' +
        styles['wrapper'] + ' ' +
        (links.some(v => v.url === location.pathname) ? styles['active'] : '') + ' ' +
        (isOpen.value ? styles['open'] : '')
      }
    >
      <div className={styles['button']} ref={ref} onClick={isOpen.toggle} >
        <FQuadContainer visibility={{ lt: false, rb: false }} className={styles['profile-image-wrapper']} bodyProps={{ className: styles['profile-image-wrapper-body']}}>
          <img src={profile} alt="profile" className={styles['profile-image']} />
        </FQuadContainer>
        <div className={styles['profile-button-burger']}>
          <div className={styles['line']} />
          <div className={styles['line']} />
          <div className={styles['line']} />
        </div>
      </div>
      <div className={styles['dropdown-wrapper']}>
        <div className={styles['dropdown-top-right-line']} />
        <div className={styles['dropdown']}>
          {links.map(link => (
              <NavLink key={link.url} to={link.url} onClick={isOpen.setFalse} className={styles['dropdown-item']}><span className={styles['text']}>{link.title}</span></NavLink> 
          ))}
          <div onClick={() => sessionId.setValue(null)} className={styles['dropdown-item']}><span className={styles['text']}>Logout</span></div>
        </div>
      </div>
    </div>
  )
}

import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Logo } from './Logo'
import { FQuadContainer } from '@/shared/ui'
import { Aside } from './Aside'
import { useAuthContext } from 'providers/AuthProvider'
import { AuthForm } from '@/features/AuthForm'
import { Spin } from 'antd'
import bgLogo from '@/shared/images/bg-logo.svg'
import styles from './Layout.module.scss'
import authPageBg from '@/shared/images/auth-page-bg.png'
import logo from '@/shared/images/minux-logo.svg'

export const Layout = () => {
  const authContext = useAuthContext()

  if (authContext.isAuthenticated === undefined) {
    return (
      <div className={styles['loading-page']}>
        <Spin size="large" />
      </div>
    )
  }

  if (authContext.isAuthenticated === false) {
    return (
      <div className={styles['auth-page']}>
        <img className={styles['auth-page-bg-image']} src={authPageBg} alt="bg" />
        <img className={styles['auth-title']} src={logo} alt="logo" />
        <AuthForm className={styles['auth-form']} />
      </div>
    )
  }
  return (
    <div className={styles["wrapper"]}>
      <div className='flex'>
        <FQuadContainer visibility={{ _l: false, _t: false }} className={styles['logo'] + ' ' + styles['sp1']}>
          <Logo />
        </FQuadContainer>
        <Header className="flex-grow" /> 
      </div>
      <div className={styles['body-with-sidebar']}>
        <Aside />
        <FQuadContainer visibility={{ _r: false, _b: false }} style={{ padding: 1, flexGrow: 1 }}>
          <div className={styles['body']}>
            <img src={bgLogo} alt="bg-logo" className={styles['bg-logo']} draggable={false} />
            <Outlet/>
          </div>
        </FQuadContainer>
      </div>
    </div>
  )
}

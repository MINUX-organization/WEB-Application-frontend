import { useStateObj } from "@shared/lib"
import { FButton, FTextInput } from "@shared/ui"
import { HTMLProps } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useBoolean } from "usehooks-ts"
import { authenticate } from "../api"
import { useAccessToken } from "@app/AuthProvider"
import styles from './AuthForm.module.scss'

export const AuthForm = (props: HTMLProps<HTMLFormElement>) => {
  const accessToken = useAccessToken();
  const state = {
    isAuthenticating: useBoolean(false),
    username: useStateObj(''),
    password: useStateObj(''),
    showPassword: useBoolean(false)
  }
  const action = {
    authenticate: (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (state.username.value === '') {
        alert('fill username field')
        return
      }
      if (state.password.value === '') {
        alert('fill password field')
        return
      }
      state.isAuthenticating.setTrue()
      authenticate({ username: state.username.value, password: state.password.value }).then(res => {
        if (res.accessToken === null) {
          alert('wrong credentials')
        }
        accessToken.setValue(res.accessToken)
      }).catch(e => {
        alert(e.message)
        accessToken.setValue(null)
      }).finally(() => {
        state.isAuthenticating.setFalse()
      })
    }
  }

  return (
    <form {...props} className={(props.className ?? '') + ' ' + styles['wrapper']} onSubmit={e => action.authenticate(e)}>
      <div>
        <label>Login</label>
        <FTextInput value={state.username.value} onChange={state.username.setValue} inputProps={{ required: true }} />
      </div>
      <div>
        <label>Password</label>
        <div className={styles['password-wrapper']}>
          <FTextInput password={!state.showPassword.value} value={state.password.value} inputProps={{ className: styles['password-input'], required: true }} onChange={state.password.setValue} />
          {state.showPassword.value && <AiOutlineEye onClick={state.showPassword.toggle} />}
          {!state.showPassword.value && <AiOutlineEyeInvisible onClick={state.showPassword.toggle} />}
        </div>
      </div>
      <FButton loading={state.isAuthenticating.value} type="submit" severity="good" className={styles['login-button']}>Login</FButton>
    </form>
  )
}

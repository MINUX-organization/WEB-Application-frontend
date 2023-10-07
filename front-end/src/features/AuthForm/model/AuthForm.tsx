import { useStateObj } from "@/shared/lib"
import { FButton, FTextInput } from "@/shared/ui"
import { HTMLProps } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useBoolean } from "usehooks-ts"
import { login } from "../api"
import { setSessionId } from "providers/AuthProvider"
import { toast } from 'react-toastify'; 
import styles from './AuthForm.module.scss'

export const AuthForm = (props: HTMLProps<HTMLFormElement>) => {
  const state = {
    isAuthenticating: useBoolean(false),
    username: useStateObj(''),
    password: useStateObj(''),
    showPassword: useBoolean(false)
  }
  const action = {
    login: (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (state.username.value === '') {
        alert('username must be entered')
        return
      }
      if (state.password.value === '') {
        alert('password must be entered')
        return
      }
      state.isAuthenticating.setTrue()
      login({ name: state.username.value, password: state.password.value }).then(res => {
        setSessionId(res.data.sessionId)
      }).catch(e => {
        if (e.statusCode === '401') {
          setSessionId(null)
        }
        toast.error(e.error)
      }).finally(() => {
        state.isAuthenticating.setFalse()
      })
    }
  }

  return (
    <form {...props} className={(props.className ?? '') + ' ' + styles['wrapper']} onSubmit={action.login}>
      <div>
        <label>Login</label>
        <FTextInput autoComplete="login" value={state.username.value} onChange={state.username.setValue} inputProps={{ required: true }} />
      </div>
      <div>
        <label>Password</label>
        <div className={styles['password-wrapper']}>
          <FTextInput autoComplete="password" password={!state.showPassword.value} value={state.password.value} inputProps={{ className: styles['password-input'], required: true }} onChange={state.password.setValue} />
          {state.showPassword.value && <AiOutlineEye onClick={state.showPassword.toggle} />}
          {!state.showPassword.value && <AiOutlineEyeInvisible onClick={state.showPassword.toggle} />}
        </div>
      </div>
      <FButton loading={state.isAuthenticating.value} type="submit" severity="good" className={styles['login-button']}>Login</FButton>
    </form>
  )
}

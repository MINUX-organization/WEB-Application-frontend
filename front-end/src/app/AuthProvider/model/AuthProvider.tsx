import { PropsWithChildren, createContext, useContext, useMemo } from "react"
import { useQuery } from "react-query"
import { getUserInfo } from "../api"
import { useSessionId } from "../hooks"
import { enqueueSnackbar } from "notistack"

type TContext = {
  isAuthenticated: boolean | undefined,
  credentials: {
    username: string
  }
}

const context = createContext<TContext>(null as any)
export const useAuthContext = () => useContext(context)
export const getSessionId = () => {
  const sessionId = window.localStorage.getItem('sessionId');
  if (sessionId === null || sessionId === '') return null
  return sessionId.replace(/"(.*)"/, '$1')
}
export const setSessionId = (sessionId: string | null) => window.localStorage.setItem('sessionId', sessionId ?? '')

export const AuthProvider = (props: PropsWithChildren) => {
  const sessionId = useSessionId()

  const userInfoQuery = useQuery(
    ['get info query', sessionId.value, sessionId.count],
    async () => {
      if (sessionId.value === null) throw { error: null }
      return (await getUserInfo({})).data
    },
    { onError: (e: any) => {
      if (e.error !== null) {
        enqueueSnackbar({ message: e.error, variant: 'error' })
      }
    }}
  )
  const username = useMemo(() => userInfoQuery.data?.username ?? '', [userInfoQuery.data])
  const isAuthenticated = useMemo(() => {
    if (userInfoQuery.isFetching) return undefined;
    if (userInfoQuery.isError) return false
    return true
  }, [userInfoQuery.isError, userInfoQuery.isFetching])

  return (
    <context.Provider value={{ isAuthenticated, credentials: { username: username }}}>
      {props.children}
    </context.Provider>
  )
}

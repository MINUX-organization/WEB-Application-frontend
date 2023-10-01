import { PropsWithChildren, createContext, useContext, useMemo } from "react"
import { useQuery } from "react-query"
import { getUserInfo } from "../api"
import { toast } from 'react-toastify'; 
import { useSessionId } from "../lib";
import { useJunkStoreStateObj } from "@/shared/lib";

type AuthProviderContext = {
  isAuthenticated: true,
  credentials: {
    username: string
  }
} | {
  isAuthenticated: undefined | false,
  credentials: null
}

const authContext = createContext<AuthProviderContext>(null as any)

export const useAuthContext = () => {
  const context = useContext(authContext)
  if (context === null) throw new Error('useAuthContext must be within <AuthProvider>')
  return context;
}

export const AuthProvider = (props: PropsWithChildren) => {
  const sessionId = useSessionId()
  const { value: sessionIdCount } = useJunkStoreStateObj('sessionIdUpdateCount')

  const { data: credentials, isFetching, isError } = useQuery(
    ['get info query', sessionId, sessionIdCount],
    async () => (await getUserInfo({})).data,
    { onError: (e: any) => toast.error(e, { position: toast.POSITION.BOTTOM_LEFT })}
  )

  const isAuthenticated = useMemo(() => {
    if (isFetching) return undefined;
    if (isError || credentials === undefined) return false
    return true
  }, [isError, isFetching, credentials])

  const context = useMemo(() => {
    if (isAuthenticated === undefined || isAuthenticated === false) {
      return {
        isAuthenticated: isAuthenticated as false | undefined,
        credentials: null
      }
    }
    return {
      isAuthenticated: isAuthenticated as true,
      credentials: credentials as Exclude<typeof credentials, undefined>
    }
  }, [isAuthenticated, credentials])

  return (
    <authContext.Provider value={context}>
      {props.children}
    </authContext.Provider>
  )
}

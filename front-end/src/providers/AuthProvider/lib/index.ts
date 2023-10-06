import { useJunkStore } from "@/shared/stores";
import { useReadLocalStorage } from "usehooks-ts";

const sessionIdKey = 'sessionId_'

export const getSessionId = () => {
  const sessionId = window.localStorage.getItem(sessionIdKey);
  return sessionId === null ? null : JSON.parse(sessionId)
}

export const setSessionId = (sessionId: string | null) => {
  if (sessionId === null) {
    window.localStorage.removeItem(sessionIdKey)
  } else {
    window.localStorage.setItem(sessionIdKey, JSON.stringify(sessionId ?? ''))
  }
  useJunkStore.setState(prev => ({ sessionIdUpdateCount: prev.sessionIdUpdateCount + 1 }))
}

export const useSessionId = () => {
  return useReadLocalStorage(sessionIdKey)
}

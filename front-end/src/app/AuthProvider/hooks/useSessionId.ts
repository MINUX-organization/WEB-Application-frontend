import { useJunkStoreStateObj } from '@shared/lib';
import { useCallback, useMemo } from 'react';
import { useLocalStorage } from 'usehooks-ts';

export const useSessionId = () => {
  const counter = useJunkStoreStateObj('sessionIdUpdateCount');
  const [sessionId, setSessionId] = useLocalStorage<null | string>('sessionId', null);
  const sessionIdNormalized = useMemo(() => {
    if (sessionId === null || sessionId === '') return null
    return sessionId.replace(/"(.*)"/, '$1')
  }, [sessionId])
  const setSessionIdNormalized = useCallback((sessionId: null | string) => {
    setSessionId(sessionId ?? '')
    counter.setValue(prev => prev + 1);
  }, [setSessionId, counter])

  return {
    value: sessionIdNormalized,
    setValue: setSessionIdNormalized,
    count: counter.value,
  }
}

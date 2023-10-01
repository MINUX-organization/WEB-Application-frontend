import { useJunkStore } from "@/shared/stores"
import { Dispatch, SetStateAction } from "react";
import { TStateObj } from "@/shared/types";
import _ from 'lodash';

type TJunkStoreState = ReturnType<typeof useJunkStore.getState>

/**
 * this hook provides simple interface to manipulate state of JunkStore
 */
export const useJunkStoreStateObj = <K extends keyof TJunkStoreState>(key: K): TStateObj<TJunkStoreState[K]> => {
  const value = useJunkStore(state => state[key]);
  const setValue: Dispatch<SetStateAction<TJunkStoreState[K]>> = (value) => useJunkStore.setState(prev => {
    const retObj: any = {}
    retObj[key] = _.isFunction(value) ? value(prev[key]) : value;
    return retObj;
  })

  return { value, setValue }
}

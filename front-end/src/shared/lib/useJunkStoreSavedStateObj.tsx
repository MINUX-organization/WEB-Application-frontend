import { useJunkStoreSaved } from "@/shared/stores"
import { Dispatch, SetStateAction } from "react";
import { TStateObj } from "@/shared/types";
import _ from 'lodash';

type TJunkStoreSavedState = ReturnType<typeof useJunkStoreSaved.getState>

export const useJunkStoreSavedStateObj = <K extends keyof TJunkStoreSavedState>(key: K): TStateObj<TJunkStoreSavedState[K]> => {
  const value = useJunkStoreSaved(state => state[key]);
  const setValue: Dispatch<SetStateAction<TJunkStoreSavedState[K]>> = (value) => useJunkStoreSaved.setState(prev => {
    const retObj: any = {}
    retObj[key] = _.isFunction(value) ? value(prev[key]) : value;
    return retObj;
  })

  return { value, setValue }
}

import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import _ from 'lodash'

const paramName = 'barr';

const readParamStr = (str: string): string[] => JSON.parse(decodeURI(str))
const writeParamStr = (arr: string[]): string => encodeURI(JSON.stringify(arr))

const _getValue = (sp: URLSearchParams, key: string) => {
  try {
    const raw = sp.get(paramName)
    if (raw === null) throw new Error(`${paramName} not found in url`);
    const parsed = readParamStr(raw);
    return parsed.includes(key)
  } catch (e) {
    return false
  }
}

const _setValue = (setSp: Dispatch<SetStateAction<URLSearchParams>>, key: string, value: SetStateAction<boolean>) => {
  setSp(prev => {
    const prevValue = _getValue(prev, key);
    const newValue = _.isFunction(value) ? value(prevValue) : value;
    if (prevValue === newValue) {
      return prev
    }
    const raw = prev.get(paramName)
    if (raw === null) {
      if (newValue) {
        prev.set(paramName, writeParamStr([key]))
      }
    } else {
      let tmp = readParamStr(raw);
      if (newValue !== tmp.includes(key)) {
        if (newValue) {
          tmp.push(key)
        } else {
          tmp = tmp.filter(v => v !== key)
        }
      }
      if (tmp.length === 0) {
        prev.delete(paramName)
      } else {
        prev.set(paramName, writeParamStr(tmp))
      }
    }
    return prev;
  })
}

/**
 * this hook provides interface to store boolean state in url search params,
 * note that key should be uniq accross whole application
 * @param key 
 */
export const useBooleanUrl = (key: string) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = useMemo(() => _getValue(searchParams, key), [searchParams, key])
  const setValue: Dispatch<SetStateAction<boolean>> = useCallback((value) => _setValue(setSearchParams, key, value), [setSearchParams, key])
  const setTrue = useCallback(() => setValue(true), [setValue])
  const setFalse = useCallback(() => setValue(false), [setValue])
  const toggle = useCallback(() => setValue(prev => !prev), [setValue])
  
  return {
    value,
    setValue,
    setTrue,
    setFalse,
    toggle
  }
}

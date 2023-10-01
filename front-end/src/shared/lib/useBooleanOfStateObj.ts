import { TStateObj } from "@/shared/types";

export const useBooleanOfStateObj = (stateObj: TStateObj<boolean>) => {
  return {
    ...stateObj,
    setTrue: () => stateObj.setValue(true),
    setFalse: () => stateObj.setValue(false),
    toggle: () => stateObj.setValue(prev => !prev)
  }
}

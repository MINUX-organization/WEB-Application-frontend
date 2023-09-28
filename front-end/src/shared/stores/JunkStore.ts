import { create } from 'zustand'

type State = {
  counter: number
  sessionIdUpdateCount: number
}

/**
 * global store
 */
export const useJunkStore = create<State>(() => ({
  counter: 0,
  sessionIdUpdateCount: 0
}));

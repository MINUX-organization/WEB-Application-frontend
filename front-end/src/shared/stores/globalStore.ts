import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit'

export const store = createSlice({
  name: 'global',
  initialState: {
    value: 0
  },
  reducers: {
    increment: (state) => {
      state.value++
    },
    decrement: (state) => {
      state.value--;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }
  }
})

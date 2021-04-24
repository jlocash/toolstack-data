/* eslint-disable no-param-reassign */

import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';

export type Battery = {
  id: number;
  present: boolean;
  timeToEmpty: number;
  timeToFull: number;
  percentage: number;
  state: number;
};

const initialState: { [id: string]: Battery } = {};

export const slice = createSlice({
  name: 'batteries',
  initialState,
  reducers: {
    batteryLoaded: (state, action: PayloadAction<{ battery: Battery }>) => {
      const { battery } = action.payload;
      state[battery.id] = battery;
    },
    clearAll: (state) => {
      Object.keys(state).forEach((key: string) => {
        delete state[key];
      });
    },
  },
});

export const actions = {
  ...slice.actions,
  loadAll: createAction('batteries/loadAll'),
};

export default slice.reducer;

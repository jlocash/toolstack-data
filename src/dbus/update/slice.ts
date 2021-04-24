/* eslint-disable no-param-reassign */

import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import { UpdatemgrProperties } from '../interfaces/updatemgr';

const initialState: UpdatemgrProperties = {
  update_applicable: '',
  update_description: '',
  update_download_percent: 0,
  update_download_speed: 0,
  update_fail_reason: '',
  update_state: '',
  update_url: '',
};

export const slice = createSlice({
  name: 'update',
  initialState,
  reducers: {
    loaded: (state, action: PayloadAction<UpdatemgrProperties>) => {
      state.update_applicable = action.payload.update_applicable;
      state.update_description = action.payload.update_description;
      state.update_download_percent = action.payload.update_download_percent;
      state.update_download_speed = action.payload.update_download_speed;
      state.update_fail_reason = action.payload.update_fail_reason;
      state.update_state = action.payload.update_state;
      state.update_url = action.payload.update_url;
    },
  },
});

export const actions = {
  ...slice.actions,
  load: createAction('update/load'),
};

export default slice.reducer;

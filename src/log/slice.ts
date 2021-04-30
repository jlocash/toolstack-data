import { createAction } from '@reduxjs/toolkit';

export default {
  log: createAction<unknown[]>('log'),
};

/* eslint-disable no-param-reassign */

import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import { NetworkProperties } from '../interfaces/network';
import { NetworkDomainProperties } from '../interfaces/network_domain';

type Network = NetworkProperties & {
  path: string;
};

type NDVM = NetworkDomainProperties & {
  loaded: boolean;
  networks: { [path: string]: Network };
};

const initialNdvmState: NDVM = {
  loaded: false,
  networks: {},
  domid: 0,
  is_networking_active: false,
  name: '',
  nm_state: 0,
  uuid: '',
};

const initialState: { [path: string]: NDVM } = {};

export const slice = createSlice({
  name: 'ndvms',
  initialState,
  reducers: {
    pathAcquired: (state, action: PayloadAction<{ ndvmPath: string }>) => {
      const { ndvmPath } = action.payload;
      state[ndvmPath] = initialNdvmState;
    },
    loaded: (state, action: PayloadAction<{ ndvmPath: string }>) => {
      const { ndvmPath } = action.payload;
      state[ndvmPath].loaded = true;
    },
    remove: (state, action: PayloadAction<{ ndvmPath: string }>) => {
      const { ndvmPath } = action.payload;
      delete state[ndvmPath];
    },
    networkLoaded: (state, action: PayloadAction<{ ndvmPath: string, network: Network }>) => {
      const { ndvmPath, network } = action.payload;
      state[ndvmPath].networks[network.path] = network;
    },
    propertiesLoaded: (state, action: PayloadAction<{
      ndvmPath: string,
      properties: NetworkDomainProperties
    }>) => {
      const { ndvmPath, properties } = action.payload;
      state[ndvmPath] = { ...state[ndvmPath], ...properties };
    },
  },
});

export const actions = {
  ...slice.actions,
  loadNetworks: createAction<{ ndvmPath: string }>('ndvms/loadNetworks'),
  loadProperties: createAction<{ ndvmPath: string }>('ndvms/loadProperties'),
};

export default slice.reducer;

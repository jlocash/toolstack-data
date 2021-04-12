import actions from './actions';
import { DEFAULT_WALLPAPERS } from '../interfaces/xenmgr_host';

const initialState = {
  properties: {},

  // host
  cdDevices: [],
  gpuDevices: [],
  isos: [],

  sound: {
    captureDevices: [],
    playbackDevices: [],
    soundCards: {},
  },

  secondsFromEpoch: 0,
  availableWallpapers: DEFAULT_WALLPAPERS,

  // installer
  eula: null,
  installState: {},

  // powersettings
  power: {
    acLidCloseAction: '',
    batteryLidCloseAction: '',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.HOST_PROPERTIES_LOADED: {
      const { properties } = action.data;
      return { ...state, properties };
    }
    case actions.HOST_POWER_LOADED: {
      const { power } = action.data;
      return { ...state, power };
    }
    case actions.HOST_SOUND_CAPTURE_DEVICES_LOADED: {
      const { captureDevices } = action.data;
      const sound = { ...state.sound, captureDevices };
      return { ...state, sound };
    }
    case actions.HOST_SOUND_PLAYBACK_DEVICES_LOADED: {
      const { playbackDevices } = action.data;
      const sound = { ...state.sound, playbackDevices };
      return { ...state, sound };
    }
    case actions.HOST_SOUND_CARD_LOADED: {
      const { soundCard } = action.data;
      const sound = { ...state.sound };
      sound.soundCards[soundCard.id] = soundCard;
      return { ...state, sound };
    }
    case actions.HOST_CD_DEVICES_LOADED: {
      const { cdDevices } = action.data;
      return { ...state, cdDevices };
    }
    case actions.HOST_PCI_DEVICES_LOADED: {
      const { pciDevices } = action.data;
      return { ...state, pciDevices };
    }
    case actions.HOST_GPUS_LOADED: {
      const { gpuDevices } = action.data;
      return { ...state, gpuDevices };
    }
    case actions.HOST_ISOS_LOADED: {
      const { isos } = action.data;
      return { ...state, isos };
    }
    case actions.HOST_INSTALL_STATE_LOADED: {
      const { installState } = action.data;
      return { ...state, installState };
    }
    case actions.HOST_WALLPAPERS_LOADED: {
      const { availableWallpapers } = action.data;
      return {
        ...state,
        availableWallpapers: [
          ...DEFAULT_WALLPAPERS,
          ...availableWallpapers,
        ],
      };
    }
    case actions.HOST_EULA_LOADED: {
      const { eula } = action.data;
      return { ...state, eula };
    }
  }
  return state;
};

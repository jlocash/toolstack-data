import dbusActions from '../../actions';
import { NDVM_INITIALIZED } from '../network_domain/actions';
import { methods as daemonMethods } from './constants';
import { methods as domainMethods } from '../network_domain/constants';
import { NETWORK_INITIALIZED } from '../network/actions';

const initialState = {};

const networkDaemonReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case NDVM_INITIALIZED: {
      const { ndvmPath } = payload;
      return {
        ...state,
        [ndvmPath]: {
          ...state[ndvmPath],
          meta: {
            initialized: true,
          },
        },
      };
    }
    case NETWORK_INITIALIZED: {
      const { networkPath, ndvmPath } = payload;
      return {
        ...state,
        [ndvmPath]: {
          ...state[ndvmPath],
          networks: {
            ...state[ndvmPath].networks,
            [networkPath]: {
              ...state[ndvmPath].networks[networkPath],
              meta: {
                initialized: true,
              },
            },
          },
        },
      };
    }
    case dbusActions.DBUS_MESSAGE_COMPLETED: {
      switch (payload.destination) {
        case 'com.citrix.xenclient.networkdomain':
        case 'com.citrix.xenclient.networkdaemon': {
          switch (payload.interface) {
            case 'com.citrix.xenclient.networkdaemon': {
              switch (payload.method) {
                case daemonMethods.LIST_BACKENDS: {
                  const untracked = {};
                  const received = payload.received[0];
                  received.forEach((ndvmPath) => {
                    if (!state[ndvmPath]) {
                      untracked[ndvmPath] = {
                        properties: {},
                        networks: {},
                        meta: {
                          initialized: false,
                        },
                      };
                    }
                  });
                  return { ...state, ...untracked };
                }
              }
              break;
            }
            case 'com.citrix.xenclient.networkdomain': {
              switch (payload.method) {
                case domainMethods.LIST_NETWORKS: {
                  const ndvmPath = payload.path;
                  const received = payload.received[0];
                  const untracked = {};
                  received.forEach((network) => {
                    if (!state[ndvmPath].networks[network]) {
                      untracked[network] = {
                        properties: {},
                        meta: {
                          initialized: false,
                        },
                      };
                    }
                  });

                  return Object.assign({}, state, {
                    [ndvmPath]: {
                      ...state[ndvmPath],
                      networks: {
                        ...state[ndvmPath].networks,
                        ...untracked,
                      },
                    },
                  });
                }
              }
              break;
            }
            case 'org.freedesktop.DBus.Properties': {
              switch (payload.sent[0]) {
                case 'com.citrix.xenclient.networkdomain.config': {
                  if (payload.method === 'GetAll') {
                    const ndvmPath = payload.path;
                    const received = payload.received[0];
                    const properties = {};
                    Object.keys(received).forEach((key) => {
                      properties[key.replace(/-/g, '_')] = received[key];
                    });

                    return {
                      ...state,
                      [ndvmPath]: {
                        ...state[ndvmPath],
                        properties,
                      },
                    };
                  }
                  break;
                }
                case 'com.citrix.xenclient.network.config': {
                  if (payload.method === 'GetAll') {
                    const network = payload.path;
                    const received = payload.received[0];
                    const properties = {};
                    Object.keys(received).forEach((key) => {
                      properties[key.replace(/-/g, '_')] = received[key];
                    });
                    const ndvmPath = `/ndvm/${properties.backend_uuid.replace(/-/g, '_')}`;
                    return {
                      ...state,
                      [ndvmPath]: {
                        ...state[ndvmPath],
                        networks: {
                          ...state[ndvmPath].networks,
                          [network]: {
                            ...state[ndvmPath].networks[network],
                            properties,
                          },
                        },
                      },
                    };
                  }
                }
              }
              break;
            }
          }
          break;
        }
      }
    }
  }
  return state;
};

export default networkDaemonReducer;

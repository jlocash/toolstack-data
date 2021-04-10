import dbusActions from '../../actions';
import { NDVM_INITIALIZED } from '../network_domain/actions';
import { methods as daemonMethods } from './constants';
import { methods as domainMethods } from '../network_domain/constants';
import { types as networkTypes } from '../network/actions';
import { interfaces, services } from '../../constants';

const initialState = {};

const networkDaemonReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case NDVM_INITIALIZED: {
      const { ndvmPath } = action.data;
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
    case networkTypes.NETWORK_INITIALIZED: {
      const { networkPath, ndvmPath } = action.data;
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
    case dbusActions.DBUS_RESPONSE_RECEIVED: {
      const { sent, received } = action.data;
      switch (sent.destination) {
        case services.NETWORK_DOMAIN:
        case services.NETWORK_DAEMON: {
          switch (sent.interface) {
            case interfaces.NETWORK_DAEMON: {
              switch (sent.method) {
                case daemonMethods.LIST_BACKENDS: {
                  const untracked = {};
                  const [backends] = received.args;
                  backends.forEach((ndvmPath) => {
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
            case interfaces.NETWORK_DOMAIN: {
              switch (sent.method) {
                case domainMethods.LIST_NETWORKS: {
                  const ndvmPath = sent.path;
                  const [networks] = received.args;
                  const untracked = {};
                  networks.forEach((network) => {
                    if (!state[ndvmPath].networks[network]) {
                      untracked[network] = {
                        properties: {},
                        meta: {
                          initialized: false,
                        },
                      };
                    }
                  });

                  return {
                    ...state,
                    [ndvmPath]: {
                      ...state[ndvmPath],
                      networks: {
                        ...state[ndvmPath].networks,
                        ...untracked,
                      },
                    },
                  };
                }
              }
              break;
            }
            case interfaces.FREEDESKTOP_PROPERTIES: {
              switch (sent.args[0]) {
                case interfaces.NETWORK_DOMAIN_CONFIG: {
                  if (sent.method === 'GetAll') {
                    const ndvmPath = sent.path;
                    const [newProperties] = received.args;
                    const properties = {};
                    Object.keys(newProperties).forEach((key) => {
                      properties[key.replace(/-/g, '_')] = newProperties[key];
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
                case interfaces.NETWORK_CONFIG: {
                  if (sent.method === 'GetAll') {
                    const network = sent.path;
                    const [newProperties] = received.args;
                    const properties = {};
                    Object.keys(newProperties).forEach((key) => {
                      properties[key.replace(/-/g, '_')] = newProperties[key];
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

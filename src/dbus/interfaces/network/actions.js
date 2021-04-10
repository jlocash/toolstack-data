import dbusActions from '../../actions';
import { interfaces, services } from '../../constants';
import { methods } from './constants';

export const types = {
  NETWORK_INITIALIZED: 'NETWORK_INITIALIZED',
};

const network = (networkPath, method, ...args) => dbusActions.sendMessage(
  services.NETWORK_DAEMON,
  networkPath,
  interfaces.NETWORK,
  method,
  ...args,
);

const actions = (networkPath) => ({
  getProperty: (name) => dbusActions.sendMessage(
    services.NETWORK_DAEMON,
    networkPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.NETWORK_CONFIG, name,
  ),
  getAllProperties: () => dbusActions.sendMessage(
    services.NETWORK_DAEMON,
    networkPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.NETWORK_CONFIG,
  ),
  setProperty: (name, value) => dbusActions.sendMessage(
    services.NETWORK_DAEMON,
    networkPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Set',
    interfaces.NETWORK_CONFIG, name, value,
  ),
  configure: (subnet) => network(networkPath, methods.CONFIGURE, subnet),
  isConfigured: () => network(networkPath, methods.IS_CONFIGURED),
  join: (vif) => network(networkPath, methods.JOIN, vif),
  leave: (vif) => network(networkPath, methods.LEAVE, vif),
});

export default actions;

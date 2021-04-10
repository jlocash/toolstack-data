import dbusActions from '../../actions';
import { interfaces, services } from '../../constants';

const path = '/org/freedesktop/DBus';

export default {
  hello: () => dbusActions.sendMessage(
    services.FREEDESKTOP,
    path,
    interfaces.FREEDESKTOP,
    'Hello',
  ),
  signalRegister: (name) => dbusActions.sendMessage(
    services.FREEDESKTOP,
    path,
    interfaces.FREEDESKTOP,
    'AddMatch',
    `type='signal',interface='${name}'`,
  ),
  signalDeregister: (name) => dbusActions.sendMessage(
    services.FREEDESKTOP,
    path,
    interfaces.FREEDESKTOP,
    'RemoveMatch',
    `type='signal',interface='${name}'`,
  ),
};

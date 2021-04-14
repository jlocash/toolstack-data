import { interfaces, services } from '../constants';
import { buildMessage } from '../dbus';

const path = '/org/freedesktop/DBus';

export default {
  hello: () => buildMessage(
    services.FREEDESKTOP,
    path,
    interfaces.FREEDESKTOP,
    'Hello',
  ),
  addMatch: (name) => buildMessage(
    services.FREEDESKTOP,
    path,
    interfaces.FREEDESKTOP,
    'AddMatch',
    `type='signal',interface='${name}'`,
  ),
  removeMatch: (name) => buildMessage(
    services.FREEDESKTOP,
    path,
    interfaces.FREEDESKTOP,
    'RemoveMatch',
    `type='signal',interface='${name}'`,
  ),
};

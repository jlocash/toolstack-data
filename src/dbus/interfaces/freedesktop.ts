import * as DBus from '../dbus';
import { services, interfaces } from '../constants';

export default {
  hello: (): Promise<DBus.Arguments> => DBus.send(
    services.FREEDESKTOP,
    '/org/freedesktop/DBus',
    interfaces.FREEDESKTOP,
    'Hello',
  ),
  addMatch: (iface: string): Promise<DBus.Arguments> => DBus.send(
    services.FREEDESKTOP,
    '/org/freedesktop/DBus',
    interfaces.FREEDESKTOP,
    'AddMatch',
    `type='signal',interface='${iface}'`,
  ),
  removeMatch: (iface: string): Promise<DBus.Arguments> => DBus.send(
    services.FREEDESKTOP,
    '/org/freedesktop/DBus',
    interfaces.FREEDESKTOP,
    'RemoveMatch',
    `type='signal',interface='${iface}'`,
  ),
};

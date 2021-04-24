import { buildMessage, Message } from '../dbus';
import { services, interfaces } from '../constants';

export default {
  hello: (): Message => buildMessage(
    services.FREEDESKTOP,
    '/org/freedesktop/DBus',
    interfaces.FREEDESKTOP,
    'Hello',
  ),
  addMatch: (iface: string): Message => buildMessage(
    services.FREEDESKTOP,
    '/org/freedesktop/DBus',
    interfaces.FREEDESKTOP,
    'AddMatch',
    `type='signal',interface='${iface}'`,
  ),
  removeMatch: (iface: string): Message => buildMessage(
    services.FREEDESKTOP,
    '/org/freedesktop/DBus',
    interfaces.FREEDESKTOP,
    'RemoveMatch',
    `type='signal',interface='${iface}'`,
  ),
};

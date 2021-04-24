/* eslint-disable camelcase */

import { buildMessage, Message } from '../dbus';
import { services, interfaces } from '../constants';

export type UIProperties = {
  drm_graphics: boolean;
  idle_time_threshold: number;
  language: string;
  modify_advanced_vm_settings: boolean;
  modify_services: boolean;
  modify_settings: boolean;
  modify_usb_settings: boolean;
  pointer_trail_timeout: number;
  show_mboot_warning: boolean;
  show_msg_on_no_disk: boolean;
  show_msg_on_vm_start: boolean;
  show_msg_on_vm_start_tools_warning: boolean;
  show_tools_warning: boolean;
  supported_languages: string[];
  switcher_enabled: boolean;
  switcher_keyboard_follows_mouse: boolean;
  switcher_resistance: number;
  switcher_self_switch_enabled: boolean;
  switcher_status_report_enabled: boolean;
  view_type: string;
  wallpaper: string;
};

export default {
  getProperty: (name: string): Message => buildMessage(
    services.XENMGR,
    '/',
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.UI_CONFIG, name.replace(/_/g, '-'),
  ),
  getAllProperties: (): Message => buildMessage(
    services.XENMGR,
    '/',
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.UI_CONFIG,
  ),
  setProperty: (name: string, value: string): Message => buildMessage(
    services.XENMGR,
    '/',
    interfaces.FREEDESKTOP_PROPERTIES,
    'Set',
    interfaces.UI_CONFIG, name.replace(/_/g, '-'), value,
  ),
};

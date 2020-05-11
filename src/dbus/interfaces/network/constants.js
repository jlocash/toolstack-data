const networkType = {
    UNKNOWN : 'unknown',
    WIRED : 'wired',
    WIFI : 'wifi',
    MODEM : 'modem',
    INTERNAL : 'internal',
    ANY : 'any',
    VPN : 'vpn',
};

const connectionType = {
    UNKNOWN : 'unknown',
    SHARED : 'shared',
    BRIDGED : 'bridged',
};

const activeAccessPoint = {
    SSID : 'ssid',
    MODE : 'mode',
    FREQUENCY : 'frequency',
    STRENGTH : 'strength',
    HWADDRESS : 'hwaddress',
    MAXBITRATE : 'maxbitrate',
    WPAFLAGS : 'wpaflags',
    RSNFLAGS : 'rsnflags',
};

export const signals = {
    STATE_CHANGED: 'state_changed',
};

export const methods = {
    CONFIGURE: 'configure',
    IS_CONFIGURED: 'is_configured',
    JOIN: 'join',
    LEAVE: 'leave',
};

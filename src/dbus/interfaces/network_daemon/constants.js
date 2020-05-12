
export const signals = {
  NETWORKDAEMON_UP: 'networkdaemon_up',
  NETWORK_ADDED: 'network_added',
  NETWORK_REMOVED: 'network_removed',
  NETWORK_STATE_CHANGED: 'network_state_changed',
};

export const methods = {
  ADD_VIF: 'add_vif',
  CREATE_NETWORK: 'create_network',
  GET_NETWORK_BACKEND: 'get_network_backend',
  IS_INITIALIZED: 'is_initialized',
  IS_NETWORKING_ACTIVE: 'is_networking_active',
  LIST: 'list',
  LIST_BACKENDS: 'list_backends',
  MOVE_TO_NETWORK: 'move_to_network',
  NDVM_STATUS: 'ndvm_status',
  SHUTDOWN: 'shutdown',
  VIF_CONNECTED: 'vif_connected',
};

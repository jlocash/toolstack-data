import actions from './actions';

const initialState = {};
export default (state = initialState, action) => {
  switch (action.type) {
    case actions.VM_PROPERTIES_LOADED: {
      const { vmPath, properties } = action.data;
      const vmState = { ...state[vmPath], properties };
      return { ...state, [vmPath]: vmState };
    }
    case actions.VM_PROPERTY_LOADED: {
      const { vmPath, prop, value } = action.data;
      const properties = { ...state[vmPath].properties, [prop]: value };
      const vmState = { ...state[vmPath], properties };
      return { ...state, [vmPath]: vmState };
    }
    case actions.VM_ARGO_FIREWALL_RULES_LOADED: {
      const { vmPath, argoFirewallRules } = action.data;
      const vmState = { ...state[vmPath], argoFirewallRules };
      return { ...state, [vmPath]: vmState };
    }
    case actions.VM_PT_PCI_DEVICES_LOADED: {
      const { vmPath, ptPciDevices } = action.data;
      const vmState = { ...state[vmPath], ptPciDevices };
      return { ...state, [vmPath]: vmState };
    }
    case actions.VM_PT_RULES_LOADED: {
      const { vmPath, ptRules } = action.data;
      const vmState = { ...state[vmPath], ptRules };
      return { ...state, [vmPath]: vmState };
    }
    case actions.VM_NET_FIREWALL_RULES_LOADED: {
      const { vmPath, netFirewallRules } = action.data;
      const vmState = { ...state[vmPath], netFirewallRules };
      return { ...state, [vmPath]: vmState };
    }
    case actions.VM_PRODUCT_PROPERTIES_LOADED: {
      const { vmPath, productProperties } = action.data;
      const vmState = { ...state[vmPath], productProperties };
      return { ...state, [vmPath]: vmState };
    }
    case actions.VM_NIC_LOADED: {
      const { vmPath, nic } = action.data;
      const nics = { ...state[vmPath].nics, [nic.path]: nic };
      const vmState = { ...state[vmPath], nics };
      return { ...state, [vmPath]: vmState };
    }
    case actions.VM_DISK_LOADED: {
      const { vmPath, disk } = action.data;
      const disks = { ...state[vmPath].disks, [disk.path]: disk };
      const vmState = { ...state[vmPath], disks };
      return { ...state, [vmPath]: vmState };
    }
    case actions.VM_REMOVE: {
      const { vmPath } = action.data;
      const newState = { ...state };
      delete newState[vmPath];
      return newState;
    }
    case actions.VM_STATE_UPDATED: {
      const { vmPath, vmState, vmAcpiState } = action.data;
      const properties = {
        ...state[vmPath].properties,
        state: vmState,
        acpiState: vmAcpiState,
      };
      return { ...state, [vmPath]: { ...state[vmPath], properties } };
    }
  }
  return state;
};

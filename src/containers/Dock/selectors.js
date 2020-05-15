const getUserVms = state => {
  const vms = state.dbus.vms;
  return Object.keys(vms).map(vmPath => vms[vmPath]).filter(vm => vm.properties.type === 'svm');
};

const selectors = {
  getUserVms,
};

export default selectors;

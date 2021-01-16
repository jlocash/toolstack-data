import { connect } from 'react-redux';
import DevicesModal from '../../components/DevicesModal';
import { selectors } from './selectors';

const mapStateToProps = state => ({
  initialized: selectors.getInitialized(state),
  cdDevices: state.dbus.host.cd_devices,
  usbDevices: state.dbus.usbDevices,
});

export default connect(mapStateToProps)(DevicesModal);

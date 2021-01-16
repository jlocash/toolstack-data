import { connect } from 'react-redux';
import SystemTray from '../../components/SystemTray';

const mapStateToProps = state => ({
  measuredLaunchEnabled: state.dbus.host.properties.measured_boot_enabled,
  measuredLaunchSuccessfull: state.dbus.host.properties.measured_boot_successfull,
  ndvms: state.dbus.ndvms,
});

export default connect(mapStateToProps)(SystemTray);

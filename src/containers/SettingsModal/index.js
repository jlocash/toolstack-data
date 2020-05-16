import SettingsModal from '../../components/SettingsModal';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
  host: state.dbus.host,
  input: state.dbus.input,
  ui: state.dbus.ui,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);

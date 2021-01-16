import SettingsModal from '../../components/SettingsModal';
import { connect } from 'react-redux';
import { selectors } from './selectors';

const mapStateToProps = state => ({
  host: state.dbus.host,
  input: state.dbus.input,
  ui: state.dbus.ui,
  initialized: selectors.getInitialized(state),
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);

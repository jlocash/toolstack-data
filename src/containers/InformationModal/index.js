import { connect } from 'react-redux';
import InformationModal from '../../components/InformationModal';

const mapStateToProps = state => ({
  loading: !state.dbus.host.meta.initialized,
  properties: state.dbus.host.properties,
});

export default connect(mapStateToProps)(InformationModal);

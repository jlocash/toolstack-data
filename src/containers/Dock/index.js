import Dock from '../../components/Dock';
import { connect } from 'react-redux';
import selectors from './selectors';

const mapStateToProps = state => ({
  vms: selectors.getUserVms(state),
});

export default connect(mapStateToProps)(Dock);

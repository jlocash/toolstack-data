import HeaderBar from '../../components/HeaderBar';
import selectors from './selectors';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  time: selectors.getTime(state),
});

export default connect(mapStateToProps)(HeaderBar);

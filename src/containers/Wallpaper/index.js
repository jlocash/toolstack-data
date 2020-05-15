import Wallpaper from '../../components/Wallpaper';
import { connect } from 'react-redux';
import selectors from './selectors';

const mapStateToProps = state => ({
  isLoading: state.dbus.ui.initialized,
  src: selectors.getWallpaper(state),
});

export default connect(mapStateToProps)(Wallpaper);

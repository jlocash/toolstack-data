import PlainWallpaper from '../../assets/images/wallpaper/plain.png';
import VenusWallpaper from '../../assets/images/wallpaper/venus.png';
import EarthWallpaper from '../../assets/images/wallpaper/earth.png';
import MarsWallpaper from '../../assets/images/wallpaper/mars.png';
import JupiterWallpaper from '../../assets/images/wallpaper/jupiter.png';
import SaturnWallpaper from '../../assets/images/wallpaper/saturn.png';
import UranusWallpaper from '../../assets/images/wallpaper/uranus.png';
import NeptuneWallpaper from '../../assets/images/wallpaper/neptune.png';
import PlutoWallpaper from '../../assets/images/wallpaper/pluto.png';

const getWallpaper = state => {
  const { wallpaper } = state.dbus.ui.properties;
  if (!wallpaper) {
    return PlainWallpaper;
  }

  switch (wallpaper) {
    case 'images/wallpaper/s1.png':
      return PlainWallpaper;
    case 'images/wallpaper/s2.png':
      return VenusWallpaper;
    case 'images/wallpaper/s3.png':
      return EarthWallpaper;
    case 'images/wallpaper/s4.png':
      return MarsWallpaper;
    case 'images/wallpaper/s5.png':
      return JupiterWallpaper;
    case 'images/wallpaper/s6.png':
      return SaturnWallpaper;
    case 'images/wallpaper/s7.png':
      return UranusWallpaper;
    case 'images/wallpaper/s8.png':
      return NeptuneWallpaper;
    case 'images/wallpaper/s9.png':
      return PlutoWallpaper;
    default:
      return wallpaper.replace(/thumb/gi, '1280');
  }
};

const selectors = {
  getWallpaper,
};

export default selectors;

import xc_wall_light_1280 from '../../assets/images/wallpaper/xc_wall_light_1280.png';
import xc_wall_gears_1280 from '../../assets/images/wallpaper/xc_wall_gears_1280.png';
import xc_wall_brushed_1280 from '../../assets/images/wallpaper/xc_wall_brushed_1280.png';
import xc_wall_marbledglass_1280 from '../../assets/images/wallpaper/xc_wall_marbledglass_1280.png';
import xc_wall_diamond_1280 from '../../assets/images/wallpaper/xc_wall_diamond_1280.png';
import xc_wall_waterdrops_1280 from '../../assets/images/wallpaper/xc_wall_waterdrops_1280.png';
import xc_wall_3Dwires_1280 from '../../assets/images/wallpaper/xc_wall_3Dwires_1280.png';
import xc_wall_circuit_1280 from '../../assets/images/wallpaper/xc_wall_circuit_1280.png';
import xc_wall_flare_1280 from '../../assets/images/wallpaper/xc_wall_flare_1280.png';

const getWallpaper = state => {
  const { wallpaper } = state.dbus.ui.properties;
  if (!wallpaper) {
    return xc_wall_light_1280;
  }

  switch (wallpaper) {
    case 'images/wallpaper/s1.png':
      return xc_wall_gears_1280;
    case 'images/wallpaper/s2.png':
      return xc_wall_brushed_1280;
    case 'images/wallpaper/s3.png':
      return xc_wall_marbledglass_1280;
    case 'images/wallpaper/s4.png':
      return xc_wall_diamond_1280;
    case 'images/wallpaper/s5.png':
      return xc_wall_waterdrops_1280;
    case 'images/wallpaper/s6.png':
      return xc_wall_3Dwires_1280;
    case 'images/wallpaper/s7.png':
      return xc_wall_circuit_1280;
    case 'images/wallpaper/s8.png':
      return xc_wall_flare_1280;
    case 'images/wallpaper/s9.png':
      return xc_wall_light_1280;
    default:
      return wallpaper.replace(/thumb/gi, '1280');
  }
};

const selectors = {
  getWallpaper,
};

export default selectors;

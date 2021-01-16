import React, { useEffect } from 'react';
// import Dock from '../../containers/Dock';
import HeaderBar from '../../containers/HeaderBar';
import Wallpaper from '../../containers/Wallpaper';

const Root = () => {
  useEffect(() => {
    document.addEventListener('contextmenu', e => {
      e.preventDefault();
    });
  });

  return (
    <Wallpaper>
      <div>
        <HeaderBar />
      </div>
    </Wallpaper>
  );
};

export default Root;

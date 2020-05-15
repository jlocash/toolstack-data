import React from 'react';
import Dock from '../../containers/Dock';
import HeaderBar from '../../containers/HeaderBar';
import Wallpaper from '../../containers/Wallpaper';

const Root = () => {
  return (
    <Wallpaper>
      <div className='flex-column max-height space-between'>
        <HeaderBar />
        <Dock />
      </div>
    </Wallpaper>
  );
};

export default Root;

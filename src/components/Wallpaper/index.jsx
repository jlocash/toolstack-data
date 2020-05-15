import './styles.css';
import React from 'react';

const Wallpaper = ({ src, children }) => {
  return (
    <div className='wallpaper' style={{ backgroundImage: `url(${src})` }}>
      {children}
    </div>
  );
};

export default Wallpaper;

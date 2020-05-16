import './styles.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

const WallpaperIcon = ({ src, className, onClick, selected }) => {
  return (
    <Container className={className}>
      <Image src={src} rounded className={`cursor-pointer ${selected ? 'wallpaper-icon-selected' : 'wallpaper-icon'}`} onClick={onClick} />
    </Container>
  );
};

export default WallpaperIcon;

import * as React from 'react';
import { FaDesktop } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


const NDVMTrayIcon = ({ ndvm, className, size='1em' }) => {
  const tooltip = (
    <Tooltip>{ndvm.properties.name}</Tooltip>
  );

  return (
    <IconContext.Provider value={{ color: 'white', size }}>
      <OverlayTrigger placement="bottom" overlay={tooltip}>
        <div className={className}>
          <FaDesktop />
        </div>
      </OverlayTrigger>
    </IconContext.Provider>
  );
};

export default NDVMTrayIcon;

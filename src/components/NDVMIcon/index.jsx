import React from 'react';
import { FiMonitor } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Spinner from 'react-bootstrap/Spinner';

const NDVMTrayIcon = ({ ndvm, className, size='1em' }) => {
  if (!ndvm.meta.initialized) {
    const loadingTooltip = (
      <Tooltip>Loading</Tooltip>
    );

    return (
      <OverlayTrigger overlay={loadingTooltip} placement="bottom">
        <div className={className}>
          <Spinner animation="border" variant="light" size="sm"/>
        </div>
      </OverlayTrigger>
    );
  } else {
    const tooltip = (
      <Tooltip>{ndvm.properties.name}</Tooltip>
    );

    return (
      <IconContext.Provider value={{ color: 'white', size }}>
        <OverlayTrigger placement="bottom" overlay={tooltip}>
          <div className={className}>
            <FiMonitor />
          </div>
        </OverlayTrigger>
      </IconContext.Provider>
    );
  }
};

export default NDVMTrayIcon;

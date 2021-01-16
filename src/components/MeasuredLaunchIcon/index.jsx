import React from 'react';
import { IconContext } from 'react-icons';
import { FiShield } from 'react-icons/fi';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const MeasuredLaunchIcon = ({ enabled, succeeded, className, size='1em' }) => {
  const tooltip = (
    <Tooltip>
      <strong>Measured Launch</strong>
      {enabled ? (succeeded ? ' succeeded': ' failed') : ' has not been enabled'}
    </Tooltip>
  );

  return (
    <IconContext.Provider value={{
      color: (enabled && succeeded) ? '#339900' : '#cc3300',
      size,
    }}>
      <OverlayTrigger overlay={tooltip} placement="bottom">
        <div className={className}>
          <FiShield />
        </div>
      </OverlayTrigger>
    </IconContext.Provider>
  );
};

export default MeasuredLaunchIcon;

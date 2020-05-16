import React, { useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { IconContext } from 'react-icons';
import { FiPower } from 'react-icons/fi';
import PowerModal from '../../containers/PowerModal';

const PowerIcon = ({ className, size }) => {
  const [show, setShow] = useState(false);
  const tooltip = (
    <Tooltip>Power</Tooltip>
  );

  return (
    <>
      <IconContext.Provider value={{ color: 'white', size }}>
        <OverlayTrigger overlay={tooltip} placement="bottom">
          <div className={className} onClick={() => setShow(!show)}>
            <FiPower />
          </div>
        </OverlayTrigger>
      </IconContext.Provider>
      <PowerModal show={show} onHide={() => setShow(false)} />
    </>
  );
};

export default PowerIcon;

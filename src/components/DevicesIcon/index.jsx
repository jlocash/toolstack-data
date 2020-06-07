import React, { useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { IconContext } from 'react-icons';
import { FiDisc } from 'react-icons/fi';
import DevicesModal from '../../containers/DevicesModal';

const DevicesIcon = ({ className, size }) => {
  const [show, setShow] = useState(false);
  const tooltip = (
    <Tooltip>Devices</Tooltip>
  );

  return (
    <>
      <IconContext.Provider value={{ color: 'white', size }}>
        <OverlayTrigger overlay={tooltip} placement="bottom">
          <div className={className} onClick={() => setShow(!show)}>
            <FiDisc />
          </div>
        </OverlayTrigger>
      </IconContext.Provider>
      <DevicesModal show={show} onHide={() => setShow(false)} />
    </>
  );
};

export default DevicesIcon;

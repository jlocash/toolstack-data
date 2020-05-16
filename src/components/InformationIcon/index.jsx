import React, { useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { IconContext } from 'react-icons';
import { FiInfo } from 'react-icons/fi';
import InformationModal from '../../containers/InformationModal';

const InformationIcon = ({ className, size }) => {
  const [show, setShow] = useState(false);
  const tooltip = (
    <Tooltip>System Information</Tooltip>
  );

  return (
    <>
      <IconContext.Provider value={{ color: 'white', size }}>
        <OverlayTrigger overlay={tooltip} placement="bottom">
          <div className={className} onClick={() => setShow(!show)}>
            <FiInfo />
          </div>
        </OverlayTrigger>
      </IconContext.Provider>
      <InformationModal show={show} onHide={() => setShow(false)} />
    </>
  );
};

export default InformationIcon;

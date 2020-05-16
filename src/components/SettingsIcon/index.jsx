import React, { useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import SettingsModal from '../../containers/SettingsModal';
import { IconContext } from 'react-icons';
import { FiSettings } from 'react-icons/fi';


const SettingsIcon = ({ className, size }) => {
  const [show, setShow] = useState(false);

  const tooltip = (
    <Tooltip>Settings</Tooltip>
  );

  return (
    <>
      <IconContext.Provider value={{ color: 'white', size }}>
        <OverlayTrigger overlay={tooltip} placement="bottom">
          <div className={className} onClick={() => setShow(!show)}>
            <FiSettings />
          </div>
        </OverlayTrigger>
      </IconContext.Provider>
      <SettingsModal show={show} onHide={() => setShow(false)}/>
    </>
  );
};

export default SettingsIcon;

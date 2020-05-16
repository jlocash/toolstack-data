import './styles.css';
import React from 'react';
import MeasuredLaunchIcon from '../MeasuredLaunchIcon';
import NDVMTrayIcon from '../NDVMIcon';
import SettingsIcon from '../SettingsIcon';
import PowerIcon from '../PowerIcon';
import InformationIcon from '../InformationIcon';
// import PowerIcon from '../PowerIcon';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const SystemTray = props => {
  const iconSize = '17px';
  const {
    ndvms,
    measuredLaunchEnabled,
    measuredLaunchSuccessfull,
  } = props;
  return (
    <Container>
      <Row className="justify-content-flex-end">
        <MeasuredLaunchIcon
          className='system-tray-icon'
          enabled={measuredLaunchEnabled}
          succeeded={measuredLaunchSuccessfull}
          size={iconSize}
        />
        <InformationIcon className="system-tray-icon" size={iconSize} />
        {
          Object.keys(ndvms).map(ndvmPath => {
            return (
              <NDVMTrayIcon
                className='system-tray-icon'
                ndvm={ndvms[ndvmPath]}
                key={ndvmPath}
                size={iconSize}
              />
            );
          })
        }
        <SettingsIcon className="system-tray-icon" size={iconSize}/>
        <PowerIcon className="system-tray-icon" size={iconSize} />
      </Row>
    </Container>
  );
};

export default SystemTray;

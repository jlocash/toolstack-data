import './styles.css';
import * as React from 'react';
import MeasuredLaunchIcon from '../MeasuredLaunchIcon';
import NDVMTrayIcon from '../NDVMIcon';

const SystemTray = props => {
  const {
    ndvms,
    measuredLaunchEnabled,
    measuredLaunchSuccessfull,
  } = props;
  return (
    <div className='flex-row'>
      <MeasuredLaunchIcon 
        className='system-tray-icon'
        enabled={measuredLaunchEnabled}
        succeeded={measuredLaunchSuccessfull}
        size='20px'
      />
      {
        Object.keys(ndvms).map(ndvmPath => {
          return (
            <NDVMTrayIcon
              className='system-tray-icon'
              ndvm={ndvms[ndvmPath]}
              key={ndvmPath}
              size='17px'
            />
          );
        })
      }
    </div>
  );
};

export default SystemTray;

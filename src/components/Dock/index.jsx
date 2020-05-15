import './styles.css';
import * as React from 'react';
import VM from '../VM';

const Dock = ({ vms }) => {
  return (
    <div className='dock'>
      {
        Object.keys(vms).map(path => <VM vm={vms[path]} key={path}/>)
      }
    </div>
  );
};

export default Dock;

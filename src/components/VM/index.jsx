import './styles.css';
import * as React from 'react';

const VM = ({ vm }) => {
  const isLoading = vm.meta.initialized;
  const {
    name,
    state,
    pv_addons,
  } = vm.properties;
  return (
    <div className='vm'>
      <div>{name}</div>
      <div>{state}</div>
    </div>
  );
};

export default VM;

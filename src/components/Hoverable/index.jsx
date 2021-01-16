import React from 'react';
import Tooltip from 'react-bootstrap/Tooltip';

const Hoverable = ({ tooltip, children }) => (
  <Tooltip >
    {children}
    {tooltip}
  </Tooltip>
);

export default Hoverable;

import React from 'react';
import { connect } from 'react-redux';

const Root = ({ connected, initialized }) => {
  return (
    <div>
      <div>{`connected: ${connected}`}</div>
      <div>{`initialized: ${initialized}`}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    connected: state.websocket.connected,
    initialized: state.dbus.updatemgr.meta.initialized,
  };
};

export default connect(mapStateToProps)(Root);

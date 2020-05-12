import React from 'react';
import { connect } from 'react-redux';

const Root = ({ connected }) => {
  if (connected) {
    return (
      <div>Connected</div>
    );
  }
  return (
    <div>
      Connecting
    </div>
  );
};

const mapStateToProps = (state) => ({
  connected: state.websocket.connected,
});

export default connect(mapStateToProps)(Root);

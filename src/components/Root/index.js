import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import input from '../../dbus/interfaces/input_daemon/actions';
import freedesktop from '../../dbus/interfaces/freedesktop/actions';

const Root = props => {
    if (props.connected) {
        useEffect(() => {
            props.dispatch(freedesktop.hello());
            props.dispatch(input.authCollectPassword());
            props.dispatch(input.getProperty('numlock_restore_on_switch'));
            props.dispatch(freedesktop.signalRegister("com.citrix.xenclient.xenmgr"));
            props.dispatch(freedesktop.signalRegister("com.citrix.xenclient.xenmgr.host"));
            props.dispatch(freedesktop.signalRegister("com.citrix.xenclient.xenmgr.guestreq"));
            props.dispatch(freedesktop.signalRegister("com.citrix.xenclient.input"));
            props.dispatch(freedesktop.signalRegister("com.citrix.xenclient.usbdaemon"));
            props.dispatch(freedesktop.signalRegister("com.citrix.xenclient.updatemgr"));
            props.dispatch(freedesktop.signalRegister("com.citrix.xenclient.status_tool"));
            props.dispatch(freedesktop.signalRegister("com.citrix.xenclient.networkdaemon.notify"));
            props.dispatch(freedesktop.signalRegister("com.citrix.xenclient.networkdomain.notify"));
            props.dispatch(freedesktop.signalRegister("com.citrix.xenclient.xcpmd"));
        });

        return (
            <div>Connected</div>
        );
    } else {
        return (
            <div>
                Connecting
            </div>
        );
    }
}

const mapStateToProps = state => ({
    connected: state.websocket.connected,
});

export default connect(mapStateToProps)(Root);

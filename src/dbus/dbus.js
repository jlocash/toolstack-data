// signal
// {
//     "id": 16796,
//     "type": "signal",
//     "interface": "com.citrix.xenclient.xenmgr",
//     "member": "vm_state_changed",
//     "path": "/",
//     "args": [
//         "a6862dd4-ff2d-4dfa-8925-378ac807f26f",
//         "/vm/a6862dd4_ff2d_4dfa_8925_378ac807f26f",
//         "creating",
//         0
//     ]
// }

// response
// {
//     "id": 119,
//     "type": "response",
//     "response-to": "144",
//     "args": [
//         "HyperX Cloud Flight Wireless Headset",
//         0,
//         "",
//         "Kingston"
//     ]
// }

const SIGNAL = 'signal';
const RESPONSE = 'response';
const ERROR = 'error';

const socketConnect = (host, port) => new Promise((resolve, reject) => {
  try {
    const socket = new WebSocket(`ws://${host}:${port}`);
    socket.onopen = () => resolve(socket);
  } catch (err) {
    reject(err);
  }
});

export const buildMessage = (service, path, iface, method, ...args) => ({
  service,
  path,
  iface,
  method,
  args,
});

export default async (host, port) => {
  let messageId = 1;
  const outgoing = {};
  const socket = await socketConnect(host, port);

  let onError;
  let onSignal;

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    switch (message.type) {
      case SIGNAL: {
        if (onSignal && typeof onSignal === 'function') {
          onSignal(message);
        }
        break;
      }
      case RESPONSE: {
        outgoing[message['response-to']].resolve(message.args);
        break;
      }
      case ERROR: {
        outgoing[message['response-to']].reject(message.args);
        break;
      }
    }
  };

  socket.onerror = (event) => {
    if (onError && typeof onError === 'function') {
      onError(event);
    }
  };

  const send = (data) => new Promise((resolve, reject) => {
    const message = {
      id: messageId,
      destination: data.service,
      path: data.path,
      interface: data.iface,
      method: data.method,
      args: data.args,
    };

    socket.send(JSON.stringify(message));
    outgoing[messageId] = {
      message,
      resolve: (response) => resolve(response),
      reject: (err) => reject(err),
    };

    messageId += 1;
  });

  return {
    socket,
    send,
    onSignal: (fn) => {
      onSignal = fn;
    },
    onError: (fn) => {
      onError = fn;
    },
    close: () => {
      socket.close();
      Object.keys(outgoing).forEach((id) => outgoing[id].reject(['socket connection closed']));
    },
  };
};

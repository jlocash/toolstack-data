import { messageTypes } from '../dbus/actions';

// manages the sending of DBus messages
export const createSocketConnection = (host, port) => {  
  return new Promise((res, rej) => {
    try {
      const ws = new WebSocket(`ws://${host}:${port}`);

      // maps message ids to promise resolve/reject
      const resolvers = {};

      // tracks message id
      let id = 0;

      const socket = {
        sendMessage: (message) => {
          id++;
          return new Promise((resolve, reject) => {
            socket.send(JSON.stringify({
              ...message,
              id,
            }));

            resolvers[id] = { resolve, reject };
          });
        },
        close: () => ws.close(),
        onSignal: null,
      };

      ws.onmessage = event => {
        const payload = JSON.parse(event.data);
        switch (payload.type) {
          case messageTypes.RESPONSE: {
          // complete the sendMessage Promise
            resolvers[payload['response-to']].resolve(payload);
            break;
          }
          case messageTypes.ERROR: {
            resolvers[payload['response-to']].reject(payload);
            break;
          }
          case messageTypes.SIGNAL: {
            socket.onsignal && socket.onsignal(payload);
            break;
          }
        }
      };

      ws.onopen = () => {
        res(socket);
      };
    } catch (err) {
      console.log(err);
      rej(err);
    }
  });
};

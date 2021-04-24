const SIGNAL = 'signal';
const RESPONSE = 'response';
const ERROR = 'error';

export type DBus = {
  socket: WebSocket;
  send: (data: Message) => Promise<Arguments>;
  onSignal: (sh: SignalHandler) => void;
  onError: (eh: ErrorHandler) => void;
  close: () => void;
};

type Arguments = unknown[];

export type Message = {
  id?: number;
  destination: string;
  path: string;
  interface: string;
  method: string;
  args: Arguments;
};

type MessageResolver = {
  message: Message,
  resolve: (args: Arguments) => void,
  reject: (args: Arguments) => void,
};

export type Signal = {
  id: number;
  type: 'signal';
  interface: string;
  member: string;
  path: string;
  args: Arguments;
};

export type Response = {
  id: number;
  type: 'response';
  'response-to': string;
  args: Arguments;
};

export type Error = {
  id: number;
  type: 'error';
  'response-to': string;
  args: Arguments;
};

type ErrorHandler = (evt: Event) => void;

type SignalHandler = (signal: Signal) => void;

const socketConnect = (host: string, port: string): Promise<WebSocket> => new Promise(
  (resolve, reject) => {
    try {
      const socket = new WebSocket(`ws://${host}:${port}`);
      socket.onopen = () => resolve(socket);
    } catch (err) {
      reject(err);
    }
  },
);

export const buildMessage = (service: string, path: string, iface: string, method: string,
  ...args: Arguments): Message => ({
  destination: service,
  interface: iface,
  path,
  method,
  args,
});

export default async (host: string, port: string): Promise<DBus> => {
  let messageId = 1;
  const outgoing: { [id: string]: MessageResolver } = {};
  const socket = await socketConnect(host, port);

  let onError: ErrorHandler;
  let onSignal: SignalHandler;

  socket.onmessage = (event) => {
    const message: Signal | Response | Error = JSON.parse(event.data);
    switch (message.type) {
      case SIGNAL: {
        if (onSignal && typeof onSignal === 'function') {
          onSignal(message as Signal);
        }
        break;
      }
      case RESPONSE: {
        const id = (message as Response)['response-to'];
        outgoing[id].resolve(message.args);
        break;
      }
      case ERROR: {
        const id = (message as Error)['response-to'];
        outgoing[id].reject(message.args);
        break;
      }
    }
  };

  socket.onerror = (event) => {
    if (onError) {
      onError(event);
    }
  };

  const send = (data: Message): Promise<Arguments> => new Promise((resolve, reject) => {
    const message: Message = {
      id: messageId,
      destination: data.destination,
      path: data.path,
      interface: data.interface,
      method: data.method,
      args: data.args,
    };

    socket.send(JSON.stringify(message));
    outgoing[messageId] = {
      message,
      resolve: (args: Arguments) => resolve(args),
      reject: (args: Arguments) => reject(args),
    };

    messageId += 1;
  });

  return {
    socket,
    send,
    onSignal: (sh: SignalHandler) => {
      onSignal = sh;
    },
    onError: (eh: ErrorHandler) => {
      onError = eh;
    },
    close: () => {
      socket.close();
      Object.keys(outgoing).forEach((id) => outgoing[id].reject(['socket connection closed']));
    },
  };
};

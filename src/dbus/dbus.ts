export type Arguments = unknown[];

type Message = {
  id: number;
  destination: string;
  path: string;
  interface: string;
  method: string;
  args: Arguments;
};

type Response = {
  id: number;
  type: 'response' | 'error';
  args: Arguments;
  'response-to': string;
};

export type Signal = {
  id: number;
  type: 'signal';
  interface: string;
  path: string;
  member: string;
  args: Arguments;
};

type SignalHandler = (signal: Signal) => void;
type ErrorHandler = (ev: Event) => void;

let socket: WebSocket;
let id = 1;
let signalHandler: SignalHandler;
let errorHandler: ErrorHandler;

// holds the Promise context of each outgoing message
const outgoing: {
  [id: string]: {
    resolve: (args: Arguments) => void,
    reject: (e: Error) => void,
  }
} = {};

const messageHandler = (evt: MessageEvent): void => {
  const message: Response | Signal = JSON.parse(evt.data);
  switch (message.type) {
    case 'signal': {
      if (signalHandler) {
        signalHandler(message);
      }
      break;
    }
    case 'response': {
      const responseTo = message['response-to'];
      outgoing[responseTo].resolve(message.args);
      delete outgoing[responseTo];
      break;
    }
    case 'error': {
      const responseTo = message['response-to'];
      outgoing[responseTo].reject(new Error(...message.args as string[]));
      delete outgoing[responseTo];
      break;
    }
    default: {
      console.log(`unidentifiable message type: ${evt.data}`);
    }
  }
};

export const connect = (host: string, port: string): Promise<void> => new Promise(
  (resolve, reject) => {
    try {
      socket = new WebSocket(`ws://${host}:${port}`);
      socket.onopen = () => resolve();
      socket.onmessage = messageHandler;
      socket.onerror = (ev: Event) => {
        if (errorHandler) {
          errorHandler(ev);
        }
      };
    } catch (err) {
      reject(err);
    }
  },
);

export const connected = (): boolean => (
  socket !== null && socket.readyState === 1
);

export const send = (
  service: string,
  path: string,
  iface: string,
  method: string,
  ...args: Arguments
): Promise<Arguments> => new Promise((resolve, reject) => {
  if (connected()) {
    const message: Message = {
      id,
      destination: service,
      interface: iface,
      path,
      method,
      args,
    };

    socket.send(JSON.stringify(message));
    outgoing[id] = { resolve, reject };
    id += 1;
  } else {
    reject(new Error('connection not ready'));
  }
});

export const close = (): void => {
  if (connected()) {
    socket.close();
  }

  Object.keys(outgoing).forEach((key) => {
    outgoing[key].reject(new Error('connection closed'));
    delete outgoing[key];
  });
};

export const onSignal = (h: SignalHandler): void => {
  signalHandler = h;
};

export const onError = (h: ErrorHandler): void => {
  errorHandler = h;
};

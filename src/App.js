import * as React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './configureStore';
import Root from './components/Root';

const store = configureStore();
export const App = () => {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};

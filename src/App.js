import React from 'react';
import { Provider } from 'react-redux';
import Root from './components/Root';
import { configureStore } from './configureStore';
import './components/global.css';

const store = configureStore();
export const App = () => {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';

ReactDOM.render(
  <Provider store={configureStore()} />,
  document.getElementById('root'),
);

import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import dbusReducer from './dbus/slice';

const createStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const s = configureStore({
    devTools: true,
    reducer: {
      dbus: dbusReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(sagaMiddleware),
  });

  sagaMiddleware.run(rootSaga);
  return s;
};

export const store = createStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

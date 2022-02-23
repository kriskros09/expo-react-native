import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  persistStore,
  persistReducer,
  purgeStoredState,
} from 'redux-persist';

import { AsyncStorage } from 'react-native';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from '../reducers';
import sagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const enhancer = composeWithDevTools(applyMiddleware(...middleware));

export const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['search'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const configureStore = () => {
  const store = createStore(
    persistedReducer,
    {},
    enhancer
  );
  // purgeStoredState(persistConfig) // if store is fucked, reset it by uncommenting this line, TODO: see if we do it on every persist
  const persistor = persistStore(store);
  sagaMiddleware.run(sagas);
  return { store, persistor }
}

import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { persistStore } from 'redux-persist';
import persistedReducer from './rootReducer';

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export const persistStoreData = persistStore(store);

import {
  configureStore,
  Action,
  combineReducers,
  ThunkAction,
} from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { userReducer } from './modules';

export const combinedReducer = combineReducers({
  user: userReducer,
});

const reducer: typeof combinedReducer = (state, action) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return combinedReducer(state, action);
};

export const makeStore = (props: unknown) => {
  const { isServer } = props as { isServer: boolean };

  if (isServer) {
    return configureStore({ reducer });
  }
  const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['user'],
  };
  const persistedReducer = persistReducer(persistConfig, reducer);
  const store = configureStore({ reducer: persistedReducer });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  store.__persisitor = persistStore(store);

  return store;
};

type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper(makeStore, { debug: true });

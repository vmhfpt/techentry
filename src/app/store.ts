import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import webReducer from './webSlice';
import { usersApi } from '../page/[role]/(manager)/user/UsersEndpoints';
import { addressApi } from '../utils/addressRTKQuery';
export const store = configureStore({
  reducer: {
    web: webReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(usersApi.middleware, addressApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

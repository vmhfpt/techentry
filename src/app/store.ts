import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import webReducer from './webSlice';

export const store = configureStore({
  reducer: {
    web: webReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

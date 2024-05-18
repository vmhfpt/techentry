import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import webReducer from './webSlice';
import { usersApi } from '../page/[role]/(manager)/user/UsersEndpoints';
import { categoryAttributesApi } from '../page/[role]/(manager)/attribute/_components/category_attribute/CategoryAttributeEndpoints';
import { attributesApi } from '../page/[role]/(manager)/attribute/_components/attribute/AttributeEndpoints';
import { addressApi } from '../utils/addressRTKQuery';

import bannerSlice from './slices/bannerSlice'
import categorySlice from './slices/categorySlice'
import { valueAttributesApi } from '../page/[role]/(manager)/attribute/_components/value_attribute/ValueAttributeEndPoints';
export const store = configureStore({
  reducer: {
    web: webReducer,
    banner: bannerSlice,
    category: categorySlice,
    [usersApi.reducerPath]: usersApi.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
    [attributesApi.reducerPath]: attributesApi.reducer,
    [categoryAttributesApi.reducerPath]: categoryAttributesApi.reducer,
    [valueAttributesApi.reducerPath] : valueAttributesApi.reducer
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
  middleware: (getDefaultMiddleware) => //attributesApi.middleware
  getDefaultMiddleware({ serializableCheck: false }).concat(usersApi.middleware, addressApi.middleware, attributesApi.middleware, categoryAttributesApi.middleware, valueAttributesApi.middleware),
});


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

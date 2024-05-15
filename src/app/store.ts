import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import webReducer from './webSlice'
import bannerSlice from './slices/bannerSlice'
import categorySlice from './slices/categorySlice'

export const store = configureStore({
  reducer: {
    web: webReducer,
    banner: bannerSlice,
    category: categorySlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

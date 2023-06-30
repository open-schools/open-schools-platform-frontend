import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { useDispatch } from 'react-redux'
import { commonApi } from '../http/api'
import rootReducer from './reducers'


export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(commonApi.middleware),
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store

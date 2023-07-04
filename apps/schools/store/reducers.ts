import { commonApi } from './commonApi'
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    [commonApi.reducerPath]: commonApi.reducer,
})

export default rootReducer

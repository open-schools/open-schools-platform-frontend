import { combineReducers } from 'redux'
import { commonApi } from '../http/api'

const rootReducer = combineReducers({
    [commonApi.reducerPath]: commonApi.reducer,
})

export default rootReducer

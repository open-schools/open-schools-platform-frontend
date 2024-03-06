import { commonApi } from './commonApi'
import { combineReducers } from '@reduxjs/toolkit'
import { studentSlice } from '@store/student/student-slice'
import { circleSlice } from '@store/circle/circle-slice'

const rootReducer = combineReducers({
    [commonApi.reducerPath]: commonApi.reducer,
    student: studentSlice.reducer,
    circle: circleSlice.reducer,
})

export default rootReducer

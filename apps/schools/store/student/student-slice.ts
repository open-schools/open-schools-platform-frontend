import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface StudentState {
    isRefetchNeeded: boolean
}

const initialState: StudentState = {
    isRefetchNeeded: false,
}

export const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        changeRefetchStatus: (state, action: PayloadAction<boolean>) => {
            state.isRefetchNeeded = action.payload
        },
    },
})

export const { changeRefetchStatus } = studentSlice.actions

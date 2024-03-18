import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CircleState {
    isRefetchNeeded: boolean;
}

const initialState: CircleState = {
    isRefetchNeeded: false,
}

export const circleSlice = createSlice({
    name: 'circle',
    initialState,
    reducers: {
        changeRefetchStatus: (state, action: PayloadAction<boolean>) => {
            state.isRefetchNeeded = action.payload
        },
    },
})

export const { changeRefetchStatus } = circleSlice.actions

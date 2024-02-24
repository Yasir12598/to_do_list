import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    uuid:'',
};

const sharedSlice = createSlice({
    name: 'shared',
    initialState: initialState,
    reducers: {
        changeUuid: (state, action) => {
            state.uuid = action.payload
        },
    },
});

export const {
    changeUuid,
} = sharedSlice.actions;

export default sharedSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State
{
    showNavbuttons: boolean;
    roomId: string | undefined;
}

const initialState: State = {
    showNavbuttons: true,
    roomId: undefined
};

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialState,
    reducers: {
        hideNavButtons(state)
        {
            state.showNavbuttons = false;
            return state;
        },
        showNavButtons(state)
        {
            state.showNavbuttons = true;
            return state;
        },
        joinRoom(state, action: PayloadAction<string>)
        {
            if (action.payload && !state.roomId)
            {
                state.roomId = action.payload;
            }
            return state;
        },
        leaveRoom(state)
        {
            state.roomId = undefined;
            return state;
        }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
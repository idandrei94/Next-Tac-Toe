import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State
{
    showNavbuttons: boolean;
    channelName: string | undefined;
}

const initialState: State = {
    showNavbuttons: true,
    channelName: undefined
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
        setChannelName(state, action: PayloadAction<string>)
        {
            state.channelName = action.payload;
        }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
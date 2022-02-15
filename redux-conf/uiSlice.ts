import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State
{
    showNavbuttons: boolean;
}

const initialState: State = {
    showNavbuttons: true,
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
        }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
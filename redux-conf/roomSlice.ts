import { Message } from '@/models/message';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
    player: string | undefined;
    messages: Message[];
    password: string | undefined;
    isOnline: boolean;
} = {
    player: undefined,
    messages: [],
    password: undefined,
    isOnline: false
};

const roomSlice = createSlice({
    name: 'room',
    initialState: initialState,
    reducers: {
        leaveRoom(state)
        {
            state.messages = [];
            state.player = undefined;
            state.password = undefined;
            state.isOnline = false;
        },
        joinRoom(state, action: PayloadAction<{ name: string, password: string; }>)
        {
            state.password = action.payload.password;
            state.player = action.payload.name;
            state.messages = [];
            state.isOnline = true;
            return state;
        },
        receiveMessage(state, action: PayloadAction<Message>)
        {
            if (action.payload.sender !== 'System' || !action.payload.message.startsWith(state.player!))
            {
                state.messages.push(action.payload);
                state.isOnline = true;
            }
            return state;
        },
        playerLeftRoom(state)
        {
            state.isOnline = false;
        }
    }
});

export const roomActions = roomSlice.actions;
export default roomSlice.reducer;
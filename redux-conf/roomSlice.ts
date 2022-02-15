import { Message } from '@/models/message';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateName, generatePassword } from 'utils/valueGenerators';

const initialState: {
    player: string | undefined;
    messages: Message[];
    roomCode: string;
    password: string;
    isOnline: boolean;
} = {
    player: undefined,
    messages: [],
    roomCode: '',
    password: '',
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
            state.roomCode = '';
            state.isOnline = false;
        },
        joinRoom(state, action: PayloadAction<{ name: string, roomCode: string; }>)
        {
            state.roomCode = action.payload.roomCode;
            state.player = action.payload.name;
            state.messages = [];
            state.isOnline = false;
            return state;
        },
        receiveMessage(state, action: PayloadAction<Message>)
        {
            state.messages.push(action.payload);
            state.isOnline = true;
            return state;
        },
        playerLeftRoom(state)
        {
            state.isOnline = false;
            state.password = '';
            state.roomCode = '';
            return state;
        },
        goOnline(state)
        {
            state.isOnline = true;
            return state;
        },
        acceptHandshake(state, action: PayloadAction<{ name: string, password: string; }>)
        {
            state.password = action.payload.password;
            state.player = action.payload.name;
            return state;
        }
    }
});

export const roomActions = roomSlice.actions;
export default roomSlice.reducer;
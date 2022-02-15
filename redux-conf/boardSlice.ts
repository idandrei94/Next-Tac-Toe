import { Board, CellState } from '@/models/gameModels';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
    board: Board,
    isReadOnly: boolean;
    currentTurn: CellState;
    winner: CellState | undefined;
    playerToken: CellState;
} = {
    board: { cells: ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'] },
    isReadOnly: false,
    currentTurn: 'X',
    playerToken: 'X',
    winner: undefined
};

const boardSlice = createSlice({
    name: 'board',
    initialState: initialState,
    reducers: {
        placeToken(state, action: PayloadAction<{ index: number; withSwap: boolean; }>)
        {
            const { index } = action.payload;
            if (!state.winner && IsCoordInRange(index) && state.board.cells[index] === 'E')
            {
                state.board.cells[index] = state.currentTurn;
                if (!action.payload.withSwap)
                {
                    // if we don't sync turn and player token, then we're online
                    state.isReadOnly = !state.isReadOnly;
                }
                // We swap current turn after making a move
                state.currentTurn = state.currentTurn === 'X' ? 'O' : 'X';
                if (action.payload.withSwap)
                {
                    state.playerToken = state.currentTurn;
                }

                state.winner = CheckForWinCondition([...state.board.cells]);

                state.isReadOnly = state.playerToken !== state.currentTurn;

                if (state.winner || state.board.cells.filter(c => c === 'E').length === 0)
                {
                    state.isReadOnly = true;
                }
            }
            return state;
        },
        reset(state, action: PayloadAction<boolean>)
        {
            const token = action.payload ? (state.playerToken === 'O' ? 'X' : 'O') : 'X';
            state = { ...initialState, playerToken: token, isReadOnly: token === 'O' };
            return state;
        },
        setCurrentToken(state, action: PayloadAction<CellState>)
        {
            state = {
                ...initialState,
                playerToken: action.payload,
                isReadOnly: action.payload === 'O'
            };
            return state;
        }
    }
});

const IsCoordInRange = (c: number) => 0 <= c && c < 9;

const CheckForWinCondition = (cells: CellState[]): CellState | undefined =>
{
    if (cells[0] !== 'E' && cells[0] === cells[4] && cells[0] === cells[8])
    {
        return cells[0];
    }
    if (cells[2] !== 'E' && cells[2] === cells[4] && cells[2] === cells[6])
    {
        return cells[2];
    }
    for (let i = 0; i < 3; i++)
    {
        if (cells[i * 3] !== 'E' && cells[i * 3] === cells[i * 3 + 1] && cells[i * 3] === cells[i * 3 + 2])
        {
            return cells[i * 3];
        }
        if (cells[i] !== 'E' && cells[i] === cells[3 + i] && cells[i] === cells[6 + i])
        {
            return cells[i];
        }
    }
    if (!cells.some(c => c === 'E'))
    {
        return 'E';
    }
    return undefined;
};

export const boardActions = boardSlice.actions;
export default boardSlice.reducer;
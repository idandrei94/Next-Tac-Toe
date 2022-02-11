import { Board, CellState } from '@/models/gameModels';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
    board: Board,
    isReadOnly: boolean;
    currentTurn: CellState;
    winner: CellState | undefined;
} = {
    board: { cells: ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'] },
    isReadOnly: false,
    currentTurn: 'X',
    winner: undefined
};

const boardSlice = createSlice({
    name: 'board',
    initialState: initialState,
    reducers: {
        placeToken(state, action: PayloadAction<{ index: number; }>)
        {
            const { index } = action.payload;
            if (!state.winner && !state.isReadOnly && IsCoordInRange(index) && state.board.cells[index] === 'E')
            {
                state.board.cells[index] = state.currentTurn;
                state.currentTurn = state.currentTurn === 'X' ? 'O' : 'X';

                state.winner = CheckForWinCondition([...state.board.cells]);

                if (state.winner || state.board.cells.filter(c => c === 'E').length === 0)
                {
                    state.isReadOnly = true;
                }
            }
            return state;
        },
        reset(state)
        {
            state = { ...initialState };
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
    return undefined;
};

export const boardActions = boardSlice.actions;
export default boardSlice.reducer;
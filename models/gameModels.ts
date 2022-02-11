export type CellState = 'X' | 'O' | 'E';
export interface Board
{
    cells: CellState[];
}
import { BaseCell, Gameboard } from './gameboard';
export declare const Solution: <BoardCell extends BaseCell, Output, Actions extends string[]>(board: Gameboard<BoardCell>, isHidden: (cell: BoardCell) => boolean, hidden: Output, cellToOutput: (cell: BoardCell) => Output, cellsToHint: (cells: BoardCell[]) => number, actions: string[], reducer: (state: BoardCell[], action: string, payload: any) => BoardCell[]) => {
    actions: string[];
    cols: number;
    rows: number;
    index: Output[];
    rowHints: number[];
    colHints: number[];
};

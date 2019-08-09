import { BaseCell } from './gameboard';
export declare type Player = 'X' | 'O';
export declare type CellState = ' ' | Player;
export interface TicTacToeCell extends BaseCell {
    state: CellState;
}
export interface TicTacToeOptions {
    seed?: string;
    startingPlayer?: Player;
}
export declare const TicTacToe: ({ seed, startingPlayer, }: TicTacToeOptions) => {
    drawBoard: () => string;
    place: (x: number, y: number) => "X" | "O" | undefined;
    winner: () => CellState;
};

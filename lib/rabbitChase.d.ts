import { BaseCell } from './gameboard';
declare const empty = "\u2001";
declare const rabbit = "\uD83D\uDC07";
declare const carrot = "\uD83E\uDD55";
export declare type CellState = typeof empty | typeof carrot | typeof rabbit;
export declare type RabbitChaseCellGetter = () => RabbitChaseCell;
export declare type Distance = number | '%';
export interface RabbitChaseCell extends BaseCell {
    state: CellState;
    distance: Distance;
}
export interface RabbitChaseOutputCell extends BaseCell {
    state: CellState | number;
}
export interface RabbitChaseOptions {
    seed: string | number;
    cols: number;
    rows: number;
    maxItems: number;
}
export interface RabbitChaseBoardSettingsItem {
    hidden: CellState;
    clue: CellState;
}
export interface RabbitChaseBoardSettings extends RabbitChaseOptions {
    maxItems: number;
    item: RabbitChaseBoardSettingsItem;
}
export declare const RabbitChaseBoard: ({ seed, cols, rows, maxItems, }?: Partial<RabbitChaseOptions>) => {
    init: () => void;
    drawBoard: (showHidden?: boolean) => string;
    getInitialSolution: () => void;
    toJSON: () => {
        cols: number;
        rows: number;
        carrots: {
            x: number;
            y: number;
            index: number;
        }[];
        top: number[];
        left: number[];
    };
};
export {};

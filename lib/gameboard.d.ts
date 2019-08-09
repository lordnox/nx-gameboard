export declare type CellGetter<Cell extends BaseCell = BaseCell> = () => Cell;
export declare type BiDimensionalArray<Type> = Type[][];
export interface GenerateGameboardProps<Cell extends BaseCell = BaseCell> {
    seed: string;
    rows: number;
    cols: number;
    cell: (cell: BaseCell) => Cell;
    [key: string]: any;
}
export interface Gameboard<Cell extends BaseCell = BaseCell> {
    rows: BiDimensionalArray<CellGetter<Cell>>;
    cols: BiDimensionalArray<CellGetter<Cell>>;
    cell: (index: number) => Cell;
    cells: () => Cell[];
    get: (x: number, y: number) => Cell | null;
    col: (x: number) => Cell[];
    row: (y: number) => Cell[];
}
export interface BaseCell {
    readonly x: number;
    readonly y: number;
    readonly index: number;
    draw: <DrawOptions>(options: DrawOptions) => string;
}
export declare const range: (startOrLength: number, optionalStart?: number, optionalStep?: number) => number[];
export declare const arrayUnique: <T>(array: T[]) => T[];
export declare const arrayConcat: <T>(array: T[][]) => T[];
export declare const call: <T>(fn: () => T) => T;
export declare const drawBoard: <T>(board: Gameboard<BaseCell>, options?: T) => string;
export declare const generateGameboard: <Cell extends BaseCell = BaseCell>(partialLocalSettings?: Partial<GenerateGameboardProps<Cell>>) => Gameboard<Cell>;

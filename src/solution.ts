
import {
  BaseCell,
  Gameboard,
  CellGetter,
} from './gameboard'

export const Solution = <
  BoardCell extends BaseCell,
  Output,
  Actions extends string[],
>(
  board: Gameboard<BoardCell>,
  isHidden: (cell: BoardCell) => boolean,
  hidden: Output,
  cellToOutput: (cell: BoardCell) => Output,
  cellsToHint: (cells: BoardCell[]) => number,
  actions: string[],
  reducer: (state: BoardCell[], action: string, payload: any) => BoardCell[],
) => {
  const index = board.cells().map(cell => isHidden(cell) ? hidden : cellToOutput(cell))
  const cols = board.cols.length
  const rows = board.rows.length
  const getCells = (cells: CellGetter<BoardCell>[]) => cells.map(cell => cell())
  const rowHints = board.rows.map(getCells).map(cellsToHint)
  const colHints = board.cols.map(getCells).map(cellsToHint)
  const solution = {
    actions,
    cols,
    rows,
    index,
    rowHints,
    colHints,
  }
  console.log(solution)
}

export const Solution = (board, isHidden, hidden, cellToOutput, cellsToHint, actions, reducer) => {
    const index = board.cells().map(cell => isHidden(cell) ? hidden : cellToOutput(cell));
    const cols = board.cols.length;
    const rows = board.rows.length;
    const getCells = (cells) => cells.map(cell => cell());
    const rowHints = board.rows.map(getCells).map(cellsToHint);
    const colHints = board.cols.map(getCells).map(cellsToHint);
    const solution = {
        actions,
        cols,
        rows,
        index,
        rowHints,
        colHints,
    };
    return solution;
};
//# sourceMappingURL=solution.js.map
const defaultSettings = {
    seed: `${Math.random()}`,
    rows: 3,
    cols: 3,
    cell: (cell) => cell,
};
export const range = (startOrLength, optionalStart, optionalStep) => {
    /**
     * @param <startOrLength> Return a list integers of zero until <startOrLength> value.
     * @param <optionalStart> Return a list integers of <optionalStart> until <startOrLength> value.
     * @param <optionalStep> ...with steps <optionalStep> value.
     * @return Return a array list
     */
    const start = (optionalStart) ? startOrLength : 0;
    const stop = (optionalStart) ? optionalStart : startOrLength;
    const step = (optionalStep) ? optionalStep : 1;
    const t = [];
    for (let i = start; i < stop; i = i + step)
        t.push(i);
    return t;
};
// removes all dublicates from an array
export const arrayUnique = (array) => Array.from(new Set(array));
// flattens an array
export const arrayConcat = (array) => [].concat.apply([], array);
// mapping function that calls the mapped element
export const call = (fn) => fn();
export const drawBoard = (board, options) => {
    const space = '━━━';
    const centerSpace = '───';
    const header = board.rows.map(() => space).join('━┯━');
    const center = board.rows.map(() => centerSpace).join('─┼─');
    const footer = board.rows.map(() => space).join('━┷━');
    const content = board.rows.map(row => {
        const content = row.map(cellGetter => cellGetter().draw(options)).join(' | ');
        return `┃ ${content} ┃`;
    }).join(`\n┠─${center}─┨\n`);
    return `┏━${header}━┓\n${content}\n┗━${footer}━┛`;
};
export const generateGameboard = (partialLocalSettings) => {
    const settings = Object.assign({}, defaultSettings, partialLocalSettings);
    const getCell = (index) => cells[index];
    const cellGetter = (index) => () => getCell(index);
    const rows = range(settings.rows).map(() => []);
    const cols = range(settings.cols).map(() => []);
    const cells = arrayConcat(range(settings.rows).map(y => {
        return range(settings.cols).map(x => {
            const index = y * settings.rows + x;
            rows[y].push(cellGetter(index));
            cols[x].push(cellGetter(index));
            return settings.cell({
                x,
                y,
                index,
                draw: () => `${x}:${y}`,
            });
        });
    }));
    return {
        rows,
        cols,
        cell: (index) => cells[index],
        cells: () => cells,
        get: (x, y) => cols[x] && cols[x][y] ? cols[x][y]() : null,
        col: (x) => cols[x].map(call),
        row: (y) => rows[y].map(call),
    };
};
//# sourceMappingURL=gameboard.js.map
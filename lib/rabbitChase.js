import * as Seedrandom from 'seedrandom';
const seedrandom = Seedrandom;
import { drawBoard, generateGameboard } from './gameboard';
import { Solution } from './solution';
const MAX_DISTANCE = 999999;
const empty = ' ';
const rabbit = '🐇';
const carrot = '🥕';
const initializeSeed = (seed) => `${seed ? seed : seedrandom(`${Math.random()}`, { entropy: true })()}`;
export const RabbitChaseBoard = ({ seed, cols = 6, rows = 6, maxItems = Math.floor((cols / 2) + (rows / 2) + 1), } = {}) => {
    const usedSeed = initializeSeed(seed);
    const rng = seedrandom(usedSeed);
    const settings = {
        cols,
        item: {
            hidden: rabbit,
            clue: carrot,
        },
        maxItems,
        rows,
        seed: usedSeed,
    };
    const board = generateGameboard({
        cols: settings.cols,
        rows: settings.rows,
        carrots: settings.maxItems,
        cell: (baseCell) => (Object.assign({}, baseCell, { distance: MAX_DISTANCE, state: empty, draw(showHidden) {
                if (this.state === empty || !showHidden && this.state === settings.item.hidden)
                    return '   ';
                return ` ${this.state}`;
            } })),
    });
    const getInt = (max) => Math.floor(rng() * max);
    const getIndex = (list) => getInt(list.length);
    const getItem = (list) => list[getIndex(list)];
    const clear = () => {
        board.cells().forEach(cell => cell.state = empty);
    };
    const findByType = (state) => board.cells().filter(cell => cell.state === state);
    const findNeighbours = ({ x, y }) => [
        board.get(x - 1, y - 1), board.get(x, y - 1), board.get(x + 1, y - 1),
        board.get(x - 1, y), board.get(x + 1, y),
        board.get(x - 1, y + 1), board.get(x, y + 1), board.get(x + 1, y + 1),
    ].filter(x => x);
    const removeCellFromList = (list) => (cell) => {
        const index = list.findIndex(item => item === cell);
        return index === -1 ? null : list.splice(index, 1);
    };
    const findDirectNeighbours = ({ x, y }) => [
        board.get(x, y - 1), board.get(x - 1, y), board.get(x + 1, y), board.get(x, y + 1),
    ].filter(x => x);
    const init = () => {
        clear();
        const availableCells = board.cells().map(cell => cell.index);
        const remove = removeCellFromList(availableCells);
        const setHidden = (index) => {
            const cell = board.cell(index);
            cell.state = settings.item.hidden;
            remove(index);
            cell.distance = 0;
            const neighbours = findNeighbours(cell).map(cell => cell.index);
            neighbours.map(remove);
            neighbours.forEach(index => board.cell(index).distance = '%');
            availableCells.forEach(index => {
                const item = board.cell(index);
                const dX = Math.abs(item.x - cell.x);
                const dY = Math.abs(item.y - cell.y);
                const d = Math.floor(Math.sqrt(dX * dX + dY * dY));
                item.distance = d;
            });
        };
        const findAndSetCell = (cells) => {
            setHidden(getItem(cells));
            if (!availableCells.length)
                return [];
            const lowDistance = availableCells.reduce((memo, index) => {
                const { distance } = board.cell(index);
                return distance === '%' || memo < distance ? memo : distance;
            }, MAX_DISTANCE);
            return availableCells.filter(index => board.cell(index).distance <= lowDistance + 1);
        };
        // add as many carrots as possible
        let cells = availableCells;
        while (cells.length)
            cells = findAndSetCell(cells);
        const hiddenItems = board.cells().filter(cell => cell.state === settings.item.hidden);
        while (hiddenItems.length > settings.maxItems) {
            const index = getIndex(hiddenItems);
            hiddenItems[index].state = empty;
            hiddenItems.splice(index, 1);
        }
        hiddenItems.forEach(item => {
            const possibleRabbits = findDirectNeighbours(item)
                .filter(cell => cell.state === empty);
            getItem(possibleRabbits).state = settings.item.clue;
        });
    };
    const collectFromCells = (state) => (cells) => cells.reduce((memo, cellGetter) => memo + (cellGetter().state === state ? 1 : 0), 0);
    const toJSON = () => {
        const top = board.cols.map(collectFromCells(settings.item.hidden));
        const left = board.rows.map(collectFromCells(settings.item.hidden));
        const carrots = findByType(settings.item.clue).map(({ x, y, index }) => ({ x, y, index }));
        return {
            cols: settings.cols,
            rows: settings.rows,
            carrots,
            top,
            left,
        };
    };
    const generateOutputCellState = ({ left, top }, allowHidden) => ({ x, y }) => {
        if (x === 0) {
            if (y === 0)
                return empty;
            return left[y - 1];
        }
        if (y === 0)
            return top[x - 1];
        const cell = board.get(x - 1, y - 1);
        if (!cell)
            return empty;
        const { state } = cell;
        if (allowHidden)
            return state;
        return state === settings.item.hidden ? empty : state;
    };
    return {
        init,
        drawBoard: (showHidden = false) => {
            const json = toJSON();
            const cellState = generateOutputCellState(json, showHidden);
            const localBoard = generateGameboard({
                cols: settings.cols + 1,
                rows: settings.rows + 1,
                cell: cell => {
                    return Object.assign({}, cell, { state: cellState(cell), draw(showHidden) {
                            if (typeof this.state === 'number')
                                return ` ${this.state} `;
                            if (this.state === empty)
                                return '   ';
                            return ` ${this.state}`;
                        } });
                },
            });
            const emptyCell = { draw: () => '   ' };
            return drawBoard(localBoard, showHidden);
        },
        getInitialSolution: () => {
            const hidden = [empty, rabbit];
            const unknown = '?';
            const actions = ['cellToEmpty', 'cellToUnknown', 'cellToRabbit'];
            const sumHints = (cells) => cells.reduce((memo, cell) => memo + (cell.state === rabbit ? 1 : 0), 0);
            return Solution(board, cell => hidden.includes(cell.state), unknown, cell => cell.state, sumHints, actions, (cells, action, payload) => cells);
        },
        toJSON,
    };
};
//# sourceMappingURL=rabbitChase.js.map
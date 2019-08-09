import { generateGameboard } from './gameboard';
describe('gameboard', () => {
    it('should generate a basic empty gameboard', () => {
        const board = generateGameboard({
            cell: baseCell => (Object.assign({}, baseCell, { state: ' ' })),
        });
        const cell = board.cell(4);
        expect(cell.index).toEqual(4);
        expect(cell.x).toEqual(1);
        expect(cell.y).toEqual(1);
    });
});
//# sourceMappingURL=gameboard.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rabbitChase_1 = require("./rabbitChase");
describe('rabbitChase', () => {
    it('should generate a game board', () => {
        const rabbitChase = rabbitChase_1.RabbitChaseBoard({ seed: 'test-a' });
        rabbitChase.init();
        expect(rabbitChase.drawBoard()).toMatchSnapshot();
        const rabbitChase1 = rabbitChase_1.RabbitChaseBoard({ seed: 'test-b' });
        rabbitChase.init();
        expect(rabbitChase.drawBoard()).toMatchSnapshot();
        const rabbitChase2 = rabbitChase_1.RabbitChaseBoard({ seed: 'test-c' });
        rabbitChase.init();
        expect(rabbitChase.drawBoard()).toMatchSnapshot();
    });
    it('should render it to json correctly', () => {
        const rabbitChase = rabbitChase_1.RabbitChaseBoard({ seed: 'test' });
        rabbitChase.init();
        rabbitChase.getInitialSolution();
        expect(rabbitChase.toJSON()).toMatchSnapshot();
        expect(rabbitChase.drawBoard()).toMatchSnapshot();
        expect(rabbitChase.drawBoard(true)).toMatchSnapshot();
    });
    it('should be able to change the settings', () => {
        const rabbitChase66 = rabbitChase_1.RabbitChaseBoard({ seed: 'test' });
        const rabbitChase88 = rabbitChase_1.RabbitChaseBoard({ seed: 'test', cols: 8, rows: 8, maxItems: 50 });
        rabbitChase66.init();
        rabbitChase88.init();
        expect(rabbitChase88.toJSON()).not.toEqual(rabbitChase66.toJSON());
        expect(rabbitChase88.toJSON()).toMatchSnapshot();
        expect(rabbitChase88.drawBoard()).toMatchSnapshot();
        expect(rabbitChase88.drawBoard(true)).toMatchSnapshot();
    });
});
//# sourceMappingURL=rabbitChase.spec.js.map
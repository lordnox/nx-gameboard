"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var seedrandom = require("seedrandom");
var index_1 = require("./index");
var MAX_DISTANCE = 999999;
var empty = ' ';
var rabbit = '🐇';
var carrot = '🥕';
exports.RabbitChase = function (_a) {
    var _b = _a.seed, seed = _b === void 0 ? 'RabbitChase' : _b;
    var rng = seedrandom(seed);
    var cols = 5;
    var rows = 5;
    var maxCarrots = 4;
    var board = index_1.generateGameboard({
        seed: seed, cols: cols, rows: rows, carrots: maxCarrots,
        cell: function (baseCell) { return (__assign({}, baseCell, { distance: MAX_DISTANCE, state: empty, draw: function () { return " " + this.state + " "; } })); }
    });
    var getInt = function (max) { return Math.floor(rng() * max); };
    var getIndex = function (list) { return getInt(list.length); };
    var getItem = function (list) { return list[getIndex(list)]; };
    var check = function () { return null; };
    var place = function (x, y) {
        var cell = board.get(x, y);
    };
    var clear = function () {
        board.cells().forEach(function (cell) { return cell.state = empty; });
    };
    var findNeighbours = function (_a) {
        var x = _a.x, y = _a.y;
        return [
            board.get(x - 1, y - 1), board.get(x, y - 1), board.get(x + 1, y - 1),
            board.get(x - 1, y), board.get(x + 1, y),
            board.get(x - 1, y + 1), board.get(x, y + 1), board.get(x + 1, y + 1),
        ].filter(function (x) { return x; });
    };
    var removeCellFromList = function (list) { return function (cell) {
        var index = list.findIndex(function (item) { return item === cell; });
        if (index === -1)
            return null;
        return list.splice(index, 1);
    }; };
    var findDirectNeighbours = function (_a) {
        var x = _a.x, y = _a.y;
        return [
            board.get(x, y - 1), board.get(x - 1, y), board.get(x + 1, y), board.get(x, y + 1),
        ].filter(function (x) { return x; });
    };
    var init = function () {
        clear();
        var availableCells = board.cells().map(function (cell) { return cell.index; });
        var remove = removeCellFromList(availableCells);
        var setCarrot = function (index, d) {
            if (d === void 0) { d = false; }
            var cell = board.cell(index);
            cell.state = carrot;
            remove(index);
            cell.distance = 0;
            var neighbours = findNeighbours(cell).map(function (cell) { return cell.index; });
            if (d)
                console.log(neighbours);
            neighbours.map(remove);
            neighbours.forEach(function (index) { return board.cell(index).distance = '%'; });
            availableCells.forEach(function (index) {
                var item = board.cell(index);
                var dX = Math.abs(item.x - cell.x);
                var dY = Math.abs(item.y - cell.y);
                var d = Math.floor(Math.sqrt(dX * dX + dY * dY));
                item.distance = d;
            });
        };
        var findAndSetCell = function (cells) {
            setCarrot(getItem(cells));
            if (!availableCells.length)
                return [];
            var lowDistance = availableCells.reduce(function (memo, index) {
                var distance = board.cell(index).distance;
                return memo < distance ? memo : distance;
            }, MAX_DISTANCE);
            return availableCells.filter(function (index) { return board.cell(index).distance <= lowDistance + 1; });
        };
        // add as many carrots as possible
        var cells = availableCells;
        while (cells.length)
            cells = findAndSetCell(cells);
        var carrots = board.cells().filter(function (cell) { return cell.state === carrot; });
        while (carrots.length > maxCarrots) {
            var index = getIndex(carrots);
            carrots[index].state = empty;
            carrots.splice(index, 1);
        }
        carrots.forEach(function (carrot) {
            var possibleRabbits = findDirectNeighbours(carrot)
                .filter(function (cell) { return cell.state === empty; });
            getItem(possibleRabbits).state = rabbit;
        });
        // const rabbitPlaces = arrayUnique(arrayConcat()
        // rabbitPlaces.forEach(cell => cell.state = rabbit)
    };
    return { init: init, place: place, drawBoard: function () { return index_1.drawBoard(board); } };
};

// @ts-nocheck
import { writable, derived, get } from 'svelte/store';
import { PLAYERS } from './constants';

export const gameSize = writable(3);
export const currentPlayer = writable(PLAYERS.crosses);
export const gameTurn = writable(0);

export const tiles = derived(gameSize, $gameSize => {
    return [...Array($gameSize)].reduce((acc, _, i) => {
        return [
            ...acc,
            ...[...Array($gameSize)].map((_, k) => {
                return { x: i + 1, y: k + 1 };
            }),
        ];
    }, []);
});

function createGameState() {
    const getInitialTileState = tiles => new Map(tiles.map(tile => [tile, '']));
    const { subscribe, set, update } = writable(getInitialTileState(get(tiles)));

    function resetToTiles(tiles) {
        set(getInitialTileState(tiles));
    }

    function reset() {
        resetToTiles(get(tiles));
    }

    tiles.subscribe(tiles => {
        resetToTiles(tiles);
    });

    const tickTile = tile => {
        update(tileState => {
            tileState.set(tile, get(currentPlayer));
            return tileState;
        });
    };

    return { subscribe, set, tickTile, reset };
}

export const gameState = createGameState();

export const winner = derived(gameState, $gameState => {
    const playerToCheck = get(currentPlayer);
    const size = get(gameSize);

    const rowsTicks = new Array(size).fill(0);
    const columnsTicks = new Array(size).fill(0);
    let firstDiagonalTicks = 0;
    let secondDiagonalTicks = 0;

    $gameState.forEach((player, tile) => {
        if (player === playerToCheck) {
            rowsTicks[tile.y]++;
            columnsTicks[tile.x]++;

            if (tile.x === tile.y) {
                firstDiagonalTicks++;
            }

            if (tile.x + tile.y === size + 1) {
                secondDiagonalTicks++;
            }
        }
    });

    function winsRow() {
        return rowsTicks.some(ticks => ticks >= size);
    }

    function winsColumn() {
        return columnsTicks.some(ticks => ticks >= size);
    }

    function winsDiagonal() {
        return firstDiagonalTicks >= size || secondDiagonalTicks >= size;
    }

    if (winsRow() || winsColumn() || winsDiagonal()) {
        return playerToCheck;
    }
});

const messages = Object.freeze({
    crossesFirst: 'Crosses go first',
    naughtsSecond: 'Naughts go second',
    firstToWins: 'First to complete a row, a column or a full diagonal WINS',
});
export const gameMessage = derived(gameTurn, $gameTurn => {
    const winningPlayer = get(winner);
    if (winningPlayer) {
        return `${winningPlayer} win!`;
    }

    switch ($gameTurn) {
        case 0:
            return messages.crossesFirst;
        case 1:
            return messages.naughtsSecond;
        default:
            return messages.firstToWins;
    }
});

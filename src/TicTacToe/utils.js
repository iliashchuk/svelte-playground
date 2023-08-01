import { PLAYERS } from './constants';
import { currentPlayer, gameState, gameTurn } from './stores';

export function getNextPlayer(currentPlayer) {
    if (currentPlayer === PLAYERS.crosses) {
        return PLAYERS.naughts;
    } else if (currentPlayer === PLAYERS.naughts) {
        return PLAYERS.crosses;
    }
}

export function resetBaseStores() {
    currentPlayer.set(PLAYERS.crosses);
    gameState.reset();
    gameTurn.set(0);
}

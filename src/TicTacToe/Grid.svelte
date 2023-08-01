<style>
    .container {
        width: 100%;
        min-width: 240px;
        aspect-ratio: 1 / 1;
        display: grid;
        border-radius: 16px;
        overflow: hidden;
    }
</style>

<script>
    import Tile from './Tile.svelte';
    import { getNextPlayer } from './utils';
    import { tiles, gameSize, gameState, currentPlayer, gameTurn, winner } from './stores';

    function takePlayerTurn(tile) {
        gameState.tickTile(tile);

        console.log($winner);
        // @ts-ignore
        currentPlayer.update(currentPlayer => getNextPlayer(currentPlayer));
        gameTurn.update(turn => turn + 1);
    }

    let gridStyles;

    $: gridStyles = `
        grid-template-columns: repeat(${$gameSize}, 1fr);
        grid-template-rows: repeat(${$gameSize}, 1fr);
    `;

    const getBorderStyles = tile => {
        return `0 ${tile.y < $gameSize ? '2px' : '0'} ${tile.x < $gameSize ? '2px' : '0'} 0`;
    };
</script>

<div class="container" style={gridStyles}>
    {#each $tiles as tile}
        <Tile
            tickedBy={$gameState.get(tile)}
            on:click={() => takePlayerTurn(tile)}
            --grid-area="{tile.y}/{tile.x};"
            --borders={getBorderStyles(tile)}
        />
    {/each}
</div>
